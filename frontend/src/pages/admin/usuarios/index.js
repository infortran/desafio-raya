import AdminLayout from '@/components/Layouts/AdminLayout'
import { RecordsList } from '@/components/Lists/RecordsList'
import { UsersList } from '@/components/Lists/UsersList'
import axios from '@/lib/axios'
import Head from 'next/head'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

const Usuarios = () => {
    const [listUsers, setListUsers] = useState([])
    const [isMounted, setIsMounted] = useState(false)

    const getUsers = useCallback(async () => {
        const res = await axios.get('/api/users')
        const data = await res.data
        setListUsers(data)
    })

    useEffect(()=> {
        if(!isMounted){
            setIsMounted(true)
            getUsers()
        }
    },[ isMounted, getUsers])

    return (
        <AdminLayout
            subRoute={'usuarios'}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Lista de usuarios
                </h2>
            }>

            <Head>
                <title>Admin Dashboard | Desafio RAYA</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-600 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex justify-between items-center p-6 bg-white dark:bg-gray-500 border-b border-gray-200 dark:border-gray-900">
                            <div>Todos los usuarios</div>
                            <Link href="/admin/usuarios/create">
                            <button className="py-2 px-4 bg-amber-600 rounded">Agregar</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <UsersList users={listUsers} />
            

         
        </AdminLayout>
    )
}

export default Usuarios