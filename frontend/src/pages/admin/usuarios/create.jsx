import axios from '@/lib/axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import AdminLayout from '@/components/Layouts/AdminLayout'
import FormRecord from '@/components/Forms/record'
import Swal from 'sweetalert2'
import FormUser from '@/components/Forms/user'

const Create = () => {
    const router = useRouter()
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user',
        region_id: ''
    })
    const [errors, setErrors] = useState({
        name:'',
        email:'',
        password: '',
        region_id:''
    })

    const handleForm = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    const create = (e) => {
        e.preventDefault()
        axios.post(`/api/users/`, user)
        .then(res => {
            if(res.status === 200){
                Swal.fire({
                    title:'Que Wena!',
                    text:'El usuario se ha creado correctamente ;)',
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
            console.log('el error del create', err.response)
            if(err.response.status === 422){
                console.log('se esta ejecutando el handle errors')
                handleErrors(err.response.data.errors)
            }
        })
    }

    const handleErrors = (data) => {
        //console.log('el puto data', Object.keys(data))
        if(Object.keys(data).length > 0){
            setErrors({
                ...errors, ...data
            })
        }else{
            setErrors({
                name:'',
                email:'',
                password: '',
                region_id:''
            })
        }
        
    }

    return (
    <>
    
    <AdminLayout
        subRoute={`usuarios/create`}
    >
        <div className="max-w-xl mx-auto p-5">
            <h1 className="text-xl py-3">Crear un nuevo usuario</h1>

            <FormUser user={user} setUser={setUser} action={create} handleForm={handleForm} errors={errors} handleErrors={handleErrors}/>

        </div>
    </AdminLayout>
    </>
    )
}


export default Create