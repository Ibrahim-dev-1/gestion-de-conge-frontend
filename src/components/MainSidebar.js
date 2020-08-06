import React from 'react';
import {NavLink , Link } from 'react-router-dom';
import { logout , useAuthDispatch} from '../contexts/authContext'

const MainSidebar = () =>{
  const dispatch = useAuthDispatch();
    return (
        <aside className="main-sidebar position-fixed kratosSidebar elevation-5">
        <Link to="#" className="brand-link">
          <img  alt="agents" className="brand-image img-circle elevation-3"
               style={{opacity: ".8"}} />
          <span className="brand-text font-weight-bold">GestConge</span>
        </Link>
    
        <div className="sidebar"> 
          <div className="user-panel mt-3 pb-3 mb-3d-flex">
            <div className="image">
              <img  className="img-circle elevation-2" alt="User" />
            </div>
            <div className="info kratosItem">
              <NavLink  data-toggle="collapse" to="" data-target="#collpaseInfo" className="d-block">{sessionStorage.getItem("email")}oj</NavLink>
              <div id="collpaseInfo" className="collapse">
                <NavLink  to="#" className="d-block">mes Infos</NavLink>
                <button onClick={function(){return logout(dispatch)}} className="kratosBtn">déconnection</button>
              </div>
            </div>
            
          </div>
    
          <nav className="mt-2">
            <ul className="nav flex-column" data-widget="treeview" role="menu" data-accordion="true">
              <li className="kratos-item">
                <NavLink to="#" data-target="#agent" data-toggle="collapse" className="nav-link active">
                   Agents
                </NavLink>
                
                <div className="collapse" id="agent">
                  <NavLink to="/dashboard/agents" className="nav-link">
                    List des agents
                  </NavLink>
                 { (sessionStorage.getItem("grade") === "GRH" ||
                 sessionStorage.getItem("grade") === "SUPERADMIN") && <NavLink to="/dashboard/agent/add" className="nav-link">
                    Ajoutez un agent
                  </NavLink>}
                </div>
              </li>
              <hr/>
              <li className="kratos-item">
                <NavLink to="#" data-target="#conge" data-toggle="collapse" className="nav-link">
                   Congé
                </NavLink>
                
                <div className="collapse" id="conge">
                  <Link to="/conge/demande" className="nav-link">Demandez congé</Link>
                  <Link to="/dashboard/conge/gestionDemande" className="nav-link">Gérez les demandes </Link>
                </div>
              </li>
              
              { (sessionStorage.getItem("grade") === "GRH" ||
                 sessionStorage.getItem("grade") === "SUPERADMIN") && <li className="kratos-item">
                  <NavLink to="/dashboard/configuration" className="nav-link">configuration</NavLink>
                </li>}
                       
            </ul>
          </nav>
        </div>
      </aside>
    )
}

export default MainSidebar;