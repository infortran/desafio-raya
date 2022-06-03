export const UsersList = ({users}) => {
    return (
        <>
        {
        users?.map(e => 
            <div className="py-1">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-600 shadow-sm sm:rounded-lg ">
                        <div className="p-6 bg-white dark:bg-gray-600 border-b border-gray-200 dark:border-gray-900 rounded flex items-center justify-between">

                            {e.email}
                            <div className="">
                                <button className="bg-gray-200 dark:bg-gray-400 py-2 px-4 rounded">editar</button>
                                <button className="text-3xl ml-3">&times;</button>
                            </div>
                        </div>
                        
                        
                    </div>
                </div>
            </div>
            
        )
        }
        </>
    )
}