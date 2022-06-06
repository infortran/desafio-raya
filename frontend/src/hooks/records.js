import useSWR from 'swr'
import axios from '@/lib/axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

export const useRecords = () => {

    const router = useRouter()

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
        return axios.get(url)
            .then(res => res.data)
            
            .catch(error => {
                console.error('el errorcito',error)
                if (error.response.status !== 409) throw error
                
            })
    }

    const deleteRecord = (id) => {
        Swal.fire({
            title:'Eliminar registro',
            text:'Estas seguro que quieres eliminar este registro?',
            confirmButtonText: 'Eliminar',
            showCancelButton:true,
            cancelButtonText:'Cancelar'
            
        }).then(res => {
            if(res.isConfirmed){
                axios.delete(`/api/records/${id}`)
                .then(res => {
                    if(res.status === 200){
                        Swal.fire({
                            title:'Eliminado',
                            text:'Elregistro ha sido eliminado correctamente'
                        }).then(r => {
                            window.location.href = '/admin/registros'
                        })
                    }
                })
                .catch(err => {
                    console.log('error delete record', err)
                })
            }
        })
    }
    

    return {
        records,
        getRecords,
        deleteRecord
    }
}