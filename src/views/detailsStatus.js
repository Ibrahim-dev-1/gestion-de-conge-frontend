import React, { useEffect } from 'react';
import '../loading.css';

const DetailsStatus = () => {

    const [status, setStatus] = React.useState([]);
    const [errors, setErrors] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const requestBody = {
        query: `query{ status{ Id grade createdAt updatedAt }}`
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
            console.log(data);
            setErrors([]);
            setTimeout(function(){ setLoading(false); },2000);
            return setStatus(data.status);
        } catch (error) {
            console.log(error)
            setLoading(false);
            return setErrors([error.message]);
        }
    }
    useEffect(function(){
        fetchData();
    },[]);

    const handleDelete = () => {
        console.log("click")
    }


    return(
        <div className="container">
            {errors && errors.map(function(err){
                 return <p key={err.message} className="alert alert-danger">{err.message}</p>
                 })
            }
            <h3 className="text-center font-weight-bold">List des Status </h3>
            {loading ? (<p style={{ margin:"0px auto"}} className="lds-dual-ring">loading....</p>):(
                <table id="pagingTable" className="table  table-bordered table-striped table-hover">
                <thead>
                <tr>
                  <th>Id</th>
                  <th className="font-weight-bold">grade</th>
                  <th className="font-weight-bold">createdAt</th>
                  <th className="font-weight-bold">updatedAt</th>
                </tr>
                </thead>
                <tbody> 
                { status.length > 0 ? (
                    status.map(function(status){
                    return (
                        <tr key={status.Id}>
                            <td>{status.Id}</td>
                            <td className="font-weight-bold">{status.grade}</td>
                            <td className="text-muted">{status.createdAt}</td>
                            <td className="text-muted">{status.updatedAt}</td>
                        </tr>
                    )
                })           
                  
                ): (<tr className="text-danger"><td>list vide </td></tr>)}
                </tbody>
              </table>
            )}

        </div>
    )
}

export default DetailsStatus;