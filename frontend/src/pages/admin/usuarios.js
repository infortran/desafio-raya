import AdminLayout from '@/components/Layouts/AdminLayout'
import { RecordsList } from '@/components/Lists/RecordsList'
import { UsersList } from '@/components/Lists/UsersList'
import { useAuth } from '@/hooks/auth'
import Head from 'next/head'

const Usuarios = () => {
    const { users } = useAuth({middleware:'auth', subRoute:'usuarios'})

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
                        <div className="p-6 bg-white dark:bg-gray-500 border-b border-gray-200 dark:border-gray-900">
                            <input type="text" className="w-full rounded" placeholder="Buscar"/>
                        </div>
                    </div>
                </div>
            </div>
            <UsersList users={users} />
            

         
        </AdminLayout>
    )
}

export default Usuarios