import { useEffect, useState } from "react"
import axios from '@/lib/axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import Link from "next/link"
import Swal from 'sweetalert2'

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

    const deleteUser = (id) => {
        Swal.fire({
            title:'Eliminar Usuario',
            text:'Estas seguro que quieres eliminar este usuario?',
            confirmButtonText: 'Eliminar',
            showCancelButton:true,
            cancelButtonText:'Cancelar'
            
        }).then(res => {
            if(res.isConfirmed){
                axios.delete(`/api/users/${id}`)
                .then(res => {
                    if(res.status === 200){
                        Swal.fire({
                            title:'Eliminado',
                            text:'El usuario ha sido eliminado correctamente'
                        }).then(r => {
                            window.location.href = '/admin/usuarios'
                        })
                    }
                })
                .catch(err => {
                    console.log('error delete user', err)
                })
            }
        })
    }
    return (
        <>
        <div className="py-4 max-w-7xl sm:px-6 lg:px-8">
            <input className="w-full  block rounded text-gray-800 selection:text-gray-100 selection:bg-amber-500" 
            type="text" value={searchTerm} onChange={handleSearch}
            placeholder="Buscar por email"/>
        </div>
        <InfiniteScroll
            dataLength={list?.length}
            next={nextPage}
            hasMore={hasMore}
            loader={<h4 className="text-center pt-5">Cargando...</h4>}
            endMessage={<h4 className="text-center pt-5">No hay más registros</h4>}
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
                        <div className={`p-6 bg-white ${e.role === 'admin' ? 'dark:bg-amber-800' : 'dark:bg-gray-600'}  border-b border-gray-200 dark:border-gray-900 rounded flex items-center justify-between`}>
                            <div>
                                <div className="text-xl bold w-32 sm:w-48 md:w-full">{e.name}</div>
                                <div className="text-gray-400 w-32 sm:w-48 md:w-full overflow-hidden">{e.email}</div>
                            </div>
                            
                            <div className="">
                                <Link href={`/admin/usuarios/edit/${e.id}`}>
                                    <button className="bg-gray-200 dark:bg-gray-900 py-2 px-4 rounded">Editar</button>
                                </Link>
                                <button className="text-3xl ml-3" onClick={() => {
                                    deleteUser(e.id)
                                }}>&times;</button>
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