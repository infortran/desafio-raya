import AdminLayout from '@/components/Layouts/AdminLayout'
import { RecordsList } from '@/components/Lists/RecordsList'
import WelcomeMessage from '@/components/WelcomeMessage'

import { useAuth } from '@/hooks/auth'
import { useRecords } from '@/hooks/records'
import Head from 'next/head'
import { useState } from 'react'

const Admin = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        region_id: ''
    })
    return (
        <AdminLayout
            subRoute={'/'}
            setUser={setUser}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Admin Dashboard
                </h2>
            }>

            <Head>
                <title>Admin Dashboard | Desafio RAYA</title>
            </Head>

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-600 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white dark:bg-gray-500 border-b border-gray-200 dark:border-gray-900">
                            <WelcomeMessage user={user} />
                        </div>
                    </div>
                </div>
            </div>
            
        </AdminLayout>
    )
}

export default Admin