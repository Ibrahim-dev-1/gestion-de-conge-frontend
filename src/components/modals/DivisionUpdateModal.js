import React from 'react'

const DivisionUpdateModal = (props) => {
    const [errors, setErrors] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState(props.division);

    const requestBody = (arg)=> {
        return {
            query: `
                mutation{
                    updateDivision(nom: "${arg}"){
                        Id nom createdAt updatedAt
                    }
                }
            `
        }
    }

    const handleClick = async (ev) => {
        try {
            ev.preventDefault();
            setLoading(true);
           if(data.nom){
               console.log("le nom est undefined");
               return setErrors([{message: "le nom ne doit pas etre vide"}]);
           }

           // fetch data
           const response = await fetch('http://localhost:8888/api',{
               method: 'post',
               body: JSON.stringify(requestBody(data.nom)),
               headers:{
                   'Content-Type': 'Application/json'
               }
           });
           const data = await response.json();
           if(data.errors){
               setLoading(false)
               return setErrors(data.errors);
           }

           setErrors([])
           setLoading(false);
           console.log(loading);
           return document.getElementById("closeBtnDiv").click();
        } catch (err) {
            setErrors({message: err.message})
            return console.log(err)
        }
    }

    return (
        <div className="modal fade" id="divisionUpdateModal" tabIndex="-1" role="dialog" aria-labelledby="kratosmodallabel" aria-hidden="true">
            {console.log(props.division)}
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title text-center font-weight-bold" id="kratosmodallabel">Création d'une Division</h4>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    {errors.length > 0 && (
                        errors.map(error => <p key={error.message} className="alert alert-danger">{error.message}</p>)
                    )}
                    <form onSubmit={handleClick}>
                        <div className="form-group">
                            <label htmlFor="nom">Entrez le Nom de la division </label>
                            <input 
                                id="nom" 
                                type="text" 
                                required 
                                value={data.nom}
                                onChange={function(ev){ console.log(data); return setData({...data, nom: ev.target.value })}}
                                className="form-control" 
                                placeholder="Entre le nom" />
                        </div>
                    </form>
                    
                </div>
                <div className="modal-footer">
                    <button type="button" id="closeBtnDiv" className="btn btn-danger" data-dismiss="modal">Fermé</button>
                    <button 
                        type="button" 
                        id="saveBtnDiv"
                        className="btn btn-outline-info" 
                        onClick={handleClick}
                    >Enrégistrez</button>
                </div>
                </div>
            </div>
        </div>
    )
}



export default DivisionUpdateModal;