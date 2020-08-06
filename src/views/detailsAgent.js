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
                        nom prenom sexe fonction situationMatrimoniale
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
                    <div className="col-md-6">
                        <div className="d-flex justify-content-around">
                            <div className="">
                                image d'une persone
                            </div>
                            <div className="p-2 d-flex border rounded bg-light flex-column">
                                <p className="text-primary">nom: {agent.nom}</p>
                                <p className="">prenom: {agent.prenom}</p>
                                <p className="">sexe: {agent.sexe}</p>
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