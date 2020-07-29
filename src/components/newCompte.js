import React from 'react';
import { createNotification } from '../myFonctions';

const NewCompte =  () => {
    const emailRef = React.createRef();
    const passwordRef = React.createRef();
    
    const handleSubmit = (ev) => {
        ev.preventDefault();
        const email = emailRef.current;
        const mdp = passwordRef.current;
        if(email === ''|| mdp === '')
            return console.log("vous devez remplire les champs avant d'envoyé les informations");
        
        fetch('/',{
            method: 'POST',
            body: JSON.stringify({query:`
            mutation{
                createCompte(input:{ email: "${email}" , password: "${mdp}"})
            }
            `}), 
            headers:{
                'Content-Type': 'Application/json'
            }
        }).then(function(reponse){
            return reponse.json();
        }).then(function(data){
            if(data.errors)
                throw data.errors;

            mdp = '';
            email = '';
            console.log(data.data);
            createNotification("Creation de compte", "success","Votre à été créé avec success...","top-right");
            return document.getElementById("closeKratosBtn").click();
        }).catch(function(errors){
            if(errors.length > 0){
                errors.map(function(err){
                    console.log(err.messge);
                    return createNotification("Erreur", "danger",err.message,"top-right");
                })
            }
        })
    }
    
    return (
        <div className="modal fade" id="newCompteCreate" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="kratosmodallabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title text-center font-weight-bold" id="kratosmodallabel">Création d'une Division</h4>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="nom">Votre adresse Email </label>
                            <input 
                                type="text" 
                                required 
                                className="form-control" 
                                ref={emailRef} 
                                placeholder="Entre votre email " 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nom">Votre mot de passe </label>
                            <input 
                                type="text" 
                                required 
                                className="form-control" 
                                ref={passwordRef} 
                                placeholder="Entrez votre mot de passe  " 
                            />
                        </div>
                    </form>
                    
                </div>
                <div className="modal-footer">
                    <button type="button" id="closeKratosBtn" className="btn btn-danger" data-dismiss="modal">Annulez</button>
                    <button 
                        type="submit" 
                        id="saveBtnDiv"
                        className="btn btn-outline-info" 
                        onClick={handleSubmit}
                    >Enrégistrez</button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default NewCompte;