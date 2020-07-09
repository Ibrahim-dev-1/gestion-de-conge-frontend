import React from 'react';
import { Link } from 'react-router-dom';
import DivisionModal from '../components/modals/DivisionModal'
import TypeCongeModal from '../components/modals/TypeCongeModal'

// import icons
import DivisionIcon from '../assets/icons/division.png';
import TypeCongeIcon from '../assets/icons/typeConge.png';
import StatusIcon from '../assets/icons/status.png';

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
                    <div className="col-lg-4">
                        <div className="card card-primary card-outline">
                            <div className="card-body">
                                <h3 className="text-center">
                                    <img className="text-primary" width="200px" height="100px" src={DivisionIcon}></img>   
                                </h3>   
                                <h4 className="card-title text-primary font-weight-bold">Division</h4>   
                                <p className="card-text text-muted">Créez ou voir les détailles des divisions en cliquent sur le bouton correspondent</p>   
                                <div className="d-flex justify-content-center">
                                    <button 
                                        data-target="#divisionModal"
                                        data-toggle="modal"
                                        className="btn btn-outline-info"
                                    >Créez une division</button>   
                                    <Link className="nav-link" to="#detail">Voir detailles</Link>   
                                </div>   
                            </div>   
                        </div>   
                    </div>   
                    <div className="col-lg-4">
                        <div className="card card-success card-outline">
                            <div className="card-body">
                                <h3 className="text-center">
                                    <img className="text-primary" width="200px" height="100px" src={StatusIcon}></img>   
                                </h3>   
                                <h4 className="card-title text-primary font-weight-bold">Status</h4>   
                                <p className="card-text text-muted">le module status est par default configurer. cliquez tous simplement sur initialiser pour les enrégistrez </p>   
                                <div className="d-flex justify-content-center">
                                    <button className="btn btn-outline-success" onClick={handleInitClick}>Initialisez</button>   
                                    <Link className="nav-link" to="#detail">Voir detailles status</Link>   
                                </div>   
                            </div>   
                        </div>   
                    </div>   
                    <div className="col-lg-4">
                        <div className="card card-danger card-outline">
                            <div className="card-body">
                                <h3 className="text-center">
                                    <img className="text-primary" width="200px" height="100px" src={TypeCongeIcon}></img>   
                                </h3>   
                                <h4 className="card-title text-primary font-weight-bold">Type de Congé</h4>   
                                <p className="card-text text-muted">Créez ou voir les détailles d'un type de congé </p>   
                                <div className="d-flex justify-content-center">
                                    <button 
                                        className="btn btn-outline-primary" 
                                        data-target="#typeCongeModal"
                                        data-toggle="modal"
                                    >Créez TypeCongé</button>   
                                    <Link className="nav-link" to="#detail">Voir detailles d'un type de congé</Link>   
                                </div>   
                            </div>   
                        </div>   
                    </div>   
                </div>   
            </div>   
            
        </React.Fragment>
    )
}

export default Configuration;