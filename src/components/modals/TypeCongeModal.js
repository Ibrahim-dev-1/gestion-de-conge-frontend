import React from 'react'

const TypeCongeModal = (props) => {
    const nomRef = React.createRef();

    const [state, setState] = React.useState({nom: ""});
    const [error, setError ] = React.useState();
    
    const handleClick = () => {
        const nom = nomRef.current.value;
        
        console.log(nom);
    }

    return (
        <div className="modal fade" id="typeCongeModal" tabIndex="-1" role="dialog" aria-labelledby="kratosmodallabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title font-weight-bold" id="kratosmodallabel">Création d'une Division</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="nom">Entrez le Nom de la division </label>
                            <input type="text" className="form-control" ref={nomRef} placeholder="Entre le nom" />
                        </div>
                    </form>
                    
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-danger" data-dismiss="modal">Fermé</button>
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