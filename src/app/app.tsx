import { Route, Routes } from "react-router";
import { Wrapper } from "./ui/wrapper.tsx";

export const App = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Wrapper />}></Route>
    </Routes>
  );
};
