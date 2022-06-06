import { useLocations } from "@/hooks/locations"
import { useEffect, useState } from "react"

const WelcomeMessage = ({user}) => {
    const {regiones} = useLocations()
    const [region, setRegion] = useState('')

    useEffect(() => { 
        if(regiones){
            const region = regiones.find(region => region.id === user?.region_id)
            setRegion(region?.region)
        }
    },[regiones, user])

    return (
        <>
        <div>
            <h1 className="text-4xl">Bienvenidos</h1>
            <p>Muchas gracias por instalar y probar este sistema, desarrollado con Laravel 9, NextJS y tailwind CSS </p>
            <p>Muchas gracias equipo de RAYA por esta oportunidad. </p>

        </div>
        <div className="bg-amber-700 p-5 rounded mt-5">
            <h2>Datos del usuario</h2>
            <p>Nombre: {user?.name}</p>
            <p>Email: {user?.email}</p>
            <p>Region: {region}</p>
        </div>
        </>
    )
}

export default WelcomeMessage