import React from 'react';
import { Link } from 'react-router-dom';
import { createNotification } from '../myFonctions';
import Notification from 'react-notifications-component';

const GrhComponent = () => {

    const [demandeEnAttentes , setDemandeEnAttentes ] = React.useState([]);
    const [demandeRefuser , setDemandeRefuser ] = React.useState([]);
    const [demandeAccepter , setDemandeAccepter ] = React.useState([]);

    // get status
    const getDemandeStatus = (conge) => {
        setDemandeEnAttentes([]);
        if(conge.length > 0){
            return conge.map(function(demande){
                if(demande.status === "en Attente"){
                    setDemandeEnAttentes([...demandeEnAttentes, demande]);
                }
                if(demande.status === "Refuser"){
                    setDemandeRefuser([...demandeRefuser, demande]);
                }
                if(demande.status === "Accepter"){
                    setDemandeAccepter([...demandeAccepter, demande]);
                }
               
            })
        }
        return console.log("la demande de congé est vide ")
    }

    const fetchDataConges = () =>{
        fetch('/', {
            method:'POST',
            body: JSON.stringify({
                query: `query{
                    conges{
                    dateFin createdAt updatedAt isChefAuthorized status dateDebut Id agent{ nom prenom email telephone fonction }
                }}`
            }),
            headers: {
                'Content-Type': 'Application/json',
                'Authorization': 'Bearer '+ sessionStorage.getItem("token")
            }
        })
        .then(function(response){
            return response.json();
        }).then(function(data){
            if(data.errors)
                throw data.errors;
            
            console.log(data.data);
            getDemandeStatus(data.data.conges)
        })
        .catch(function(errs){ 
            if(errs.length >0 ){
                return errs.map(function(err){
                    return createNotification("Erreur ", "danger", err.message, "top-right")
                })
            }
        })
    }
    // component did mount
    React.useEffect(() => {

        fetchDataConges();
    },[]);

    const handleAccept = (ev) => {
        return fetch('/', {
            method: 'POST',
            body: JSON.stringify({ query: ` mutation{ 
                setStatus(id: "${ev.target.id}", name: "Accepter" ) 
               }`}) ,
            headers: {
                'Content-Type': 'Application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
            }
        }).then(function(response){
            return response.json();
        }).then(function(data){
            if(data.errors)
                throw data.errors;
            fetchDataConges()
            return createNotification("Demande Accepter",'La Demande à été accepter', 'success', 'top-left');
        }).catch(function(errors){
            if(errors.length > 0){
                errors.map(function(err){
                    return createNotification("Error", err.message, 'danger', 'top-left');
                })
            }
        })
        
    }
    
    const handleRefuse = (ev) => {
        return  fetch('/', {
            method: 'POST',
            body: JSON.stringify({ query: ` mutation{ 
                setStatus(id: "${ev.target.id}", name: "Refuser" )
                }`}) ,
            headers: {
                'Content-Type': 'Application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
            }
        }).then(function(response){
            return response.json();
        }).then(function(data){
            const id = ev.target.value;
            if(data.errors)
                throw data.errors;
            
           
                fetchDataConges();
            return createNotification("Demande Refuser",'La Demande à été Refusez', 'success', 'top-left');
        }).catch(function(errors){
            if(errors.length > 0){
                errors.map(function(err){
                    return createNotification("Error", err.message, 'danger', 'top-left');
                })
            }
        })

    }

    return <React.Fragment>
            <div style={{margin: "3rem auto"}} className="">
            <Link to="#" data-target="#demandeAttenteCollapse" data-toggle="collapse">
                <p  
                    style={{maxWidth: "500px", margin: "1rem auto"}} 
                    className="border rounded p-3 bg-light text-center">
                        voir tous les ( <span className="font-weight-bold text-danger">{demandeEnAttentes.length}</span>) demandes de congé en attentes </p>
            </Link>
                
                <div className="collapse" id="demandeAttenteCollapse">
                    <ul className="list-group"  style={{maxWidth: "800px", margin: "1rem auto"}}>
                            
                        {demandeEnAttentes.length > 0 ? demandeEnAttentes.map(function(attente){
                            return <li key={attente.Id} className="list-group-item d-flex justify-content-around">
                                  <span className="font-weight-bold">{attente.dateDebut}</span>
                                  <span className="font-weight-bold">{attente.dateFin}</span>
                                  <span className="font-weight-bold bg-success text-center rounded">{attente.status}</span>
                                  <span className="text-muted">{attente.commentaire}</span>
                                  <span className="text-muted">{attente.agent.nom}</span>
                                  <span className="text-muted">{attente.agent.prenom}</span>
                                  <span className="text-muted">{attente.agent.email}</span>
                                  <span className="text-muted  text-center">
                                    <button className="btn btn-outline-primary" id={attente.Id} onClick={handleAccept}>Accepter</button>
                                 </span>
                                  <span className="text-muted text-center">
                                    <button className="btn btn-outline-danger" id={attente.Id} onClick={handleRefuse}>Refuser</button>
                                 </span>
                            </li>
                        }):(
                            <li className="list-group-item alert alert-danger">
                                pas de demande de congé en attente 
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6 p-2">
                    <h4 className="font-weight-bold">Liste des demandes de congé acceptés</h4>
                    <table className="table table-bordered table-hover table-responsive">
                        <thead>
                            <tr>
                            <th>dateDebut</th>
                            <th>dateFin</th>
                            <th>status</th>
                            <th>commentaire</th>
                            <th>nom</th>
                            <th>prenom</th>
                            <th>email</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            { demandeAccepter.length > 0 ? (
                            demandeAccepter.map(function(demande){
                                return (
                                    <tr key={demande.Id}>
                                        <td>{demande.Id}</td>
                                        <td className="font-weight-bold">{demande.dateDebut}</td>
                                        <td>{demande.dateFin}</td>
                                        <td>{demande.status}</td>
                                        <td>{demande.commentaire}</td>
                                        <td className="text-primary">{demande.agent.nom}</td>
                                        <td className="text-primary">{demande.agent.prenom}</td>
                                        <td className="text-muted">{demande.agent.email}</td>
                                        <td>
                                        <button className="btn btn-primary"> Modifier
                                        </button>
                                        </td>
                                        
                                    </tr>
                                )
                            })           
                            
                            ): (<tr><td className="text-danger">La list est vide </td></tr>)}
                            </tbody>
                        </table>
                </div>
                <div className="col-sm-6 p-2">
                    <h4 className="font-weight-bold">Liste des demandes de congé refuser</h4>
                    <table className="table table-bordered table-hover table-responsive">
                        <thead>
                            <tr>
                            <th>dateDebut</th>
                            <th>dateFin</th>
                            <th>status</th>
                            <th>commentaire</th>
                            <th>nom</th>
                            <th>prenom</th>
                            <th>email</th>
                            <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            { demandeRefuser.length > 0 ? (
                            demandeRefuser.map(function(demande){
                                return (
                                    <tr key={demande.Id}>
                                        <td className="font-weight-bold">{demande.dateDebut}</td>
                                        <td>{demande.dateFin}</td>
                                        <td className="font-weight-bold"><span className="bg-danger p-1">{demande.status}</span></td>
                                        <td>{demande.commentaire}</td>
                                        <td className="font-weight-bold text-primary">{demande.agent.nom}</td>
                                        <td className="font-weight-bold text-primary">{demande.agent.prenom}</td>
                                        <td className="text-muted">{demande.agent.email}</td>
                                        <td>
                                        <button className="btn btn-primary"> Modifier </button>
                                    </td>
                                    
                                </tr>
                                )
                            })           
                            
                            ): (<tr><td className="text-danger">La list est vide </td></tr>)}
                            </tbody>
                        </table>
                </div>
                
            </div>
        </React.Fragment>
}

export default GrhComponent;