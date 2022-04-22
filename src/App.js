import './App.css';

import Login from './components/Login';
import Register from './components/Register';
import { Routes, Route } from "react-router-dom";
import RegisterConfirmation from './components/RegisterConfirmation';
import UserHome from './components/UserHome';
import RegisterProduct from './components/RegisterProduct';
import BorrowProduct from './components/BorrowProduct';


export const myStorage = window.localStorage;
export const USER_REST_API_URL = "http://192.168.17.195:8080";
function App() {
  const pathname = window.location.pathname;
  // console.log(pathname);
  // console.log("%PUBLIC_URL%");
  return (
    <div className="App">
      <div>
       
        
        <Routes>
          <Route path={pathname} element={<Login />} />
          <Route path="/registerUser" element={<Register />} />
          <Route path="/registerConfirmation" element={<RegisterConfirmation />} />
          <Route path="/userHome" element={<UserHome />} />
          <Route path="/registerProduct" element={<RegisterProduct />} />
          <Route path="/borrowProduct" element={<BorrowProduct />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
