import axios from '@/lib/axios'
import useSWR from "swr"

export const fetcher = (url) => {
    return axios.get(url)
        .then(res => res.data)
        .catch(error => {
            console.error('el errorcito',error)
            if (error.response.status !== 409) throw error
            
        })
}
export const useLocations = () => {
    

    const {data:regiones} = useSWR(`/api/regiones`, fetcher)
    const {data:comunas} = useSWR(`/api/comunas`, fetcher)
    const {data:provincias} = useSWR(`/api/provincias`, fetcher)

    return {
        regiones,
        comunas,
        provincias
    }
    
}

