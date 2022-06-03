import axios from '@/lib/axios'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { useRecords } from '@/hooks/records'
import { useEffect, useState } from 'react'
import AdminLayout from '@/components/Layouts/AdminLayout'
import FormRecord from '@/components/Forms/record'

const Edit = ({id}) => {
    //const router = useRouter()
    //const { id } = router.query
    const [idRecord, setIdRecord] = useState(id)
    const [record, setRecord] = useState({})
    const { getRecords } = useRecords()
    
    

    /*const {data, error} = useSWR(`/api/records/1`, () => {
        return axios.get(`/api/records/1`)
        .then(res => res.data)
        .catch(error => {
            console.log('error del swr', error)
        })
    })*/

    const {data} = useSWR(`api/records/${id}`, getRecords)
    //const [fields, setFields] = useState(data?.id)
    //console.log('que viene en el data del edit', data)
    //console.log('el error del swr', error)

    useEffect(() => {
        setIdRecord(id)
        setRecord(data?.id)
        console.log('que viene en el data del edit', data)
    },[data, id])
    console.log('lo que quedo dentro del record', record)

    const handleForm = (e) => {
        setRecord({
            ...record,
            [e.target.name]: e.target.value
        })
    }
    const update = (e) => {
        e.preventDefault()
        const url = `/api/records/${id}`
        axios.put(url, record)
        .then(res => res)
        .catch(err => console.log)
    }
    return (
    <>
    
    <AdminLayout
        subRoute={`registros/edit/${id}`}
    >
        <div className="max-w-xl mx-auto p-5">
            <h1 className="text-xl py-3">Editar el registro de {record?.name}</h1>
            {/*<form onSubmit={update}>
                <div className="pb-5">
                    <label htmlFor="" >Nombre:</label>
                    <input className="text-gray-900 w-full rounded" type="text" name="name" value={record?.name} onChange={handleForm}/>
                    
                </div>
                <div className="pb-5">
                    <label htmlFor="" >Rut:</label>
                    <input className="text-gray-900 w-full rounded" type="text" name="name" value={record?.name} onChange={handleForm}/>
                    
                </div>
                <div className="pb-5">
                    <label htmlFor="" >Email:</label>
                    <input className="text-gray-900 w-full rounded" type="text" name="name" value={record?.name} onChange={handleForm}/>
                    
                </div>
                <div className="pb-5">
                    <label htmlFor="" >nombre:</label>
                    <input className="text-gray-900 w-full rounded" type="text" name="name" value={record?.name} onChange={handleForm}/>
                    
                </div>
                <button className="py-2 px-4 rounded my-5 bg-gray-900">Guardar</button>
    </form>*/}
        <FormRecord record={record} handleForm={handleForm} action={update} />
        </div>
    </AdminLayout>
    </>
    )
}

export async function getServerSideProps(context) {
    return {
        props: {
            id:context.query.id
        }, // will be passed to the page component as props
    }
}


export default Edit