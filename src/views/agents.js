import React, { useEffect } from 'react';
import '../loading.css';
import Notification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'; 
import {createNotification} from '../myFonctions';
import { Link } from 'react-router-dom';


const Agents = () => {

    const vagueRef = React.createRef();
    const [nomVague, setNomVague] = React.useState('null');
    const [vagues, setVague] = React.useState([]);
    const [agents, setAgent] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [disableBtn, setDisableBtn] = React.useState(false);
    const [agentChoises, setAgentChoise ] = React.useState([]);
    const requestBody = {
        query: `query{ agents{ 
            Id 
            nom 
            prenom 
            email
            sexe 
            fonction 
            situationMatrimoniale 

    }}`
    }

    // fetch all calendrier vague
    const fetchCalendrier = () => {
        return fetch('/',{
            method: 'POST',
            body:JSON.stringify({
                query: ` query{ calendriers{ Id dateDebut dateFin } }`
            }),
            headers: {
                'Content-Type': 'Application/json',
                'Authorization': 'Bearer '+ sessionStorage.getItem('token')
            }
        }).then(function(response){
            return response.json();
        }).then(function(data){
            if(data.errors)
                throw data.errors;
            return setVague(data.data.calendriers);
        }).catch(function(errors){
            if(errors.length > 0 ){
                return errors.map(function(err){
                    return createNotification("Recherche", "danger", err.message,"top-right" );
                })
            }
            return ;
        })
    }

    // delete button handler
    const handleDeteleClick = (ev) =>{
        fetch('/', {
            method: 'POST',
            body: JSON.stringify({
                query: `
                    mutation{ deleteAgent(id: "${ev.target.id}") }
                `
            }),
            headers: {
                'Content-Type': 'Application/json',
                'Authorization':'Bearer '+ sessionStorage.getItem("token")
            }
        }).then(function(response){
            return response.json();
        }).then(function(data){
            if(data.errors){
                throw data.errors;
            }
            return createNotification("Suppression", "success", "Suppression réuissit....", "top-right");
        }).catch(function(errs){
            console.log(errs);
            if(errs.length > 0 ){
                return errs.map(function(err){
                    return createNotification("Suppression", "danger", err.message,"top-right");
                })
            }
        })
    }

    // detail boutton handle
   

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch('/',{
                method: "post",
                body: JSON.stringify(requestBody),
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+sessionStorage.getItem("token")
                }
            })
            const data  = await response.json();
            if(data.errors){
                setLoading(false)
                throw data.errors;
            }
            setTimeout(function(){ setLoading(false); },2000);
           return setAgent(data.data.agents);
        } catch (errors) {
            setLoading(false);
            if(errors.length > 0){
                errors.map(function(err){
                    return createNotification("Listes Agents", "danger", err.message,"top-right");
                })
            }
        }
    }

    // handle check 
    const handleCheck = (ev) => {
        if(agentChoises.length > 0 && nomVague !== "null")
            setDisableBtn(!disableBtn);
            
        if(ev.target.checked){
            return setAgentChoise([...agentChoises, {name: ev.target.name, id: ev.target.id }]);
        }
        return setAgentChoise(agentChoises.filter(function(ag){
            return ag.id !== ev.target.id
        }))
    }

    // handle envoie des infomations de vague
    const handleEnvoyeVague = () => {
        if(agentChoises.length > 0 && nomVague !== "null"){
            return fetch('/',{
                method: 'POST',
                body:JSON.stringify({
                    query: ` mutation{ addAgents(calendrierId: "${vagueRef.current.value}" , agents: ${agentChoises} ) }`
                }),
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer '+ sessionStorage.getItem('token')
                }
            }).then(function(response){
                return response.json();
            }).then(function(data){
                if(data.errors)
                    throw data.errors;
                console.log(data.data);
                setAgentChoise([]);
                return createNotification("Ajout", "success", "Ajouts des agents au calendrier à été un success..","top-right" );
            }).catch(function(errors){
                if(errors.length > 0 ){
                    return errors.map(function(err){
                        return createNotification("Recherche", "danger", err.message,"top-left" );
                    })
                }
                return ;
            })
        }
        return console.log("on doit désactiver le boutton ")
    }

   
    useEffect(function(){
        fetchData();
        fetchCalendrier();
    },[])


    return(
       <React.Fragment>
            <div className="container">
            <Notification />
                <h3 className="text-center font-weight-bold">List des Agents </h3>
                {loading ? (<p style={{ margin:"0px auto"}} className="lds-dual-ring"></p>):(
                    <table id="pagingTable" className="table table-bordered table-hover">
                    <thead>
                    <tr>
                    <th></th>
                    <th>Id</th>
                    <th>nom</th>
                    <th>Prenom</th>
                    <th>email</th>
                    <th>Sexe</th>
                    <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    { agents.length > 0 ? (
                    agents.map(function(agent){
                        return (
                            <tr key={agent.Id}>
                                <td><input 
                                    style={{ margin: "0px auto"}}
                                    type="checkbox" id={agent.Id} 
                                    name={agent.nom + " " + agent.prenom} 
                                    onChange={handleCheck} /></td>
                                <td>{agent.Id}</td>
                                <td className="font-weight-bold">{agent.nom}</td>
                                <td>{agent.prenom}</td>
                                <td>{agent.email}</td>
                                <td>{agent.sexe}</td>
                                <td className="d-flex justify-content-around"> 
                                    <Link className="btn btn-outline-info btn-sm" to={"/dashboard/agentDetails/" + agent.Id }><i className="fa fa-eye mr-2"aria-hidden="true"></i>détails</Link>
                                    <button className="btn btn-outline-danger btn-sm">
                                        <i 
                                                onClick={handleDeteleClick}
                                                className="fa fa-trash mr-2"
                                                aria-hidden="true"
                                                id={agent.Id}
                                            ></i>
                                            Supprimer
                                    </button>
                                </td>
                            </tr>
                        )
                    })           
                    
                    ): (<tr><td className="alert alert-danger">La list est vide </td></tr>)}
                    </tbody>
                </table>
                )}
                <div className="p-3">
                    <div className="row">
                        <div className="col-md-4 ">
                            <h4 className="font-weight-bold text-center">Voulez-vous d'aide ? </h4>
                            <p className="text-muted p-2 bg-light border rounded">
                                Cochez les cases qui correspondent aux agents que vous voulez ajouter dans une vague de calendrier
                            </p>
                        </div>
                        <div className="col-md-4">
                            <h4 className="font-weight-bold text-center">Listes des agents sélèctionnés </h4>
                            <ul className="list-group">
                                {agentChoises.length > 0 ? agentChoises.map(ag =>
                                    <li key={ag.id} className="list-group-item text-info font-weight-bold">{ag.name}</li>
                                    ):(<li className="list-group-item text-danger">La listes est vide </li>)}
                            </ul>
                        </div>
                        <div className="col-md-4 ">
                            <div className="form-group">
                                <h4 className="font-weight-bold text-center">Listes des agents sélèctionnés </h4>
                                <select onChange={function(){return setNomVague(vagueRef.current.value)}} ref={vagueRef} className="custom-select my-1 mr-sm-2">
                                    <option value="pas valeur" className="form-group">Choisissez une vague</option>
                                    {vagues.length > 0 ? vagues.map(vague =>
                                        <option key={vague.Id} value={vague.Id} className="list-group-item font-weight-bold"> du {vague.dateDebut} au {vague.dateFin}</option>
                                        ):(<option value="pas valeur" className="text-danger">Aucune vague </option>)}
                                </select>
                                <h4 className="font-weight-bold">La vague numéro: <span className="text-success">{nomVague}</span></h4>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center border rounded p-3">
                        <button onClick={function(){ setAgentChoise([]); return fetchData(); }} className="btn btn-danger mr-2 btn-lg"> Annulez tous l'opération</button >
                        <button onClick={handleEnvoyeVague} className="btn btn-outline-success btn-lg">
                            Envoyé les agents dans la vague
                        </button >
                    </div >

                </div>
            </div>
       </React.Fragment>
    )
}

export default Agents;