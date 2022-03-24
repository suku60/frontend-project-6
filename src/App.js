import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Containers/Login/Login';
import Home from './Containers/Home/Home';
import Profile from './Containers/Profile/Profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      
      <Routes>
          {/* not logged users: will be allowed to see home only. Othewise, pop up the login or register component */}
          {/* logged users: wll be able to see: dashboard(home2) / profile/:id / */}
          <Route path="/" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/profile" element={<Profile/>}/>
      </Routes>

      </BrowserRouter>
      
    </div>
  );
}

export default App;
