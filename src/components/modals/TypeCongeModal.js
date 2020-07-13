import React from 'react'

const TypeCongeModal = (props) => {
    const nomRef = React.createRef();
    const nbrJrMaxRef = React.createRef();

    const [errors, setErrors ] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    

    const requestBody = function(nom,nbrJrMax){
        return {
            query: `
                mutation{
                    createTypeConge(input: { nom:"${nom}", nbrJrMax: ${nbrJrMax}}){Id}
                }
            `
        }
    }

    const handleClick = async (ev) => {
        try {
            ev.preventDefault();
            setLoading(true);
           if(!nomRef.current.value || !nbrJrMaxRef.current.value){
               return setErrors([{message: "le nom ou le nombre maximum su jour de type de congé ne doit pas etre vide"}]);
           }

           // fetch data
           const response = await fetch('http://localhost:8888/api',{
               method: 'post',
               body: JSON.stringify(requestBody(nomRef.current.value,nbrJrMaxRef.current.value)),
               headers:{
                   'Content-Type': 'Application/json'
               }
           });
           const data = await response.json();
           if(data.errors){
               setLoading(false)
               return setErrors(data.errors);
           }
           console.log(data)
           setErrors([])
           setLoading(false);
           return document.getElementById("closeBtnType").click();
        } catch (err) {
            setErrors([{message: err.message}])
            return console.log(err)
        }
    }


    return (
        <div className="modal fade" id="typeCongeModal" tabIndex="-1" role="dialog" aria-labelledby="kratosmodallabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title font-weight-bold" id="kratosmodallabel">Création d'un type de congé</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    {errors.length > 0 && (
                        errors.map(error => <p key={error.message} className="alert alert-danger">{error.message}</p>)
                    )}
                    <form>
                        <div className="form-group">
                            <label htmlFor="nom">Entrez le Nom du type de congé </label>
                            <input type="text" id="nom" required className="form-control" ref={nomRef} placeholder="Entrez le nom" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="number">Entrez le nombre maximum de jour </label>
                            <input type="number" required id="number"  placeholder="le nombre max du jour" className="form-control" ref={nbrJrMaxRef} />
                        </div>
                    </form>
                    
                </div>
                <div className="modal-footer">
                    <button type="button" id="closeBtnType" className="btn btn-danger" data-dismiss="modal">Fermé</button>
                    <button 
                        type="button" 
                        className="btn btn-outline-info" 
                        onClick={handleClick}
                    >Enrégistrez</button>
                </div>
                </div>
            </div>
        </div>
    )
}



export default TypeCongeModal;