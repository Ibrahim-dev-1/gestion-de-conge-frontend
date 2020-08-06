import React from 'react';
import GrhComponent from '../components/grhComponent';
import ChefDivisionComponent from '../components/chefDivisionComponent';

const GestionDemande = () => {
    return <div className="container">
            {
                sessionStorage.getItem("grade") === "CHEF DIVISION" ? 
                    <ChefDivisionComponent />: 
                    <GrhComponent />
            }
    </div>
}

export default GestionDemande;