import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import MyApp from "./pages";

function App() {
  return (
      <BrowserRouter>
          <Routes>
            <Route index path="/*" element={<MyApp/>}/>
          </Routes>
      </BrowserRouter>
  );
}
export default App;


