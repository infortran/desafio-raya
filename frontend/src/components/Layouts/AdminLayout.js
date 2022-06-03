import Navigation from '@/components/Layouts/Navigation'
import { useAuth } from '@/hooks/auth'

const AdminLayout = ({ header, children, subRoute }) => {
    const { user } = useAuth({ middleware: 'auth', subRoute })

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
            <Navigation user={user} />

            {/* Page Heading */}
            <header className="bg-white dark:bg-gray-700 shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    {header}
                </div>
              
            </header>

            {/* Page Content */}
            <main>{children}</main>
        </div>
    )
}
export default AdminLayout