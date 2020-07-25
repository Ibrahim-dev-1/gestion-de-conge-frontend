import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DivisionModal from '../components/modals/DivisionModal'
import TypeCongeModal from '../components/modals/TypeCongeModal'

// import icons
import DivisionIcon from '../assets/icons/division.png';
import TypeCongeIcon from '../assets/icons/typeConge.png';
import StatusIcon from '../assets/icons/status.png';
import Calendrier from '../components/Calendrier';

const Configuration = (v) => {
   
    const [errors, setErrors] =  React.useState([])
    const handleInitClick = async (ev) => {
       try {
        ev.preventDefault();
        // fetch data from database

        const response = await fetch('http://localhost:8888/api', {
            method: "POST",
            body: JSON.stringify({query: `mutation{initStatus}`}),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        if(data.errors){
            console.log(errors)
            return setErrors(data.errors);
        }
        setErrors([]);
        return console.log("initialisation réussit")
       } catch (error) {
           console.log(error);
           return setErrors(error);
       }
    }
   
    return (
        <React.Fragment>
            <DivisionModal />
            <TypeCongeModal />
            <div className="content-header">
                <h2 className="mb-2 text-center font-weight-bold">Configurations</h2>   
            </div>   
            <div className="content">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card card-widget widget-user">
                            <div className="widget-user-header bg-info">
                                <h4 className="widget-user-username">Configuration de la division</h4>
                            </div>
                            <div className="widget-user-image">
                                <img className="img-circle p-3 elevation-2" src={DivisionIcon} alt="division Avatar" />
                            </div>
                            <div className="card-footer d-flex justify-content-around">
                                <button 
                                    data-target="#divisionModal"
                                    data-toggle="modal"
                                    className="btn btn-info"
                                >Nouveau</button>   
                                <Link className="nav-link" to="/dashboard/detailsDivision">Détails division</Link>   
                            </div>  
                        </div>
                    </div>  
                    <div className="col-md-4">
                        <div className="card card-widget widget-user">
                            <div className="widget-user-header bg-success">
                                <h4 className="widget-user-username">Configuration du status</h4>
                            </div>
                            <div className="widget-user-image">
                                <img className="img-circle p-3 elevation-2" src={StatusIcon} alt="division Avatar" />
                            </div>
                            <div className="card-footer d-flex justify-content-around">
                                <button className="btn btn-success" onClick={handleInitClick}>Initialisez</button>   
                                <Link className="nav-link" to="/dashboard/detailsStatus">Détails Status</Link>    
                            </div>  
                        </div>
                    </div>  
                    <div className="col-md-4">
                        <div className="card card-widget widget-user">
                            <div className="widget-user-header bg-warning">
                                <h4 className="widget-user-username">Configuration des types de Congés</h4>
                            </div>
                            <div className="widget-user-image">
                                <img className="img-circle p-3 elevation-2" src={TypeCongeIcon} alt="division Avatar" />
                            </div>
                            <div className="card-footer d-flex justify-content-around">
                                <button 
                                    className="btn btn-warning" 
                                    data-target="#typeCongeModal"
                                    data-toggle="modal"
                                >Nouveau</button>   
                                <Link className="nav-link " to="/dashboard/detailsTypeConge">Détails type de congé</Link>    
                            </div>  
                        </div>
                    </div>  
                </div> 
                
                <div className="mt-3 bg-white">
                        <Calendrier /> 
                </div>  
            </div>   
            
        </React.Fragment>
    )
}

export default Configuration;