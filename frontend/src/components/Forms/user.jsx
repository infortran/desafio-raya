import {useLocations} from '@/hooks/locations'
import { useEffect, useState } from 'react'

const FormUser = ({user, setUser, handleForm, action, errors, handleErrors}) => {

    const {regiones} = useLocations()
    const [role, setRole] = useState(user.role === 'admin')

    

    const handleRole = (e) => {
        setRole( e.target.checked )
        setUser({
            ...user,
            ['role']:e.target.checked ? 'admin' : 'user'
        })
        //console.log('handle role', e.target.value)
    }

    /*const handleSelectRegion = (e) => {
        console.log('el target del select', e.target.value)
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }*/

    

    return (
        <form onSubmit={action}>
            <div className="pb-5">
                <label htmlFor="">Nombre:</label>
                <div className="flex items-center justify-between">
                    <input name="name" className="block w-3/4 rounded dark:bg-gray-600" type="text" 
                        value={user.name} 
                        onChange={handleForm}
                        onFocus={()=>{handleErrors({})}}/>

                    <div className="block w-1/4 flex justify-center">
                        <div className="w-12">{role ? 'Admin' : 'Usuario'}</div>
                        <label htmlFor="check-role" className="ml-3 bg-gray-300 cursor-pointer relative w-10 h-6 rounded-full">
                            <input name="role" type="checkbox" id="check-role" className="sr-only peer" checked={role} onChange={handleRole}/>
                            <span className={`w-2/5 h-4 bg-amber-600 peer-checked:bg-green-600 absolute rounded-full left-1 top-1 peer-checked:left-5 transition-all duration-500`}></span>
                        </label>
                    </div>
                </div>
                <small className="text-red-500">{errors.name}</small>
                
            </div>
            <div className="pb-5">
                <label htmlFor="">Email:</label>
                <input name="email" value={user.email} onChange={handleForm} onFocus={()=>{handleErrors({})}} className="w-full rounded dark:bg-gray-600" type="email" />
                <small className="text-red-500">{errors.email}</small>
            </div>
            <div className="pb-5">
                <label htmlFor="">Contraseña:</label>
                <input name="password" value={user.password} onChange={handleForm} onFocus={()=>{handleErrors({})}} className="w-full rounded dark:bg-gray-600" type="password" />
                <small className="text-red-500">{errors.password}</small>
            </div>
            <div className="pb-5">
                <label htmlFor="">Región:</label>
                <select name="region_id" className="w-full rounded dark:bg-gray-600" value={user.region_id} onChange={handleForm} onFocus={()=>{handleErrors({})}}>
                        <option disabled={true} value="">Selecciona una región</option>
                    {
                        regiones?.map( ({id, region}, i) => (
                            <option key={i} value={id}>{region}</option>
                        ))
                    }
                </select>
                <small className="text-red-500">{errors.region_id}</small>
            </div>

            <button className="px-4 py-2 my-5 bg-amber-600 hover:bg-amber-700 transition-all rounded">Guardar</button>

        </form>
    )
}

export default FormUser