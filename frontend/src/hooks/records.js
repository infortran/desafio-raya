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
    const getRecords = async (url) => {
        return await axios.get(url)
            .then(res => res.data)
            .catch(error => {
                console.error('el errorcito',error)
            })
    }
    

    return {
        records,
        getRecords
    }
}