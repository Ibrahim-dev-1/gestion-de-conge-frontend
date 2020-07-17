import React from 'react';
import {NavLink , Link } from 'react-router-dom';

const MainSidebar = () =>{
    return (
        <aside className="main-sidebar position-fixed sidebar-light-success elevation-5">
        <Link to="#" className="brand-link">
          <img  alt="agents" className="brand-image img-circle elevation-3"
               style={{opacity: ".8"}} />
          <span className="brand-text font-weight-bold">GestConge</span>
        </Link>
    
        <div className="sidebar"> 
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img  className="img-circle elevation-2" alt="User" />
            </div>
            <div className="info">
              <NavLink  to="#" className="d-block">Kratos bosse</NavLink>
            </div>
          </div>
    
          <nav className="mt-2">
            <ul className="nav flex-column" data-widget="treeview" role="menu" data-accordion="true">
              <li className="bg-light">
                <NavLink to="#" data-target="#agent" data-toggle="collapse" className="nav-link active">
                   Gestion des agents
                </NavLink>
                
                <div className="collapse" id="agent">
                  <NavLink to="/dashboard/agents" className="nav-link">
                    List des agents
                  </NavLink>
                </div>
              </li>
              <hr/>
              <li className="nav-item">
                  <Link to="/dashboard/configuration" className="nav-link">configuration</Link>
              </li>
                       
            </ul>
          </nav>
        </div>
      </aside>
    )
}

export default MainSidebar;