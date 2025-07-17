import { useState } from 'react'
import Header from './Component/Header/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css'
import Home from './pages/Home/Home';
import Footer from './Component/Footer/Footer';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Stock from './pages/Stock/Stock';
import AdminDashboard from './pages/Admin/AdminDashboard/AdminDashboard';
import RegisterStudent from './pages/Admin/RegisterStudent/RegisterStudent';
import ManageMedicine from './pages/Admin/ManageMedicine/ManageMedicine';
import Record from './pages/Admin/Records/Record';
import Facilities from './pages/Admin/Facilities/Facilities';
import NearByHospital from './pages/Admin/NearByHospital/NearByHospital';
import AdminGallery from './pages/Admin/AdminGallery/AdminGallery';
import StudentDashboard from './pages/Admin/StudentDashboard/StudentDashboard';
import GlobalLoader from './Component/GlobalLoader/GlobalLoader';


function App() {
const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin") === "true");
const [loader, setLoader] = useState(false)

const role = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).role : null;
const id = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user"))._id : null;

const handelLogin = (value) => {
  setIsLogin(value)
} 

const showLoader = () => {
  setLoader(true)
}

const hideLoader = () => {
  setLoader(false)
} 


  return (
    <div className='App'>
     <Header isLogin = {isLogin} handelLogin={handelLogin} showLoader = {showLoader} hideLoader = {hideLoader}/>
     <Routes>
      <Route path='/' element= {<Home showLoader = {showLoader} hideLoader = {hideLoader} />}/>
      <Route path='/login' element= {isLogin? role=== "student"?<Navigate to={`/student/${id}`}/> : <Navigate to={"/admin/dashboard"}/> :<Login handelLogin={handelLogin} showLoader = {showLoader} hideLoader = {hideLoader}/>}/>
      <Route path='/signup' element= {<Signup showLoader = {showLoader} hideLoader = {hideLoader} />}/>
      <Route path='/stock' element= {<Stock showLoader = {showLoader} hideLoader = {hideLoader}/>}/>
      <Route path='/admin/dashboard' element= {isLogin && role !== "student"?<AdminDashboard showLoader = {showLoader} hideLoader = {hideLoader}/> : <Navigate to={'/'}/>}/>
      <Route  path='/admin/register-student' element = {isLogin && role !== "student"?<RegisterStudent showLoader = {showLoader} hideLoader = {hideLoader}/> : <Navigate to={'/'}/>}/>
      <Route  path='/admin/manage-medicine' element = {isLogin && role !== "student"?<ManageMedicine showLoader = {showLoader} hideLoader = {hideLoader}/> : <Navigate to={'/'}/>}/>
      <Route  path='/admin/record' element = {isLogin && role !== "student"?<Record showLoader = {showLoader} hideLoader = {hideLoader}/>: <Navigate to={'/'}/>}/>
      <Route  path='/admin/facilities' element = {isLogin && role !== "student"?<Facilities showLoader = {showLoader} hideLoader = {hideLoader}/> : <Navigate to={'/'}/>}/>
      <Route  path='/admin/nearByHospital' element = {isLogin && role !== "student"?<NearByHospital showLoader = {showLoader} hideLoader = {hideLoader}/> : <Navigate to={'/'}/>}/>
      <Route  path='/admin/gallery' element = {isLogin && role !== "student"?<AdminGallery showLoader = {showLoader} hideLoader = {hideLoader}/> : <Navigate to={'/'}/>}/>

      <Route  path='/student/:id' element = {isLogin && role === "student"?<StudentDashboard showLoader = {showLoader} hideLoader = {hideLoader}/> : <Navigate to={'/'}/>}/>
     </Routes>
      <Footer/>
      
      {loader && <GlobalLoader />}
    </div>
  )
}

export default App
