import {useLocations} from '@/hooks/locations'
import { useEffect, useState } from 'react'

const FormUser = ({user, setUser, handleForm, action, errors, handleErrors}) => {

    const {regiones} = useLocations()
    const [role, setRole] = useState(user.role === 'admin')
    

    useEffect(() => {
        if(user.role){
            setRole(user.role === 'admin')
        }
    },[user])

    const handleRole = (e) => {
        setRole( e.target.checked )
        setUser({
            ...user,
            ['role']:e.target.checked ? 'admin' : 'user'
        })
    }

    

    return (
        <form onSubmit={action}>
            <div className="pb-5">
                
                <div className="flex items-center justify-between flex-col md:flex-row">
                    <div className="w-full md:w-3/4">
                        <label htmlFor="">Nombre:</label>
                        <input name="name" className="block w-full rounded dark:bg-gray-600 order-last md:order-first" type="text" 
                            value={user.name} 
                            onChange={handleForm}
                            onFocus={()=>{handleErrors({})}}/>
                    </div>

                    <div className="block md:w-1/4 flex justify-center pb-5 md:pb-0 order-first md:order-last">
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
                <input name="email" value={user.email} onChange={handleForm} onFocus={()=>{handleErrors({})}} className={`w-full rounded dark:bg-gray-${action.name === 'update' ? '400 cursor-not-allowed': '600'}`} type="email" disabled={action.name === 'update'} />
                <small className="text-red-500">{errors.email}</small>
            </div>
            {action.name === 'create' && <div className="pb-5">
                <label htmlFor="">Contraseña:</label>
                <input name="password" value={user.password} onChange={handleForm} onFocus={()=>{handleErrors({})}} className="w-full rounded dark:bg-gray-600" type="password" />
                <small className="text-red-500">{errors.password}</small>
    </div>}
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