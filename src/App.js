import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Containers/Home/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      
      <Routes>
          {/* not logged users: will be allowed to see home only. Othewise, pop up the login or register component */}
          {/* logged users: wll be able to see: dashboard(home2) / profile/:id / */}
          <Route path="/" element={<Home/>}/>
      </Routes>

      </BrowserRouter>
      
    </div>
  );
}

export default App;
