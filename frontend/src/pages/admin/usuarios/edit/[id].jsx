import axios from '@/lib/axios'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { useRecords } from '@/hooks/records'
import { useEffect, useState } from 'react'
import AdminLayout from '@/components/Layouts/AdminLayout'
import FormRecord from '@/components/Forms/record'
import Swal from 'sweetalert2'
import FormUser from '@/components/Forms/user'

const Edit = ({id}) => {
    const router = useRouter()
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        region_id: ''
    })
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        role: '',
        region_id: ''
    })

    const fetcher = (url) => {
        return axios.get(url)
        .then(res => {
            console.log('la vaca', res)
            return res.data
        })
        .catch(err => {
            console.log('error fetcher edit user', err)
        })
    }
    
    
    const {data} = useSWR(`api/users/${id}`, fetcher)

    useEffect(() => {
        if(data){
            setUser(data)
        }
    },[data])

    const handleForm = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    const update = (e) => {
        e.preventDefault()
        axios.put(`/api/users/${id}`, user)
        .then(res => {
            if(res.status === 200){
                Swal.fire({
                    title:'Que Wena!',
                    text:'El usuario se ha editado correctamente ;)',
                    confirmButtonText:'volver a usuarios',
                    cancelButtonText:'volver al dashboard',
                    showCancelButton:true
                }).then((res)=>{
                    if(res.isConfirmed){
                        router.push('/admin/usuarios')
                    }else if(res.isDismissed){
                        router.push('/admin/dashboard')
                    }
                })
            }
        })
        .catch(err => {
            handleErrors(err.response.data.errors)
        })
    }

    const handleErrors = (data) => {
        if (Object.keys(data).length > 0) {
            setErrors({
                ...errors, ...data
            })
        } else {
            setErrors({
                name: '',
                email: '',
                role: '',
                region_id: ''
            })
        }

    }

    return (
    <>
    
    <AdminLayout
        subRoute={`usuarios/edit/${id}`}
    >
        <div className="max-w-xl mx-auto p-5">
            <h1 className="text-xl py-3">Editar usuario {user?.name}</h1>
            <FormUser user={user} setUser={setUser} handleForm={handleForm} action={update} errors={errors} handleErrors={handleErrors}/>
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