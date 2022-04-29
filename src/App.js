import "./App.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import AddEditUser from "./pages/AddEditUser"
import UserInfo from "./pages/UserInfo"
import About from "./pages/About"
import NavBar from "./components/NavBar"

//Imports for React-Toastify
// https://www.npmjs.com/package/react-toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/addUser" element={<AddEditUser />} />
        <Route path="/editUser/:id" element={<AddEditUser />} />
        <Route path="/userInfo/:id" element={<UserInfo />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
