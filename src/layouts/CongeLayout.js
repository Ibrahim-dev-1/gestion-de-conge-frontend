import React from 'react';
import MainHeader from '../components/MainHeader';
import { createNotification } from '../myFonctions';
import Notification from 'react-notifications-component';
import NewConge from '../components/NewConge';

const CongeLayout = (props) => {

    React.useEffect(function(){
        console.log("recherche de tous les conges dans la base de donné");
    }, [])

    return <React.Fragment >
                <MainHeader />
                <Notification />
                <div className="container">
                    <h4 className="font-weight-bold mb-4 text-center">Tous mes conges </h4>
                    <div className="text-center border rounded p-3 mb-4">
                        <button data-toggle="collapse" data-target="#congeCollapse" className="btn btn-outline-success btn-lg">
                        <span style={{fontSize:"1.5rem"}}>+ </span>
                            Prendre un nouveau Congé
                        </button>
                    </div>
                    <div className="collapse" id="congeCollapse">
                        <NewConge createNotification={createNotification} />
                    </div>

                    <div className="row">
                        <div className="col-md-8">
                                Tableau de tous les congés qu'un utilisateur lamda à demander
                        </div>
                        <div className="col-md-4 ">
                            <div className="border rounded p-3">
                                <h4 className="font-weight-bold">
                                    Voulez-vous savoir comment sa fonctionne?
                                </h4>
                                <p className="text-muted">Faite tous vos demandes de congé à travers cette plateforme 
                                    et suivez la progression de l'état de vos congés</p>
                            </div>
                        </div>
                    </div>
                </div>

    </React.Fragment>
}

export default CongeLayout;