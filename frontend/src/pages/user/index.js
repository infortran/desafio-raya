import AppLayout from '@/components/Layouts/AppLayout'
import WelcomeMessage from '@/components/WelcomeMessage'
import Head from 'next/head'
import { useState } from 'react'

const Dashboard = () => {
    const [user, setUser] = useState({
        name:'',
        email:'',
        region:''
    })
    return (
        <AppLayout
            subRoute={'/'}
            setUser={setUser}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-100 leading-tight">
                    Dashboard
                </h2>
            }>

            <Head>
                <title>Dashboard | Desafio RAYA</title>
            </Head>

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white dark:bg-zinc-800 border-b border-zinc-900">
                            <WelcomeMessage user={user}/>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Dashboard
