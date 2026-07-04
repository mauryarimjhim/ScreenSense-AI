import AppCard from "./AppCard";

function AppGrid({ apps, selectedApp, setSelectedApp }) {
  return (
    <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {apps.map((app) => (
        <AppCard
          key={app.id}
          app={app}
          isSelected={selectedApp?.id === app.id}
          onClick={() => setSelectedApp(app)}
        />
      ))}
    </div>
  );
}

export default AppGrid;