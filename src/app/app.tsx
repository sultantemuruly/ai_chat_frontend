import { Route, Routes } from "react-router";
import { Wrapper } from "./ui/wrapper.tsx";
import Chat from "../modules/chat/chat.tsx";
import {
  psychologistChat,
  motivatorChat,
  advicerChat,
} from "../shared/model/chatProfiles";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Wrapper />}>
        <Route
          path="chat/psychologist"
          element={
            <div className="flex justify-center items-center">
              <Chat key="psychologist" {...psychologistChat} />
            </div>
          }
        />
        <Route
          path="chat/motivator"
          element={
            <div className="flex justify-center items-center">
              <Chat key="motivator" {...motivatorChat} />
            </div>
          }
        />
        <Route
          path="chat/advisor"
          element={
            <div className="flex justify-center items-center">
              <Chat key="advisor" {...advicerChat} />
            </div>
          }
        />
      </Route>
    </Routes>
  );
};
