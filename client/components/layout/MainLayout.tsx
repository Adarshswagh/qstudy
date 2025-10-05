// client/components/layout/MainLayout.tsx
import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <div>
      <header>Header content here</header>
      <main>
        <Outlet /> {/* This renders nested route content */}
      </main>
      <footer>Footer content here</footer>
    </div>
  );
}
