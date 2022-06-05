import AdminLayout from '@/components/Layouts/AdminLayout'
import { RecordsList } from '@/components/Lists/RecordsList'
import { UsersList } from '@/components/Lists/UsersList'
import { useAuth } from '@/hooks/auth'
import { useRecords } from '@/hooks/records'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

const Registros = () => {
    const {user} = useAuth({middleware:'auth', subRoute:'registros'})
    const { getRecords } = useRecords()
    const [registros, setRegistros] = useState()
    
    const {data, error} = useSWR(`/api/records/`, getRecords)

    //console.log('los datos',data)

    useEffect(()=> {
        setRegistros(data)
    },[data])

    console.log('registros malditos', registros)
    return (
        <AdminLayout
            subRoute={'registros'}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Lista de Registros
                </h2>
            }>

            <Head>
                <title>Admin Dashboard | Desafio RAYA</title>
            </Head>
            

            <div className="pt-12 pb-2">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-600 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex justify-between items-center p-6 bg-white dark:bg-gray-600 border-b border-gray-200 dark:border-gray-900">
                            <div>Lista de registros</div>
                            <Link href="/admin/registros/create">
                                <a className="py-2 px-4 bg-amber-500 rounded">Agregar</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            { <RecordsList recordsData={registros} usuario={user}/>}
        </AdminLayout>
    )
}

export default Registros