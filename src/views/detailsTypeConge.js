import React, { useEffect } from 'react';
import '../loading.css';

const DetailsTypeConge = () => {

    const [typeConges, setTypeConge] = React.useState([]);
    const [errors, setErrors] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [currentType, setCurrent] = React.useState({Id: '', nom: '', nbrJrMax: ''});

    const requestBody = {
        query: `query{ typeConges{ Id nom nbrJrMax createdAt updatedAt }}`
    }

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:8888/api/',{
                method: "post",
                body: JSON.stringify(requestBody),
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            const { data } = await response.json();
            setErrors([]);
            setTimeout(function(){ setLoading(false); },2000);
            return setTypeConge(data.typeConges);
        } catch (error) {
            console.log(error)
            setLoading(false);
            return setErrors([error.message]);
        }
    }
    useEffect(function(){
        fetchData();
    },[]);

    const handleSubmit = async function(ev){
       try {
        ev.preventDefault();
        const result = await fetch("/",
        {
            method: "post",
            body: JSON.stringify({query: `mutation{
                updateTypeConge(id: "${currentType.Id}", input: { nom: "${currentType.nom}" , nbrJrMax: ${currentType.nbrJrMax}})
            }`}),
            headers: {'Content-Type': 'application/json'}
        }) 
        const data = await result.json();
        if(data.errors)
            return setErrors(data.errors);
        
        console.log(data.data.updateTypeConge);
        setErrors([]);

        document.querySelector("#updateBtn").click();
        return fetchData();
           
       } catch (error) {
           console.log(error);
           return setErrors(error);
       }
    }

    return(
        <div className="container">
            
            {errors && errors.map(function(err){
                return <p key={err.message} className="alert alert-danger">{err.message}</p>
                 })
            }
            <div id="typeCongeCollapse"  className="collapse mb-3">
                <div  className="container">
                <h3 className="text-center font-weight-bold">Metre à jour un type de congé</h3>

                <form onSubmit={handleSubmit} >
                    <div className="form-group">
                        <label htmlFor="nom">Entrez le Nom du type de congé </label>
                        <input 
                            type="text" 
                            required 
                            className="form-control" 
                            placeholder="Entrez le nom"
                            value={currentType.nom }
                            onChange = { function(ev){ return setCurrent({...currentType, nom: ev.target.value })}}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="number">Entrez le nombre maximum de jour </label>
                        <input 
                            type="number" 
                            required 
                            placeholder="le nombre max du jour" 
                            className="form-control" 
                            value={currentType.nbrJrMax }
                            onChange = { function(ev){ return setCurrent({...currentType, nbrJrMax: ev.target.value })}} 
                        />
                    </div>
                    <div className="form-group">
                    <button type="submit" className="btn btn-success"> <i className="add icon"></i> Mètre à jour</button>
                    </div>
                </form>
                </div>
            </div>

            <h3 className="text-center font-weight-bold">Listes des types de Congés </h3>
            {loading ? (<p style={{ margin:"0px auto"}} className="lds-dual-ring">loading....</p>):(<div className="card border-top border-success">
                <div className="card">
                <div className="card-body text-center">
                <table className="table table-responsive table-striped table-hover">
                <thead>
                <tr>
                    <th className="font-weight-bold">Id</th>
                    <th className="font-weight-bold">Nom</th>
                    <th className="font-weight-bold">Nbrs Jrs Max</th>
                    <th className="font-weight-bold">CreatedAt</th>
                    <th className="font-weight-bold">UpdatedAt</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                { typeConges.length > 0 ? (
                    typeConges.map(function(typeConge){
                    return (
                        <tr key={typeConge.Id}>
                            <td>{typeConge.Id}</td>
                            <td className="font-weight-bold">{typeConge.nom}</td>
                            <td>{typeConge.nbrJrMax}</td>
                            <td className="text-muted">{typeConge.createdAt}</td>
                            <td className="text-muted">{typeConge.updatedAt}</td>
                            <td className="d-flex justify-content-around">
                                <i 
                                   onClick={async function(){
                                        try{
                                            const result = await fetch("http://localhost:8888/api/",
                                            {
                                                method: "post",
                                                body: JSON.stringify({query: `mutation{deleteTypeConge(id: "${typeConge.Id}")}`}),
                                                headers: {'Content-Type': 'application/json'}
                                            }) 
                                            const data = await result.json();
                                            if(data.errors)
                                                return setErrors(data.errors);
                                            
                                            console.log(data.data.deleteTypeConge);
                                            return fetchData();
                                        }catch(err){
                                            console.log(err);
                                            return setErrors(err);
                                        }
                                    }} 
                                    className="fa fa-trash text-danger" style={{ fontSize: "1.3rem"}}></i>
                                <i 
                                    className="fa fa-google text-success"
                                    data-toggle="collapse"
                                    data-target="#typeCongeCollapse"
                                    id="updateBtn"
                                    onClick={function(){
                                        return setCurrent({Id: typeConge.Id , nom: typeConge.nom, nbrJrMax: typeConge.nbrJrMax});
                                    }}
                                >update</i>
                            </td>
                        </tr>
                    )
                })           
                  
                ): (<tr className="text-danger"><td>liste vide </td></tr>)}
                </tbody>
              </table>
                </div>
                </div>
            </div>)}

        </div>
    )
}

export default DetailsTypeConge;