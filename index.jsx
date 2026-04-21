import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Vans from './pages/Vans/Vans';
import VanDetail from './pages/Vans/VanDetail';
import Layout from './components/Layout';
import "./server"
import Dashboard from './pages/Host/Dashboard';
import Income from './pages/Host/Income';
import Reviews from './pages/Host/Reviews';
import HostVans from './pages/Host/HostVans';
import HostLayout from './components/HostLayout';
import HostVanDetail from './pages/Host/HostVanDetail';
import HostVanPricing from './pages/Host/HostVanPricing';
import HostVanPhotos from './pages/Host/HostVanPhotos';
import HostVanInfo from './pages/Host/HostVanInfo';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import AuthRequired from './components/AuthRequired';
function App() {
  return (
    <BrowserRouter>

      {/* <header>
        <Link className="site-logo" to="/">#VanLife</Link>
        <nav>
          <Link to="/about">About</Link>
          <Link to="/vans">Vans</Link>
        </nav>
      </header> */}

      <Routes>
          <Route path="/" element={<Layout />}>
          
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            
            <Route path="vans">
            <Route index element={<Vans />} />
               <Route path=":id" element={<VanDetail />} />
            </Route>
             <Route
            path="login"
            element={<Login />}
          />
            {/* <Route path="/vans" element={<Vans />} />
            <Route path="/vans/:id" element={<VanDetail/>}/> */}
          
          <Route element={<AuthRequired/>}>
            <Route path="host" element={<HostLayout/>} >
                <Route index element={<Dashboard />} />
                <Route path="income" element={<Income/>} />
                <Route path="vans" element={<HostVans></HostVans>} />
                
                <Route path="reviews" element={<Reviews/>} />
                    <Route path="vans/:id" element={<HostVanDetail />} >
                        <Route index element={<HostVanInfo />} />
                        <Route path="pricing" element={<HostVanPricing />} />
                        <Route path="photos" element={<HostVanPhotos />} />
                    </Route>
            </Route>
          </Route>


          <Route path="*" element={<NotFound></NotFound>}></Route>
       </Route>
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App />);