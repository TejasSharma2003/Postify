import { Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

//configure redux

//pages
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/home';

//Components
import Navbar from './components/Navbar';
import RequiredAuth from 'components/RequiredAuth';
import PersistLogin from 'components/PersistLogin';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        {/* public routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route element={<PersistLogin />}>
          <Route path="/" element={<Home />} />
        </Route>
        {/* private routes */}
        <Route element={<RequiredAuth />}>
          <Route path="me" element={<h1>This is my profile page</h1>} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
