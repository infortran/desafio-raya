import AppLayout from '@/components/Layouts/AppLayout'
import { RecordsList } from '@/components/Lists/RecordsList'
import { UsersList } from '@/components/Lists/UsersList'
import { useAuth } from '@/hooks/auth'
import { useRecords } from '@/hooks/records'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

const Dashboard = () => {
    const {user} = useAuth({middleware:'auth', subRoute:'registros'})
    const { getRecords } = useRecords()
    const [registros, setRegistros] = useState()
    console.log('el user', user)
    const {data, error} = useSWR(`/api/records/region/${user?.region_id}`, getRecords)

    console.log('los datos',data)
    useEffect(()=> {
        setRegistros(data)
    },[data])

    

    return (
        <AppLayout
            subRoute={'registros'}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Lista de Registros de la región: 
                </h2>
            }>

            <Head>
                <title>Dashboard | Desafio RAYA</title>
            </Head>
            

            <div className="pt-12 pb-2">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-600 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white dark:bg-gray-600 border-b border-gray-200 dark:border-gray-900">
                            Lista de registros
                        </div>
                    </div>
                </div>
            </div>
            <RecordsList records={registros} />
        </AppLayout>
    )
}

export default Dashboard