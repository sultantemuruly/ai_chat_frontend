import { useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router";
import { Button } from "../../shared/ui/button.tsx";
import { ThemeToggle } from "../../modules/theme/theme-toggle.tsx";

export const Wrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/chat/psychologist");
  }, []);

  return (
    <article className="w-screen min-h-screen flex bg-background text-foreground">
      <aside className="min-w-90 h-screen bg-blue-700 p-8 flex flex-col gap-y-5">
        {/* Theme toggle */}
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>

        {/* Chat buttons */}
        <Button
          asChild
          variant="ghost"
          className={`w-full justify-center text-center font-medium ${
            location.pathname === "/chat/psychologist"
              ? "bg-white/90 text-black"
              : "text-white"
          }`}
        >
          <NavLink to="/chat/psychologist">Psychologist</NavLink>
        </Button>
        <Button
          asChild
          variant="ghost"
          className={`w-full justify-center text-center font-medium ${
            location.pathname === "/chat/motivator"
              ? "bg-white/90 text-black"
              : "text-white"
          }`}
        >
          <NavLink to="/chat/motivator">Motivator</NavLink>
        </Button>
        <Button
          asChild
          variant="ghost"
          className={`w-full justify-center text-center font-medium ${
            location.pathname === "/chat/advisor"
              ? "bg-white/90 text-black"
              : "text-white"
          }`}
        >
          <NavLink to="/chat/advisor">Advisor</NavLink>
        </Button>
      </aside>
      <main className="flex-1">
        <Outlet />
      </main>
    </article>
  );
};
