import React from 'react';
import Notification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import { createNotification } from '../myFonctions';
import './calendrier.css';

const Calendrier =  (props) => {
    
    const [myForm, setForm] = React.useState({id: '', dateDebut: '', dateFin: '' })
    const [loading, setLoading] = React.useState(false);
    const [datas, setDatas] = React.useState([]);
    const [modeUpdate, setMode] = React.useState(false);

    // fetch datas functions
    const fetchDatas = async () => {
        try {
            let queryBody = {
                query: ` query{calendriers{Id dateDebut dateFin createdAt updatedAt }}`
            }
            setLoading(true);
            const response = await fetch('/',{
                method: "post",
                body: JSON.stringify(queryBody),
                headers:{
                    'Content-Type': 'application/json'
                }
            })
           
            const  data  = await response.json();
            if(data.errors)
                throw data.errors;

            setTimeout(function(){
                setLoading(false);
                
            }, 3000);
            
            return setDatas(data.data.calendriers);
        }catch(errors){
            if(errors.length > 0){
                errors.map(function(err){
                    return createNotification("Erreur", "danger", err.message, "top-left");
                })
            }
        }
    } 

    // when components is loading
    React.useEffect(function() {
        fetchDatas();
    }, [])


    const handleSubmit = async (ev) => {
       try {
        ev.preventDefault();
        // fetch data from database
        if(myForm.dateDebut === '' || myForm.dateFin === '')
            throw new Error("Veuillez remplire tous les champs");

        const response = await fetch('/', {
            method: "POST",
            body: JSON.stringify({
                query: ` mutation{ createCalendrier(input: { dateDebut: "${myForm.dateDebut}" , dateFin:"${myForm.dateFin}" }){ Id dateDebut}}`
            }),
            headers:{
                'Content-Type': 'Application/json',
                'Authorization': 'Bearer '+ sessionStorage.getItem("token")
            }
        })
        const data = await response.json();
        if(data.errors){
            throw data.errors;
        }
        
        setForm({ dateDebut: '', dateFin:''  })
        createNotification("Création", "success", "Création réuissit!", "top-left");
        return fetchDatas();

       } catch (errors) {
            if(errors.length > 0){
                errors.map(function(err){
                    return createNotification("Erreur de Creation", "danger", err.message, "top-left");
                })
            }
       }
    }

    const handleUpdate = async (ev) => {
        try {
         ev.preventDefault();
         console.log("update ")
         // fetch data from database
         if(myForm.dateDebut === '' || myForm.dateFin === '' || myForm.id === '')
             return console.log("information vide");
        if(!modeUpdate)
            return console.log("vous n'est pas en mode update. Vous etes plutôt en mode enrégistrement des données");
        
 
         const response = await fetch('/', {
             method: "POST",
             body: JSON.stringify({
                 query: ` mutation{ updateCalendrier(id: "${myForm.id}", input: { dateDebut: "${myForm.dateDebut}" , dateFin:"${myForm.dateFin}" }){ Id dateDebut}}`
             }),
             headers:{
                 'Content-Type': 'Application/json',
                 'Authorization': 'Bearer '+ sessionStorage.getItem("token")
             }
         })
         const data = await response.json();
         if(data.errors){
             throw data.errors;
         }
 
         setForm({ dateDebut: '', dateFin:''  })
         createNotification("Mise à jour", "success", "Mise à jour réuissit!", "top-left");
         return fetchDatas();
 
        } catch (errors) {
             if(errors.length > 0){
                 errors.map(function(err){
                     return createNotification("Erreur de Mise à jour", "danger", err.message, "top-left");
                 })
             }
        }
     }

    return(
        <div className="row p-3">
             <Notification />
            <div className="col-md-8">
            {loading ? (<div style={{ margin:"0px auto"}} className="lds-dual-ring"></div>):(
                <div>
                    <h4 className="font-weight-bold mb-3">Listes des calendriers </h4>    
                    <table className="table  table-bordered table-responsive table-hover">
                    <thead>                  
                        <tr>
                        <th className="font-weight-bold"># ID</th>
                        <th className="font-weight-bold">DateDebut</th>
                        <th className="font-weight-bold">DateFin</th>
                        <th className="font-weight-bold">Date creation</th>
                        <th className="font-weight-bold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    { datas.length > 0 ? (
                        datas.map(function(cal){
                            return (
                                <tr 
                                    key={cal.Id}
                                    onClick={function(ev){
                                        const db = new Date(cal.dateDebut).toISOString().replace(/T.+/, '');
                                        const df = new Date(cal.dateFin).toISOString().replace(/T.+/, '');
                                        setForm({
                                            id:cal.Id,
                                            dateDebut: db,
                                            dateFin: df
                                        })
                                    }}
                                >
                                    <td>{cal.Id}</td>
                                    <td>{cal.dateDebut}</td>
                                    <td>{cal.dateFin}</td>
                                    <td className="text-muted">{cal.createdAt}</td>
                                    <td>
                                        <button 
                                            className="btn btn-danger btn-sm"
                                            onClick={async function(){
                                                try {
                                                    const result = await fetch("/",{
                                                        method: "post",
                                                        body: JSON.stringify({query: `mutation { deleteCalendrier(id: "${cal.Id}")}`}),
                                                        headers: {'Content-Type': 'application/json'}
                                                }) 
                                                const data = await result.json();
                                                if(data.errors)
                                                    throw data.errors;
                                                
                                                return fetchDatas();
                                                } catch (errors) {
                                                if(errors.length > 0){
                                                    return errors.map(function(err){
                                                            createNotification("Erreur de suppression", 'danger', err.message, 'top-left')
                                                    })
                                                }
                                                }
                                            }}  
                                        >

                                            <i className="fa fa-trash text-light mr-2"></i>
                                            supprimer
                                        </button>
                                    </td>
                            </tr>
                        )
                    })           
                    
                    ): (<tr><td rowSpan="4"  className="alert alert-danger">La list est vide </td></tr>)}
                    </tbody>
                    </table>
                </div>    
            )}
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
                                <input 
                                    className="form-control" 
                                    id="dateDebut" 
                                    type="date" 
                                    placeholder="Date du début" 
                                    required 
                                    value={myForm.dateDebut}
                                    onChange={function(ev){console.log(ev.target.value); return setForm({...myForm,dateDebut:  ev.target.value})}}
                                    />
                            </div>
                            <div className="form-group">
                                <label htmlFor="dateFin">Entrez le date de fin</label>
                                <input 
                                    className="form-control"  
                                    id="dateFin" 
                                    type="date" 
                                    placeholder="Date de Fin" 
                                    required
                                    value={myForm.dateFin}
                                    onChange={function(ev){ console.log(ev.target.value); return setForm({...myForm,dateFin: ev.target.value})}}
                                />
                            </div>

                            <div className="d-flex justify-content-around">
                                <label className="switch">
                                    <input type="checkbox" onChange={function(ev){
                                        console.log(ev.target.value);
                                        setMode(ev.target.checked);
                                    }} />
                                    <div className="slider"></div>
                                </label>
                               <span className="text-primary">Switchez pour mise à jour </span>
                            </div>
                            <div className="form-group">
                                {modeUpdate ? 
                                    <button type="submit" onClick={handleUpdate} className="btn btn-outline-primary">Mètre à jour</button>
                                    : 
                                    <button type="submit" onClick={handleSubmit} className="btn btn-success">Enrégistrez</button>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calendrier;