import AppLayout from '@/components/Layouts/AppLayout'
import { RecordsList } from '@/components/Lists/RecordsList'
import { useAuth } from '@/hooks/auth'
import { useLocations } from '@/hooks/locations'
import { useRecords } from '@/hooks/records'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

const Dashboard = () => {
    const {user} = useAuth({middleware:'auth', subRoute:'registros'})
    const {regiones} = useLocations()
    const { getRecords } = useRecords()
    const [registros, setRegistros] = useState()
    const [title, setTitle] = useState('')
    //console.log('el user', user)
    const {data, error} = useSWR(`/api/records/region/${user?.region_id}`, getRecords)

    //console.log('los datos de registro user',data)
    useEffect(()=> {
        setRegistros(data)
        
    },[data])
    console.log('afuera del use effect', regiones)
    useEffect(() => {
        if(regiones){
            const region = regiones.find(region => region.id === user?.region_id)
            setTitle(region.region)
        }
        console.log('adentro del use effect', regiones)
    },[regiones])


    return (
        <AppLayout
            subRoute={'registros'}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Lista de Registros de la región: {title}
                </h2>
            }>

            <Head>
                <title>Dashboard | Desafio RAYA</title>
            </Head>
            

            <div className="pt-12 pb-2">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-600 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white dark:bg-gray-600 border-b border-gray-200 dark:border-gray-900">
                            <div>Todos los registros</div>
                        </div>
                    </div>
                </div>
            </div>
            <RecordsList recordsData={registros} usuario={user}/>
        </AppLayout>
    )
}

export default Dashboard