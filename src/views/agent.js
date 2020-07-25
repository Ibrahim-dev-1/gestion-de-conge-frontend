import React, { useEffect } from 'react';

const Agent = () => {

    const [loading, setLoading] = React.useState(false);
    const [errors, setErrors] = React.useState([]);
    const [radioHomme, setHomme] = React.useState(true);
    const [radioFemme, setFemme] = React.useState(false);
    const [divisions, setDivision] = React.useState([]);
    const [status, setStatus] = React.useState([]);
    const [agent, setAgent] = React.useState({
        nom:'',
        prenom: '',
        email: '',
        fonction:'',
        cituationMatrimoniale:'',
        sexe:'Homme',
        telephone: '',
        dateNaissance:'',
        dateAmbauche: '',
        statusId:'',
        divisionId:''
    });

    // handle submit function
    const handleSubmit = (ev) => {
        ev.preventDefault();
        return fetch('/', {
            method: 'POST',
            body: JSON.stringify({
                query: `
                    mutation{
                        createAgent(input:{
                            nom: ${agent.nom}
                            prenom: ${agent.prenom}
                            email: ${agent.email}
                            fonction: ${agent.fonction}
                            situationMatrimoniale: ${agent.cituationMatrimoniale}
                            sexe: ${agent.sexe}
                            telephone: ${agent.telephone}
                            dataNaissance: ${agent.dateNaissance}
                            dataNaissance: ${agent.dateAmbauche}
                            statusId: ${agent.statusId}
                            divisionId: ${agent.divisionId}
                        }){
                            Id nom
                        }
                    }
                `
            })
        }).then(function(response){
            return response.json();
        }).then(function(data){
            if(data.errors){
                setLoading(false);
                return setErrors(data.errors);
            }
            setErrors([]);
            return console.log("Enrégistrement réuissit");
        }).catch(function(err){
            console.log(err);
            return setErrors([err.message]);
        })
    }
    // when component did mount 
    useEffect(function(){
        fetchDatasDivision();
        fetchDatasStatus();
    }, []);

    
    // fetch divisions datas from databse
        const fetchDatasDivision = async () => {
            try {
                setLoading(true);
                const response = await fetch("/", {
                    method: 'POST',
                    body: JSON.stringify({
                      query:`query{ divisions{ Id nom } }`  
                    }),
                    headers: { 'Content-Type': 'application/json',
                    'Authorization':'Bearer '
                }
                })
                const data = await response.json();
                if(data.errors){console.log(data.errors); setDivision([]); setLoading(false); return setErrors(data.errors)}
                setDivision(data.data.divisions);
                setTimeout(function(){ return setLoading(false)}, 2000);
            } catch (error) {
                setDivision([]);
                setLoading(false);
                console.log(error);
                return setErrors([error.message]);
            }
        }
        
        // fetch status datas from database;
            const fetchDatasStatus = async () => {
                try {
                    setLoading(true);
                    const response = await fetch("/", {
                        method: 'POST',
                        body: JSON.stringify({
                          query:`query{ status{ Id grade } }`  
                        }),
                        headers: { 'Content-Type': 'application/json',
                        'Authorization':'Bearer '
                    }
                    })
                    const data = await response.json();
                    if(data.errors){console.log(data.errors); setStatus([]) ; setLoading(false); return setErrors(data.errors)}
                    setStatus(data.data.status);
                    setTimeout(function(){ return setLoading(false)}, 2000);
                } catch (error) {
                    setLoading(false);
                    setStatus([])
                    console.log(error);
                    return setErrors([error.message]);
                }
            }


    return <div className="container">
            <h4 className="text-center font-weight-bold">Enrégistrement d'un Agent </h4>
    
    <div className="card border-top border-primary">
        <div className="card-body">
            <form onSubmit={ handleSubmit }>
                <div className="form-row">
                        <div className="col-md-3">
                            <div className="form-group">
                                <label htmlFor="nom">Le Nom</label>
                                <input 
                                    type="text" 
                                    id="nom"
                                    className="form-control" 
                                    placeholder="Entrez le nom"
                                    value={agent.nom}
                                    onChange={function(ev){ return setAgent({...agent,nom: ev.target.value})}} 
                                    required 
                                    />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="prenom">Le Prénom(s)</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="prenom" 
                                    value={agent.prenom}
                                    onChange={function(ev){ return setAgent({...agent,prenom: ev.target.value})}} 
                                    placeholder="Entrez le prenom(s)" 
                                    required 
                                    />
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="form-group">
                                <label htmlFor="email">L' Email</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text text-success font-weight-bold" id="inputGroupPrepend">@</span>
                                    </div>
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        id="email" 
                                        value={agent.email}
                                        onChange={function(ev){ console.log(agent); return setAgent({...agent,email: ev.target.value})}} 
                                        placeholder="Entrez l' Email" 
                                        required 
                                    />
                                </div>
                                
                            </div>
                        </div>
                </div>
                <div className="form-group">
                    <label htmlFor="fonction">La Fonction</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={agent.fonction}
                        onChange={function(ev){ return setAgent({...agent,fonction: ev.target.value})}} 
                        id="fonction" placeholder="La fonction" 
                        required 
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="cituation">Cituation Matrimoniale</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="cituation" placeholder="La cituation matrimoniale" 
                        value={agent.cituationMatrimoniale}
                        onChange={function(ev){ return setAgent({...agent,cituationMatrimoniale: ev.target.value})}} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label className="mr-3">Le Sexe: </label>
                    <div className="custom-control custom-radio custom-control-inline">
                        <input 
                            type="radio" 
                            id="femme" 
                            className="custom-control-input"
                            checked={radioFemme}
                            onClick={function(ev){
                                setHomme(!radioHomme)
                                setFemme(!radioFemme)
                                console.log("femme:",radioFemme);
                                if(!radioFemme){
                                    return setAgent({...agent, sexe: 'Femme'});
                                }
                                return setAgent({...agent,sexe: "Homme"})
                            }}
                            />
                        <label className="custom-control-label" htmlFor="femme">Femme</label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                        <input 
                            type="radio" 
                            id="homme" 
                            name="radionHomme" 
                            className="custom-control-input"
                            checked={radioHomme}
                            onClick={function(){
                                setHomme(!radioHomme)
                                setFemme(!radioFemme)
                                if(!radioHomme){
                                    return setAgent({...agent, sexe: 'Homme'});
                                }
                                return setAgent({...agent,sexe: "Femme"})
                            }}
                        />
                        <label className="custom-control-label" htmlFor="homme">Homme</label>
                    </div>
                </div>
                <div className="form-row">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="phone">Télephone</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="text-primary fas fa-phone-alt"></i></span>
                                    </div>
                                    <input 
                                        id="phone"
                                        type="tel" 
                                        value={agent.telephone}
                                        onChange={function(ev){ return setAgent({...agent,telephone: ev.target.value})}}
                                        required={true}
                                        className="form-control" 
                                        pattern="[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}"
                                        placeholder="__-__-__-__"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="naissance">Date de naissance </label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="text-success fa fa-calendar-alt"></i></span>
                                    </div>
                                    <input 
                                        id="naissance"
                                        type="date" 
                                        required
                                        className="form-control" 
                                        value={agent.dateNaissance}
                                        onChange={function(ev){ return setAgent({...agent,dateNaissance: ev.target.value})}}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="prenom">Date d'embauche </label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="text-danger fa fa-calendar-alt"></i></span>
                                    </div>
                                    <input 
                                        id="embauche"
                                        type="date" 
                                        required
                                        className="form-control" 
                                        value={agent.dateAmbauche}
                                        onChange={function(ev){ return setAgent({...agent,dateAmbauche: ev.target.value})}}
                                        />
                                </div>
                            </div>
                        </div>
                </div>
                <div className="form-row">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="status">Status</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="text-success far fa-user"></i></span>
                                    </div>
                                    <select 
                                        value={agent.statusId}
                                        onChange={function(ev){ return setAgent({...agent,statusId: ev.target.value})}}
                                        required
                                        name="status"   
                                        className="custom-select"
                                        id="statusSelect">
                                        <option className="font-weight-bold">Choisir Status</option>
                                        {status.length > 0 ? status.map(function(sts){
                                            return <option value={sts.Id} key={sts.Id}>{sts.grade}</option>
                                        }):
                                        (<option className="text-warning">Veuillez initialiser les status</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="division">Division</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="text-info fas fa-door-closed"></i></span>
                                    </div>
                                    <select 
                                        value={agent.divisionId}
                                        onChange={function(ev){ return setAgent({...agent,divisionId: ev.target.value})}}
                                        name="division" 
                                        className="custom-select" 
                                        id="divisionSelect"
                                        required
                                        >
                                        <option className="font-weight-bold">Choisir division</option>
                                        {divisions.length > 0 ? divisions.map(function(div){
                                            return <option value={div.Id} key={div.Id}>{div.nom}</option>
                                        }):
                                        (<option className="text-warning">Veuillez créer une division</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>
                </div>
                <div className="form-group d-flex justify-content-end"> 
                    <button type="button" className="btn btn-danger mr-3">Annulez</button>
                    <button type="submit" className="btn btn-outline-success">Enrégistrez</button>
                </div>

            </form>
            
        </div>
    </div>
    </div>
}


export default Agent ;