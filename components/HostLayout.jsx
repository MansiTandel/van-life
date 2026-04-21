import React from 'react'
import { Link, Outlet, NavLink } from 'react-router-dom'

function HostLayout() {
  const activeStyles= {
        fontWeight: "bold",
         textDecoration: "underline",
          color: "#161616",
    }
  return (
    <div>
        
        <nav className="host-nav">
            {/* <Link to="/host">Host</Link>
            <Link to="/host/income">Income</Link>
            <Link to="/host/reviews">Reviews</Link> */}
            <NavLink to="." 
                      end
            style={ ({isActive}) => 
              isActive ? activeStyles : null  
            }>Dashboard</NavLink>

            <NavLink  to="income" //to="/host/income"
            style={ ({isActive}) => 
              isActive ? activeStyles : null  
            }>Income</NavLink>

            <NavLink
                    to="/host/vans"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    vans
                </NavLink>

            <NavLink to="/host/reviews" 
            style={ ({isActive}) => 
              isActive ? activeStyles : null  
            }>Reviews</NavLink>
                
        </nav>
        <Outlet></Outlet>
      
    </div>
  )
}

export default HostLayout
