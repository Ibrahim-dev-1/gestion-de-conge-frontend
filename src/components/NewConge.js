import React from 'react';

const NewConge = (props) => {

    const dateDebutRef = React.createRef();
    const dateFinRef = React.createRef();
    const commentaireRef = React.createRef();
    const typeCongeIdRef = React.createRef();

    const [typeConges, setTypesConges ] = React.useState([]);

    const fetchTypeConge = () => {
        return fetch('/',{
            method: 'POST',
            body:JSON.stringify({
                query: ` query{ typeConges{ Id nom } }`
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
            return setTypesConges(data.data.typeConges);
        }).catch(function(errors){
            if(errors.length > 0 ){
                return errors.map(function(err){
                    return props.createNotification("Recherche", "danger", err.message,"top-right" );
                })
            }
            return ;
        })
    }
    const handleSubmit  = (ev) => {
        ev.preventDefault();
            const dateDebut = dateDebutRef.current.value;
            const dateFin = dateFinRef.current.value;
            const commentaire = commentaireRef.current.value;
            const typeCongeId = typeCongeIdRef.current.value;
            console.log(sessionStorage.getItem("agentId"))
            return fetch('/',{
                method: 'POST',
                body:JSON.stringify({
                    query: `mutation{
                        createConge(input:{ dateDebut: "${dateDebut}" , dateFin: "${dateFin}", 
                        commentaire: "${commentaire}", typeCongeId: "${typeCongeId}"
                    }){ Id dateDebut }
                    }`
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
                return props.createNotification("Demande de congé", "success","Demande envoyé avec success...","top-right" );
            }).catch(function(errors){
                if(errors.length > 0 ){
                    return errors.map(function(err){
                        return props.createNotification("Erreur Demande de congé", "danger", err.message,"top-right" );
                    })
                }
                return ;
            })
    }

    React.useEffect(function(){
        fetchTypeConge();
    }, [])


    return <div className="border p-3 rounded bg-light">
        <h3 className="font-weight-bold text-center mb-2">Ajoutez un nouveau conge </h3>
        <form onSubmit={handleSubmit}>
           
            <div className="row">
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="debut">Date du Debut </label>
                        <input  required ref={dateDebutRef} id="debut" className="form-control" type="date" placeholder="Entrez la data du debut " />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="fin">Date de Fin</label>
                        <input required ref={dateFinRef}  id="fin" className="form-control" type="date" placeholder="Entrez la data de la fin" />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="typeConge">type de conge</label>
                        <select required ref={typeCongeIdRef} className="custom-select my-1 mr-sm-2" >
                            <option>Choisissez un type de conge</option>
                            {typeConges.length > 0 ? typeConges.map(function(type){
                                return <option value={type.Id} key={type.Id}>{type.nom}</option>
                            }):
                            (<option className="text-warning">Veuillez créer un type de congé</option>)}
                        </select>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="commentaire">Laissez un commentaire </label>
                <textarea ref={commentaireRef}  id="commentaire" className="form-control" type="textarea" placeholder="vos commentaires" />
            </div>
            <div className="d-flex justify-content-center">
                <button className="btn btn-danger">Annulez la demande </button>
                <input type="submit" className="btn btn-outline-success" value="Envoyé la demande de congé" />
            </div>
        </form>

    </div>
}


export default NewConge;