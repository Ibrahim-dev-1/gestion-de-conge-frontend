import React, { useEffect } from 'react';

const Agent = () => {

    const [agents, setAgent] = React.useState([]);
    const [errors, setErrors] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const requestBody = {
        query: `query{ agents{ Id }}`
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
            setLoading(false);
           return setAgent(data);
        } catch (error) {
            console.log(error)
            setLoading(false);
            return setErrors([error.message]);
        }
    }
    useEffect(function(){
        fetchData();
    }, [])

    return(
        <div className="container">
            {errors && errors.map(function(err){
                 return <p key={err.message} className="alert alert-danger">{err.message}</p>
                 })
            }
            <h3 className="text-center font-weight-bold">List des Agents </h3>
            {loading ? (<p>loading....</p>):(<div className="card border-top border-red">
                <div className="card-body">
                <table id="pagingTable" className="table table-bordered table-hover">
                <thead>
                <tr>
                  <th>Id</th>
                  <th>nom</th>
                  <th>Prenom</th>
                  <th>Sexe</th>
                <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                { agents.length > 0 ? (
                agents.map(function(agent){
                    return (
                        <tr key={agent.Id}>
                            <th>{agent.Id}</th>
                            <th>{agent.nom}</th>
                            <th>{agent.prenom}</th>
                            <th>{agent.sexe}</th>
                        </tr>
                    )
                })           
                  
                ): (<tr><td className="alert alert-danger">La list est vide </td></tr>)}
                </tbody>
                <tfoot>
                <tr>
                  <th>Rendering engine</th>
                  <th>Browser</th>
                  <th>Platform(s)</th>
                  <th>Engine version</th>
                  <th>CSS grade</th>
                </tr>
                </tfoot>
              </table>
                </div>
            </div>)}

        </div>
    )
}

export default Agent;