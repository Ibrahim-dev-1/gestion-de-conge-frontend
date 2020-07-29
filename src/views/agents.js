import React, { useEffect } from 'react';
import '../loading.css';
import Notification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'; 
import {createNotification} from '../myFonctions';
import DetailsAgent from './detailsAgent';
import { Link } from 'react-router-dom';


const Agents = () => {

    const [agents, setAgent] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

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
    useEffect(function(){
        fetchData();
    },[ Agents])

    return(
       <React.Fragment>
            <div className="container">
            <Notification />
                <h3 className="text-center font-weight-bold">List des Agents </h3>
                {loading ? (<p style={{ margin:"0px auto"}} className="lds-dual-ring"></p>):(
                    <table id="pagingTable" className="table table-bordered table-hover">
                    <thead>
                    <tr>
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
                                <td>{agent.Id}</td>
                                <td className="font-weight-bold">{agent.nom}</td>
                                <td>{agent.prenom}</td>
                                <td>{agent.email}</td>
                                <td>{agent.sexe}</td>
                                <td className="d-flex justify-content-around"> 
                                <Link className="fa fa-eye nav-link" to={"/dashboard/agentDetails/" + agent.Id } />
                                    {/* <i className="fa fa-eye"aria-hidden="true"></i> */}
                                <i 
                                        onClick={handleDeteleClick}
                                        className="text-danger fa fa-trash"
                                        aria-hidden="true"
                                        id={agent.Id}
                                    ></i>
                                </td>
                            </tr>
                        )
                    })           
                    
                    ): (<tr><td className="alert alert-danger">La list est vide </td></tr>)}
                    </tbody>
                    <tfoot>
                        paginnation
                    </tfoot>
                </table>
                )}

            </div>
       </React.Fragment>
    )
}

export default Agents;