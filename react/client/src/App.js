import './App.css';
import Login from './components/login.jsx'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './components/signup.jsx';
import Home from './components/home.jsx';
import EditUser from './components/editUser.jsx';
import Dashboard from './components/dashboard.jsx';
import Popup from './components/toast.jsx';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login></Login>}></Route>
          <Route path='/signup' element={<Signup></Signup>}></Route>
          <Route path='/editUser' element={<EditUser></EditUser>}></Route>
          <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
          <Route path='/toast' element={<Popup></Popup>}></Route>
        </Routes>
      </BrowserRouter>
      {/* <Hooks></Hooks> */}
    </div>
  );
}

export default App;