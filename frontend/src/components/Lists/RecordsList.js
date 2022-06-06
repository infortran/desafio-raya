import axios from '@/lib/axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'




export const RecordsList = ({recordsData, usuario}) => {
    const [list, setList] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [nextPageUrl, setNextPageUrl] = useState()

    useEffect(() => {
        if(! list?.length ){
            setList(recordsData?.data)
            setNextPageUrl(recordsData?.next_page_url)
        }
    },[recordsData])
    
    useEffect(()=> {
        setHasMore(nextPageUrl !== null)
    }, [nextPageUrl])

    const nextPage = async () => {
        const response = await axios.get(nextPageUrl)
            .then(next => next)
        setNextPageUrl(response.data.next_page_url)
        if(response.data.data){
            setList((list) => [...list, ...response.data.data])
        }
        setHasMore(response.data.next_page_url !== null)
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
            }else if(value.name.toLowerCase().includes(searchTerm.toLowerCase()) ){
                return value
            }
        })
        .map((e, i) => 
            <div key={i} className="py-1">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between bg-white dark:bg-gray-600 shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white dark:bg-gray-600 rounded">
                            {e.name} <br/>
                            {e.email}
                            <p>Región: {e.comuna.provincia.region.region}</p>
                        </div>
                        <div>

                        </div>
                        {
                            usuario?.role === 'admin' ?
                            <div className="flex items-center p-4">
                                <Link href={`/admin/registros/edit/${e.id}`}>
                                    <a className="px-4 py-2 rounded dark:bg-gray-900">Editar</a>
                                </Link>
                                <button className="text-2xl ml-3">&times;</button>
                            </div>
                            :''    
                        }
                    </div>
                </div>
            </div>
            
        )
        }
        </InfiniteScroll>
        </>
    )
}