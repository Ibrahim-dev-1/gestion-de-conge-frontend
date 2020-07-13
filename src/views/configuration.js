import React from 'react';
import { Link } from 'react-router-dom';
import DivisionModal from '../components/modals/DivisionModal'
import TypeCongeModal from '../components/modals/TypeCongeModal'

// import icons
import DivisionIcon from '../assets/icons/division.png';
import TypeCongeIcon from '../assets/icons/typeConge.png';
import StatusIcon from '../assets/icons/status.png';
import Calendrier from '../components/Calendrier';

const Configuration = (v) => {

    // init boutton
    const handleInitClick = () => {
        console.log("status is initialize")
    }   
   
    return (
        <React.Fragment>
            <DivisionModal />
            <TypeCongeModal />
            <div className="content-header">
                <h2 className="display-3 mb-2 text-center font-weight-bold">Configurations</h2>   
            </div>   
            <div className="content">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card card-widget widget-user">
                            <div className="widget-user-header bg-info">
                                <h3 className="widget-user-username">Configuration de la division</h3>
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
                                <Link className="nav-link" to="#detail">Détails division</Link>   
                            </div>  
                        </div>
                    </div>  
                    <div className="col-md-4">
                        <div className="card card-widget widget-user">
                            <div className="widget-user-header bg-success">
                                <h3 className="widget-user-username">Configuration du status</h3>
                            </div>
                            <div className="widget-user-image">
                                <img className="img-circle p-3 elevation-2" src={StatusIcon} alt="division Avatar" />
                            </div>
                            <div className="card-footer d-flex justify-content-around">
                                <button className="btn btn-success" onClick={handleInitClick}>Initialisez</button>   
                                <Link className="nav-link" to="#detail">Détails Status</Link>    
                            </div>  
                        </div>
                    </div>  
                    <div className="col-md-4">
                        <div className="card card-widget widget-user">
                            <div className="widget-user-header bg-warning">
                                <h3 className="widget-user-username">Configuration des types de Congés</h3>
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
                                <Link className="nav-link " to="#detail">Détails type de congé</Link>    
                            </div>  
                        </div>
                    </div>  
                </div> 
                
                <div className="mt-3 bg-white">
                    <div className="container">
                        <Calendrier /> 
                    </div>   
                </div>  
            </div>   
            
        </React.Fragment>
    )
}

export default Configuration;