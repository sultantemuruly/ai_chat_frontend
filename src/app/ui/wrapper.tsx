import { NavLink, Outlet } from "react-router";
import { Button } from "../../shared/ui/button.tsx";

export const Wrapper = () => {
  return (
    <article className={"w-screen min-h-screen flex bg-red-100"}>
      <aside
        className={"min-w-90 h-screen bg-blue-500 p-8 flex flex-col gap-y-5"}
      >
        <Button variant={"destructive"} />
        <NavLink
          to={"/profile"}
          className={({ isActive }) =>
            `w-full h-8 ${
              isActive ? "bg-red-500 text-white" : "bg-white"
            } flex items-center justify-center`
          }
        >
          Profile
        </NavLink>
        <NavLink
          to={"/posts"}
          className={({ isActive }) =>
            `w-full h-8 ${
              isActive ? "bg-red-500 text-white" : "bg-white"
            } flex items-center justify-center`
          }
        >
          Posts
        </NavLink>
        <NavLink
          to={"/settings"}
          className={({ isActive }) =>
            `w-full h-8 ${
              isActive ? "bg-red-500 text-white" : "bg-white"
            } flex items-center justify-center`
          }
        >
          Settings
        </NavLink>
      </aside>
      <Outlet />
    </article>
  );
};
