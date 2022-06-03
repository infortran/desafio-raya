import useSWR from 'swr'
import axios from '@/lib/axios'

export const useRecords = () => {

    const { data: records, error, mutate } = useSWR('/api/records', () =>
        axios
            .get('/api/records')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error

                //router.push('/verify-email')
            }),
    )
    const getRecords = (url) => {
        console.log('la url',url)
        return axios.get(url)
            .then(res => res.data)
            
            .catch(error => {
                console.error('el errorcito',error)
                if (error.response.status !== 409) throw error
                
            })
    }

    /*const {data:registro, error} = useSWR(`/api/records/1`, () => {
        axios.get(`/api/records/1`)
        .then(res => res.data)
        .catch(err => {
            console.log('error del swr', err)
        })
    })*/
    

    return {
        records,
        getRecords,
        /*registro*/
    }
}