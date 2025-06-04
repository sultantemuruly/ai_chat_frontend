import { NavLink, Outlet } from "react-router";
import { Button } from "../../shared/ui/button.tsx";

export const Wrapper = () => {
  return (
    <article className={"w-screen min-h-screen flex bg-slate-100"}>
      <aside
        className={"min-w-90 h-screen bg-blue-700 p-8 flex flex-col gap-y-5"}
      >
        <Button asChild variant="ghost" className="w-full justify-center">
          <NavLink to="/chat" className="text-center text-white">
            AI Chat
          </NavLink>
        </Button>
      </aside>
      <main className="flex-1">
        <Outlet />
      </main>
    </article>
  );
};
