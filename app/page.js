import { Toaster } from "react-hot-toast";
import TodoApp from "./components/template";

export default function App() {
  return (
    <>
      <TodoApp />
      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
}
