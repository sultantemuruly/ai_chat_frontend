import { Route, Routes } from "react-router";
import { Wrapper } from "./ui/wrapper.tsx";
import Chat from "../modules/chat/chat.tsx";

export const App = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Wrapper />}>
        <Route
          path="chat"
          element={
            <div className="flex justify-center items-center">
              <Chat />
            </div>
          }
        />
      </Route>
    </Routes>
  );
};
