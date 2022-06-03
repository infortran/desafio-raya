import { useRecords } from '@/hooks/records'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import useSWR from 'swr'
import { useAuth } from '@/hooks/auth'


export const RecordsList = ({url}) => {
    const {user} = useAuth({middleware:'auth', subRoute:'registros'})
    const { getRecords } = useRecords()
    const [registros, setRegistros] = useState()
    const {data, error} = useSWR(url + `region?region_id=${user?.region_id}`, getRecords)

    console.log('los datos',data?.data)
    console.log('el error', error)
    useEffect(()=> {
        setRegistros(data?.data)
    },[data])
    console.log('los records del recordlist', registros)
    return (
        <>
        {
        registros && registros.map((e, i) => 
            <div key={i} className="py-1">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-600 shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white dark:bg-gray-600 border-b border-gray-200 dark:border-gray-900 rounded">

                            {e.email}
                            <p>{e.comuna.provincia.region.region}</p>
                        </div>
                    </div>
                </div>
            </div>
            
        )
        }
        </>
    )
}