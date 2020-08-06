import React, { useEffect }   from 'react';
import { useParams}   from 'react-router-dom';
import { createNotification } from '../myFonctions';

const DetailsAgent = (props) => {

    const paramsId = useParams();
    const [agent, setAgent] = React.useState({
        Id: '',
        nom: '',
        prenom: '',
        email: '',
        fonction: '',
        situationMatrimoniale: '',
        sexe: '',
        telephone: '',
        dateNaissance:'',
        dateEmbauche:'',
        status: '',
        calendrier: '',
        compte: '',
        division: '',
        autorisationAbsences: [],
        conges: [],
        createdAt: '',
        updatedAt: '',
    })
    
    useEffect(() => {
        // fetchDatas fonction to load all agents from databases
    const fetchDatas = async () => {
        try {
            const response = await fetch('/', {
                method: 'POST',
                body: JSON.stringify({
                    query: ` query{findAgent(id: "${paramsId.id}"){
                        nom prenom sexe fonction situationMatrimoniale email
                        dateNaissance dateEmbauche  telephone 
                        createdAt updatedAt
                    }}`
                }),
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer '+ sessionStorage.getItem("token")
                }
            })
            console.log(response);
            const data  = await response.json();
            if(data.errros)
                throw data.errors;
            
            return setAgent(data.data.findAgent);
        } catch (errors) {
            if(errors.length > 0){
                errors.map(function(err){
                    console.log(err.message);
                    return createNotification("Erreur", "danger", err.message, "top-left");
                })
            }
        }
    }

        fetchDatas();
    }, [paramsId]);

    return <div className="container">

                <h3 className="font-weight-bold text-center mb-4">tous les infos sur un agents </h3>
                <div className="row">
                    <div className="col-md-6 border rounded shadow">
                        <div className="row p-4">
                            <div className="col-md-4">
                                image d'une persone
                            </div>
                            <div className="col-md-8 p-2">
                                <p className="font-weight-bold text-info">informations sur la personnalité </p> 
                                <div className="d-flex justify-content-between">
                                    <h5 className="font-weight-bold">Nom: {agent.prenom}</h5> 
                                    <h5 className="font-weight-bold">Prenom: {agent.prenom}</h5>
                                </div>
                                <h5 className="text-muted "> <span className="font-weight-bold text-dark mr-4">Email:</span> {agent.email}</h5>
                                <h5 className=""> <span className="font-weight-bold mr-4">DateNaissance:</span> {agent.dateNaissance}</h5>
                                <h5 className=""> <span className="font-weight-bold mr-4">Situation Matrimoniale:</span> {agent.situationMatrimoniale}</h5>
                                <h5 className=""> <span className="font-weight-bold mr-4">Fonction:</span> {agent.fonction}</h5>
                                <h5 className=""> <span className="font-weight-bold mr-4">DateEmbauche:</span> {agent.dateEmbauche}</h5>
                                <hr/>  
                                <p className="font-weight-bold text-info">informations sur sa division </p> 
                                <h5 className=""> <span className="font-weight-bold mr-4">DateEmbauche:</span> {agent.dateEmbauche}</h5>
                                <hr/>  
                                <p className="font-weight-bold text-info">informations sur ses demandes de congés </p> 
                                <h5 className=""> <span className="font-weight-bold mr-4">DateEmbauche:</span> {agent.dateEmbauche}</h5>
                                <hr/>  
                                <p className="font-weight-bold text-info">informations sur son status dans l'entreprise </p> 
                                <h5 className=""> <span className="font-weight-bold mr-4">DateEmbauche:</span> {agent.dateEmbauche}</h5>
                                
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <ul className="list-group">
                           list items
                        </ul>
                    </div>
                </div>
            </div>
}

export default DetailsAgent;