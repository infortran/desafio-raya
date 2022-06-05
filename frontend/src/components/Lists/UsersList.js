import { useEffect, useState } from "react"
import axios from '@/lib/axios'
import InfiniteScroll from 'react-infinite-scroll-component'

export const UsersList = ({users}) => {
    const [list, setList] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        if(! list?.length ){
            setList(users?.data)
        }
        setHasMore(users?.next_page_url !== null)
    },[users])

    //console.log('el users que viene de afuera', users)

    const nextPage = async () => {
        const response = await axios.get(users?.next_page_url)
        .then(next => next)

        //console.log('el axios en next page', response)
        setList((list) => [...list, ...response.data.data])
        setHasMore(response.current_page > response.last_page)
    }
    const handleSearch = (e)=> {
        setSearchTerm(e.target.value)
    }
    return (
        <>
        <div className="py-4 max-w-7xl sm:px-6 lg:px-8">
            <input className="w-full  block rounded text-gray-800 selection:text-gray-100 selection:bg-amber-500" 
            type="text" value={searchTerm} onChange={handleSearch}
            placeholder="Buscar por nombre"/>
        </div>
        <InfiniteScroll
            dataLength={list?.length}
            next={nextPage}
            hasMore={hasMore}
            loader={<h4>Loading</h4>}
            endMessage={<h4>No hay más registros</h4>}
        >    
        {
        list && list.filter(value => {
            if(searchTerm === ''){
                return value
            }else if(value.email.toLowerCase().includes(searchTerm.toLowerCase()) ){
                return value
            }
        }).map((e, i) => 
            <div key={i} className="py-1">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-600 shadow-sm sm:rounded-lg ">
                        <div className="p-6 bg-white dark:bg-gray-600 border-b border-gray-200 dark:border-gray-900 rounded flex items-center justify-between">

                            {e.email}
                            <div className="">
                                
                                <button className="bg-gray-200 dark:bg-gray-900 py-2 px-4 rounded">Editar</button>
                                <button className="text-3xl ml-3">&times;</button>
                            </div>
                        </div>
                        
                        
                    </div>
                </div>
            </div>
            
        )
        }
        </InfiniteScroll>
        </>
    )
}