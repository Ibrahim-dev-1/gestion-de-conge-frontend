import React from 'react';
import { Link } from 'react-router-dom';
import DivisionModal from '../components/modals/DivisionModal'
import TypeCongeModal from '../components/modals/TypeCongeModal'
import './custumButton.css';

// import icons
import Calendrier from '../components/Calendrier';

const Configuration = (props) => {
   
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
                            <div className="p-4 border rounded bg-info">
                                <h4 className="font-weight-bold text-center">Configuration de la division</h4>
                                <div className="d-flex justify-content-around">
                                    <button 
                                        data-target="#divisionModal"
                                        data-toggle="modal"
                                        className="kratosButtonDivision"
                                    >Nouveau</button>   
                                    <Link className="kratosButtonDivision" to="/dashboard/detailsDivision">Détails division</Link>   
                                </div>  
                            </div>
                    </div>  
                    <div className="col-md-4">
                            <div className="p-4 bg-success  border rounded">
                                <h4 className="font-weight-bold text-center">Configuration du status</h4>
                                <div className="d-flex justify-content-around text-light">
                                    <button className="kratosButtonDivision" onClick={handleInitClick}>Initialisez</button>   
                                    <Link className="kratosButtonDivision" to="/dashboard/detailsStatus">Détails Status</Link>    
                                </div>  
                            </div>
                    </div>  
                    <div className="col-md-4">
                            <div className="text-center border rounded p-4 bg-warning">
                                <h4 className="font-weight-bold text-center">Config Types de Congés</h4>
                                <div className="d-flex justify-content-around">
                                    <button 
                                        className="kratosButtonDivision" 
                                        data-target="#typeCongeModal"
                                        data-toggle="modal"
                                    >Nouveau</button>   
                                    <Link className="kratosButtonDivision" to="/dashboard/detailsTypeConge">Détails type de congé</Link>    
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