import { useLocations } from "@/hooks/locations"
import { useEffect, useState } from "react"
import axios from '@/lib/axios'


const FormRecord = ({record, setRecord, handleForm, action, errors, handleErrors}) => {
    const {regiones} = useLocations()
    const [listComuna, setListComuna] = useState([])
    const [locationSelected, setLocationSelected] = useState({
        region_id:'',
        comuna_id:''
    }) 
    useEffect(()=>{
        if(record.comuna_id !== locationSelected.comuna_id){
            console.log('pasando con el use effect')
            setLocationSelected({
                comuna_id:record.comuna_id,
                region_id:record.comuna?.provincia.region.id
            })
        }
    },[record.comuna_id])

    useEffect(() => {
        console.log('pasando por el fetcher de comunas')
        fetcher(record.comuna?.provincia.region.id)
    },[record.comuna_id])

    const handleSelectRegion = (e) => {
        fetcher(e.target.value)
        setLocationSelected({
            ...locationSelected,
            [e.target.name]:e.target.value
        })
        setRecord({
            ...record,
            [e.target.name]:e.target.value
        })
    }
    const handleSelectComuna = (e) => {
        setLocationSelected({
            ...locationSelected,
            [e.target.name]:e.target.value
        })
        setRecord({
            ...record,
            [e.target.name]:e.target.value
        })
    }

    const fetcher = (id) => {
        axios.get(`/api/comunas-region/${id}`)
            .then(res => {
                setListComuna(res.data)
            })
            .catch(err => {
                console.log('error select region', err)
            })
    }
    
    return (
        <>
        {

        record ?
            <form onSubmit={action}>
                <div className="pb-5">
                    <label htmlFor="" >Nombre:</label>
                    <input className="dark:bg-gray-600 w-full rounded" type="text" name="name" value={record?.name} onChange={handleForm} onFocus={()=>{handleErrors({})}}/>
                    <small className="text-red-500">{errors.name}</small>
                </div>
                <div className="pb-5">
                    <label htmlFor="" >Rut:</label>
                    <input className="dark:bg-gray-600 w-full rounded" type="text" name="rut" value={record?.rut} onChange={handleForm} onFocus={()=>{handleErrors({})}}/>
                    <small className="text-red-500">{errors.rut}</small>
                </div>
                <div className="pb-5">
                    <label htmlFor="" >Email:</label>
                    <input className="dark:bg-gray-600 w-full rounded" type="text" name="email" value={record?.email} onChange={handleForm} onFocus={()=>{handleErrors({})}}/>
                    <small className="text-red-500">{errors.email}</small>
                </div>
                <div className="pb-5">
                    <label htmlFor="" >Telefono:</label>
                    <input className="dark:bg-gray-600 w-full rounded" type="text" name="phone" value={record?.phone} onChange={handleForm} onFocus={()=>{handleErrors({})}}/>
                    <small className="text-red-500">{errors.phone}</small>
                </div>
                <div className="pb-5">
                    <label htmlFor="" >Fecha de nacimiento:</label>
                    <input className="dark:bg-gray-600 w-full rounded relative" type="date" name="date_birth" value={record?.date_birth} onChange={handleForm} onFocus={()=>{handleErrors({})}}/>
                    <small className="text-red-500">{errors.date_birth}</small>
                </div>
                <div className="pb-5">
                    <label htmlFor="">Región:</label>
                    <select name="region_id" value={locationSelected.region_id} className="dark:bg-gray-600 w-full rounded" onChange={handleSelectRegion}>
                        <option disabled={true} value="">Selecciona una región</option>
                        {
                            regiones && regiones.map((region, i) => (
                                <option key={i} value={region.id}>{region.region}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="pb-5">
                    <label htmlFor="">Comuna:</label>
                    <select name="comuna_id" value={locationSelected.comuna_id} id="" className="dark:bg-gray-600 w-full rounded" 
                    onChange={handleSelectComuna}>
                        {/*<option value="">opcion</option>*/}
                        <option disabled={true} value="">Selecciona una comuna</option>
                        {
                            listComuna && listComuna.map((comuna, i) => (
                            <option key={i} value={comuna.id} >{comuna.comuna}</option>
                            ))
                        }
                    </select>
                    <small className="text-red-500">{errors.comuna_id}</small>
                </div>
                <button type="submit" className="py-2 px-4 rounded my-5 bg-amber-600">Guardar</button>
            </form>
            : ''}
        </>
    )
}

export default FormRecord