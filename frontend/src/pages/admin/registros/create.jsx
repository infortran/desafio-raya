import axios from '@/lib/axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import AdminLayout from '@/components/Layouts/AdminLayout'
import FormRecord from '@/components/Forms/record'
import Swal from 'sweetalert2'

const Create = () => {
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

    const handleForm = (e) => {
        setRecord({
            ...record,
            [e.target.name]: e.target.value
        })
    }
    const create = (e) => {
        e.preventDefault()
        axios.post(`/api/records/`, record)
            .then(res => {
                if (res.status === 200) {
                    Swal.fire({
                        title: 'Que Bkn!',
                        text: 'El registro se ha creado correctamente ;)',
                        confirmButtonText: 'volver a registros',
                        cancelButtonText: 'volver al dashboard',
                        showCancelButton: true
                    }).then((res) => {
                        if (res.isConfirmed) {
                            router.push('/admin/registros')
                        } else if (res.isDismissed) {
                            router.push('/admin/dashboard')
                        }
                    })
                }
            })
            .catch(err => {
                console.log('el error del create', err)
                if (err.response.status === 422) {
                    console.log('se esta ejecutando el handle errors')
                    handleErrors(err.response.data.errors)
                }
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
                subRoute={`registros/create`}
            >
                <div className="max-w-xl mx-auto p-5">
                    <h1 className="text-xl py-3">Crear un nuevo registro</h1>
                    <FormRecord record={record} setRecord={setRecord} handleForm={handleForm} action={create} errors={errors} handleErrors={handleErrors} />
                </div>
            </AdminLayout>
        </>
    )
}


export default Create