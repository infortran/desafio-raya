import axios from '@/lib/axios'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { useRecords } from '@/hooks/records'
import { useEffect, useState } from 'react'
import AdminLayout from '@/components/Layouts/AdminLayout'
import FormRecord from '@/components/Forms/record'
import Swal from 'sweetalert2'

const Edit = ({id}) => {
    const router = useRouter()
    const [record, setRecord] = useState({
        name: '',
        rut: '',
        email: '',
        phone: '',
        date_birth: '',
        comuna_id: ''
    })
    const [errors, setErrors] = useState({
        name: '',
        rut: '',
        email: '',
        phone: '',
        date_birth: '',
        comuna_id: ''
    })
    const { getRecords } = useRecords()

    const fetcher = (url) => {
        return axios.get(url)
        .then(res => res.data)
        .catch(err => {
            console.log('error fetcher edit registro', err)
        })
    }
    
    const {data} = useSWR(`api/records/${id}`, fetcher)

    useEffect(() => {
        if (data) {
            setRecord(data)
        }
        console.log('data re culiao', data)
    },[data])

    const handleForm = (e) => {
        setRecord({
            ...record,
            [e.target.name]: e.target.value
        })
    }
    const update = (e) => {
        e.preventDefault()
        axios.put(`/api/records/${id}`, record)
        .then(res => {
            if(res.status === 200){
                Swal.fire({
                    title:'Que Bkn!',
                    text:'El registro se ha editado correctamente ;)',
                    confirmButtonText:'volver a registros',
                    cancelButtonText:'volver al dashboard',
                    showCancelButton:true
                }).then((res)=>{
                    if(res.isConfirmed){
                        router.push('/admin/registros')
                    }else if(res.isDismissed){
                        router.push('/admin/dashboard')
                    }
                })
            }
        })
        .catch(err => {
            console.log('el error del update', err)
        })
    }

    const handleErrors = (data) => {
        //console.log('el puto data', Object.keys(data))
        if (Object.keys(data).length > 0) {
            setErrors({
                ...errors, ...data
            })
        } else {
            setErrors({
                name: '',
                rut: '',
                email: '',
                phone: '',
                date_birth: '',
                comuna_id: ''
            })
        }

    }

    return (
    <>
    
    <AdminLayout
        subRoute={`registros/edit/${id}`}
    >
        <div className="max-w-xl mx-auto p-5">
            <h1 className="text-xl py-3">Editar el registro de {record?.name}</h1>
            <FormRecord record={record} setRecord={setRecord} handleForm={handleForm} action={update} errors={errors} handleErrors={handleErrors} />
        </div>
    </AdminLayout>
    </>
    )
}

export async function getServerSideProps(context) {
    return {
        props: {
            id:context.query.id
        },
    }
}


export default Edit