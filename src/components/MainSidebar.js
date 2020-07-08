import React from 'react';
import {NavLink , Link } from 'react-router-dom';

const MainSidebar = () =>{
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <Link to="#endregionindex3.html" className="brand-link">
          <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3"
               style={{opacity: ".8"}} />
          <span className="brand-text font-weight-light">GestConge</span>
        </Link>
    
        <div className="sidebar"> 
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User" />
            </div>
            <div className="info">
              <NavLink  to="#" className="d-block">Kratos bosse</NavLink>
            </div>
          </div>
    
          <nav classNameName="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              <li className="nav-item has-treeview menu-open">
                <NavLink to="#" className="nav-link active">
                  <i className="nav-icon fas fa-tachometer-alt"></i>
                  <p>
                    Dashboard
                    <i className="right fas fa-angle-left"></i>
                  </p>
                </NavLink>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <NavLink to="./index.html" className="nav-link active">
                      <i className="far fa-circle nav-icon"></i>
                      <p>gestion</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="./index2.html" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Dashboard v2</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="./index3.html" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>trojf</p>
                    </NavLink>
                  </li>
                </ul>
                
              </li>
              <li className="nav-item has-treeview menu-open">
                <NavLink to="#" className="nav-link active">
                  <i className="nav-icon fas fa-tachometer-alt"></i>
                  <p>
                    Dashboard
                    <i className="right fas fa-angle-left"></i>
                  </p>
                </NavLink>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <NavLink to="./index.html" className="nav-link active">
                      <i className="far fa-circle nav-icon"></i>
                      <p>gestion</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="./index2.html" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Dashboard v2</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="./index3.html" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>trojf</p>
                    </NavLink>
                  </li>
                </ul>
                
              </li>
              <li className="nav-item has-treeview menu-open">
                <NavLink to="#" className="nav-link active">
                  <i className="nav-icon fas fa-tachometer-alt"></i>
                  <p>
                    Dashboard
                    <i className="right fas fa-angle-left"></i>
                  </p>
                </NavLink>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <NavLink to="./index.html" className="nav-link active">
                      <i className="far fa-circle nav-icon"></i>
                      <p>gestion</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="./index2.html" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Dashboard v2</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="./index3.html" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>trojf</p>
                    </NavLink>
                  </li>
                </ul>
                
              </li>
              <li className="nav-header">MULTI LEVEL EXAMPLE</li>
                       
            </ul>
          </nav>
        </div>
      </aside>
    )
}

export default MainSidebar;