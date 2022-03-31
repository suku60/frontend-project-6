import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Containers/Login/Login';
import Home from './Containers/Home/Home';
import Profile from './Containers/Profile/Profile';
import LeftNavbar from './Components/LeftNavbar/LeftNavbar';
import RightNavbar from './Components/RightNavbar/RightNavbar';
import  Search from './Containers/Search/Search';

import { NotificationsProvider } from '@mantine/notifications';
import { MantineProvider } from '@mantine/core';

function App() {
  return (
    <MantineProvider>
    <NotificationsProvider>
    <div className="App">
      <BrowserRouter>
      <LeftNavbar/>
      
      <Routes>
          {/* not logged users: will be allowed to see home only. Othewise, pop up the login or register component */}
          {/* logged users: wll be able to see: dashboard(home2) / profile/:id / */}
          <Route path="/" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/search" element={<Search/>}/>
          
      </Routes>

      <RightNavbar/>

      </BrowserRouter>
      
    </div>
    </NotificationsProvider>
    </MantineProvider>

  );
}

export default App;
