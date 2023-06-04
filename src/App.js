import { useContext } from 'react';
import './App.css';
import { AuthContext } from './context/AuthContext';
import Login from './pages/login/login';

import UserList from './userList/userlist';
import User from './users/users';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './pages/register/register';

function App() {
  const { user } = useContext(AuthContext);
  console.log(user)
  return (
    <Router>
      {user && (
        <div className="App">

          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/rege" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          
        </div>
      )}
      {!user && (<>

        <Routes>
          <Route path="/rege" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </>
      )}
    </Router>
  );
}
// email:"user@gmail.com"
export default App;
