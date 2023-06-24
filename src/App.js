// import logo from './logo.svg';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import MyApp from "./pages";

function App() {
  return (
      <BrowserRouter>
        {/*<div className="container">*/}
          <Routes>
            <Route index path="/*" element={<MyApp/>}/>
          </Routes>
        {/*</div>*/}
      </BrowserRouter>
  );
}

export default App;
