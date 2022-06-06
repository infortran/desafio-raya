import Navigation from '@/components/Layouts/Navigation'
import { useAuth } from '@/hooks/auth'
import { useEffect } from 'react'

const AppLayout = ({ header, children, subRoute, setUser }) => {
    const { user } = useAuth({ middleware: 'auth', subRoute })
    useEffect(() => {
        user && setUser && setUser(user)
    },[user])
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-zinc-700">
            <Navigation user={user} />

            {/* Page Heading */}
            <header className="bg-white dark:bg-zinc-900 shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    {header}
                </div>
            </header>
            {/* Page Content */}
            <main>{children}</main>
        </div>
    )
}

export default AppLayout
