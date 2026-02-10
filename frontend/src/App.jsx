import { Routes, Route } from "react-router-dom";
import CreateNote from "./pages/CreateNote";
import ViewNote from "./pages/ViewNote";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CreateNote />} />
      <Route path="/note/:id" element={<ViewNote />} />
    </Routes>
  );
}

export default App;
