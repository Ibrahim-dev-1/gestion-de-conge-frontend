import React from 'react';
import { Link } from 'react-router-dom';
import { createNotification } from '../myFonctions';
import Notification from 'react-notifications-component';

const ChefDivisionComponent = () => {
    const [demandeConges , setDemandeConge ] = React.useState([]);
    const [demandeEnAttentes , setDemandeEnAttentes ] = React.useState([]);
    const [demandeRefuser , setDemandeRefuser ] = React.useState([]);

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
               
            })
        }
        return console.log("la demande de congé est vide ")
    }

    const fetchDemandeFromAgentsInDivision = () =>{
        fetch('/', {
            method:'POST',
            body: JSON.stringify({
                query: `query{
                    findDemandeForEachAgentByDivision{
                    dateDebut Id dateFin commentaire status createdAt agent{ nom prenom email telephone }
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
            setDemandeConge(data.data.findDemandeForEachAgentByDivision);
            return getDemandeStatus(data.data.findDemandeForEachAgentByDivision);
        })
        .catch(function(errs){ 
            if(errs.length >0 ){
                return errs.map(function(err){
                    return createNotification("Erreur ", "danger", err.message, "top-right")
                })
            }
        })
    }
    React.useEffect(() => {
        fetchDemandeFromAgentsInDivision();
    },[]);

    const handleAccept = (ev) => {
        return fetch('/', {
            method: 'POST',
            body: JSON.stringify({ query: ` mutation{ 
                setStatus(id: "${ev.target.id}", name: "Accepter" ) 
                setChefAuthorization(id: "${ev.target.id}" , authorized: true )}`}) ,
            headers: {
                'Content-Type': 'Application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
            }
        }).then(function(response){
            return response.json();
        }).then(function(data){
            if(data.errors)
                throw data.errors;
            fetchDemandeFromAgentsInDivision()
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
                setChefAuthorization(id: "${ev.target.id}" , authorized: false )}`}) ,
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
            
           
            fetchDemandeFromAgentsInDivision();
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
            <Notification />
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
            
                <div className="p-3">
                    <h4 className="font-weight-bold text-center">Liste des demandes de congé refuser</h4>
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                            <th>dateDebut</th>
                            <th>dateFin</th>
                            <th>status</th>
                            <th>commentaire</th>
                            <th>nom</th>
                            <th>prenom</th>
                            <th>email</th>
                            <th>telephone</th>
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
                                        <td className="font-weight-bold text-info">{demande.agent.nom}</td>
                                        <td className="font-weight-bold text-info">{demande.agent.prenom}</td>
                                        <td className="text-muted">{demande.agent.email}</td>
                                        <td className="text-success">{demande.agent.telephone}</td>
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
                
        </React.Fragment>
}

export default ChefDivisionComponent;