import React from 'react';

const Calendrier =  (props) => {
    return(
        <div className="row p-3">
            <div className="col-md-8">
                list des calendrier
            </div>
            <div className="col-md-4">
                <div className="card card-outline card-primary">
                    <div className="card-header">
                        <h3 className="text-center">Enrégistrement des vagues</h3>
                    </div>
                    <div className="card-header">
                        <form>
                            <div className="form-group">
                                <label htmlFor="dateDebut">Entrez le date du début</label>
                                <input  className="form-control" id="dateDebut" type="date" placeholder="Date du début" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="dateFin">Entrez le date de fin</label>
                                <input className="form-control" id="dateFin" type="date" placeholder="Date de Fin" required />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-success" >Enrégistrer</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calendrier;