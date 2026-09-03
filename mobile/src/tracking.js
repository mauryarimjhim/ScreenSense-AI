// Deliberately isolated platform boundary: UI never claims to collect data it
// cannot access. Android needs a Kotlin UsageStatsManager module and Usage
// Access permission; iOS needs Apple's Screen Time entitlement and extensions.
export function getPlatformUsageStatus(platform) {
  if (platform === "android") {
    return "Android system tracking needs Usage Access permission and the native collector.";
  }
  return "iOS tracking requires Apple Family Controls approval and a Device Activity extension.";
}
