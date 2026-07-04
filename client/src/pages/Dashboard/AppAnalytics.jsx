import { useState, useMemo } from "react";
import AppAnalyticsHeader from "../../components/AppAnalytics/AppAnalyticsHeader";
import AppSearchBar from "../../components/AppAnalytics/AppSearchBar";
import AppGrid from "../../components/AppAnalytics/AppGrid";
import AppDetails from "../../components/AppAnalytics/AppDetails";
import appAnalyticsData from "../../data/appAnalyticsData";

function AppAnalytics() {
  const [selectedApp, setSelectedApp] = useState(appAnalyticsData[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Today");

  const filteredApps = useMemo(() => {
    if (!searchQuery.trim()) return appAnalyticsData;
    return appAnalyticsData.filter((app) =>
      app.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="space-y-6">
      <AppAnalyticsHeader
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      <AppSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <AppGrid
        apps={filteredApps}
        selectedApp={selectedApp}
        setSelectedApp={setSelectedApp}
      />

      <AppDetails app={selectedApp} />
    </div>
  );
}

export default AppAnalytics;