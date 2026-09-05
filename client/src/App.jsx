import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { API_BASE } from "./services/api";

function App(){
    useEffect(() => {
      // The desktop browser extension listens for this event and uses the same
      // deployed API as the dashboard. This avoids a hard-coded localhost URL.
      window.postMessage(
        { type: "SCREENSENSE_AUTH", token: localStorage.getItem("token"), apiBase: API_BASE },
        window.location.origin,
      );
    }, []);

    return (
      <>
        <main className="mobile-unsupported" role="main">
          <div className="mobile-unsupported__card">
            <p className="mobile-unsupported__eyebrow">ScreenSense AI</p>
            <h1>Desktop required</h1>
            <p>ScreenSense is currently available on desktop screens only. Please open this site on a laptop or desktop computer.</p>
          </div>
        </main>
        <div className="desktop-app"><AppRoutes/></div>
      </>
    );
}

export default App;
