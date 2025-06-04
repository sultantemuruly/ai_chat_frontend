import { Route, Routes } from "react-router";
import { Wrapper } from "./ui/wrapper.tsx";
import PsychologistChat from "../modules/chat/psychologist_chat.tsx";

export const App = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Wrapper />}>
        <Route
          path="psychologist_chat"
          element={
            <div className="flex justify-center items-center">
              <PsychologistChat
                name="Psychologist AI"
                description="Psychologist that supports your mental well-being."
                imgSrc="https://images.unsplash.com/photo-1607746882042-944635dfe10e"
              />
            </div>
          }
        />
      </Route>
    </Routes>
  );
};
