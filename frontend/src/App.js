import "./App.css";
import Students from "./components/students/Students";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Update from "./components/update/Update";
import Create from "./components/create/Create";
import View from "./components/view/View";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Students />}></Route>
          <Route path="/create" element={<Create />}></Route>
          <Route path="/update/:id" element={<Update />}></Route>
          <Route path="/view/:id" element={<View />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
