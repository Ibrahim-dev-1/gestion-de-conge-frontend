import React, { useEffect } from 'react';
import '../loading.css';

const DetailsDivision = () => {

    const [divisions, setDivision] = React.useState([]);
    const [currentDivision, setCurrent] = React.useState({Id: '', nom: ''})
    const [activeInput, setActiveInput] = React.useState(true);
    const [errors, setErrors] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const requestBody = {
        query: `query{ divisions{ Id nom createdAt updatedAt }}`
    }
    const handleSubmit = async () =>{
        try {
            const response = await fetch('http://localhost:8888/api/',{
                method: "post",
                body: JSON.stringify({query:`mutation{updateDivision(id:"${currentDivision.Id}",input:{nom:"${currentDivision.nom}"})}`}),
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            const  data  = await response.json();
            if(data.errors){
                setErrors(data.errors);
                return setLoading(false);
            }
            setErrors([]);
            
            console.log(data.updateDivision)
            return fetchData();
        } catch (error) {
            console.log(error)
            setLoading(false);
            return setErrors([error.message]);
        }
    }
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch('/',{
                method: "post",
                body: JSON.stringify(requestBody),
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            const { data } = await response.json();
            setErrors([]);
            setTimeout(function(){ setLoading(false); },2000);
            return setDivision(data.divisions);
        } catch (error) {
            console.log(error)
            setLoading(false);
            return setErrors([error.message]);
        }
    }
    useEffect(function(){
        fetchData();
    },[]);

    return(
        <div className="row">
        <div className="col-lg-9 p-2">
        {errors && errors.map(function(err){
                return <p key={err.message} className="alert alert-danger">{err.message}</p>
            })
        }
            <h3 className="text-center font-weight-bold">List des divisions </h3>
            {loading ? (<p style={{ margin:"0px auto"}} className="lds-dual-ring">loading....</p>):(
                <div className="card">
                <div className="card-body p-none m-auto text-center">
                <table id="pagingTable" className="table table-responsive table-bordered table-striped table-hover">
                <thead> 
                <tr>
                  <th className="font-weight-bold">Id</th>
                  <th className="font-weight-bold">nom</th>
                  <th className="font-weight-bold">createdAt</th>
                  <th className="font-weight-bold">updatedAt</th>
                <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                { divisions.length > 0 ? (
                    divisions.map(function(division){
                        return (
                            <tr key={division.Id}>
                            <td>{division.Id}</td>
                            <td className="font-weight-bold">{division.nom}</td>
                            <td className="text-muted">{division.createdAt}</td>
                            <td className="text-muted">{division.updatedAt}</td>
                            <td className="d-flex justify-content-around">
                                <i 
                                    onClick={async function(){
                                        try{
                                            const result = await fetch("http://localhost:8888/api/",
                                            {
                                                method: "post",
                                                body: JSON.stringify({query: `mutation{deleteDivision(id: "${division.Id}")}`}),
                                                headers: {'Content-Type': 'application/json'}
                                            }) 
                                            const data = await result.json();
                                            if(data.errors)
                                            return setErrors(data.errors);
                                            
                                            console.log(data.data.deleteDivision);
                                            return fetchData();
                                        }catch(err){
                                            console.log(err);
                                            return setErrors(err);
                                        }
                                    }} 
                                    className="fa fa-trash text-danger"
                                    ></i>
                                <i  
                                    onClick={function(){ setActiveInput(false) ; return setCurrent(division) }}
                                    className="fa fa-google"
                                    >update</i>
                            </td>
                        </tr>
                    )
                })           
                  
                ): (<tr className="text-danger"><td rowSpan="3"> list vide </td></tr>)}
                </tbody>
              </table>
            </div>
            </div>
            )}

        </div>
        <div className="col-lg-3 p-2 border-left">
        <h3 className="font-weight-bold mb-2">Metre à jour une division </h3>
            <form >
                <div className="form-group">
                    <label htmlFor="nom">Nouveau nom </label>
                    <input 
                        id="inputNomUpdate" 
                        disabled={activeInput}
                        type="text" 
                        required 
                        value={currentDivision.nom}
                        onChange={function(ev){ console.log(ev.target.value); return setCurrent({...currentDivision,nom: ev.target.value})}}
                        className="form-control" 
                        placeholder="Entre le nom" />
                </div>
                <div className="form-group">
                    <button  type="submit" onClick={handleSubmit} className="btn btn-success">
                       Update 
                    </button>
                    
                </div>
            </form>
        </div>
        </div>
    )
}

export default DetailsDivision;