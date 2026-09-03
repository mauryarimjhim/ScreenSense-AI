const jwt = require ("jsonwebtoken");
const Device = require("../models/Device");

exports.protect = (req, res, next) => {
   let token;

   if(
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
   ){
    token = req.headers.authorization.split(" ")[1];
   }

   if(!token)
   {
    return res.status(401).json({
        success: false,
        message: "Not authorized, no token",
    });
   }

    try {
        const decoded = jwt.verify( token , process.env.JWT_SECRET );
        req.user = decoded;

        next();

    }
    catch(error)
    {
        return res.status(401).json({
            success: false,
            message: "Not authorized, invalid token",
        });
    }
};

exports.protectDevice = async (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ success: false, message: "Device token is required" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.tokenType !== "device" || !decoded.deviceId || !decoded.id) {
      return res.status(401).json({ success: false, message: "Invalid device token" });
    }
    const device = await Device.findOne({ _id: decoded.deviceId, userId: decoded.id, isActive: true });
    if (!device) return res.status(401).json({ success: false, message: "This device is no longer active" });
    req.deviceAuth = decoded;
    req.device = device;
    next();
  } catch {
    return res.status(401).json({ success: false, message: "Invalid or expired device token" });
  }
};
