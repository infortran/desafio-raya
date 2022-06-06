import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import axios from '@/lib/axios'
import Swal from 'sweetalert2'

export default function Home() {
    const { user } = useAuth({ middleware: 'guest' })
    const [darkTheme, setDarkTheme] = useState(true)
    const { setTheme } = useTheme()

    const [regions, setRegions] = useState([]);
    const [communes, setCommunes] = useState([]);

    const initialFormValues = {
        name: '',
        email: '',
        phone: '',
        region_id: '',
        comuna_id: '',
        rut: '',
        date_birth: '',
    }

    const [formValues, setFormValues] = useState(initialFormValues);

    const [errors, setErrors] = useState(initialFormValues);

    useEffect(() => {
        axios.get('/api/regiones')
            .then(res => {
                setRegions(res.data);
            })
    }, [])

    useEffect(() => {
        if (formValues.region_id) {
            setCommunes([]);
            setFormValues({
                ...formValues,
                comuna_id: '',
            });

            axios.get('/api/comunas-region/' + formValues.region_id)
                .then(res => {
                    setCommunes(res.data);
                })
        }
    }, [formValues.region_id])


    const handleChange = (e) => {
        setErrors({
            ...errors,
            [e.target.name]: '',
        });
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/api/records', {
            ...formValues,
            phone: formValues.phone.replace(/\+|\(|\)|\s|\-/g, '') // remove spaces, +, -, and ()
        })
            .then(res => {
                setFormValues(initialFormValues);
                Swal.fire({
                    title: 'Filete :D!!!',
                    text: 'Gracias por registrarte en el sistema.',
                })
            })
            .catch(err => {
                setErrors(err.response.data.errors);
            })
    }

    useEffect(() => {
        if (localStorage.getItem('theme')) {
            if (localStorage.getItem('theme') === 'dark') {
                setDarkTheme(true)
            } else if (localStorage.getItem('theme') === 'light') {
                setDarkTheme(false)
            }
        }
    }, [])

    const toggleTheme = (e) => {
        if (e.target.checked) {
            localStorage.setItem('theme', 'dark')
            setTheme('dark')
            setDarkTheme(true)
        } else {
            localStorage.setItem('theme', 'light')
            setTheme('light')
            setDarkTheme(false)
        }
    }

    return (
        <>
            <Head>
                <title>Desafio RAYA | Freddy Perez</title>
            </Head>

            <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
                <div className="hidden fixed top-0 right-0 px-6 py-4 sm:block">
                    <div className="flex justify-center">
                        <label htmlFor="check-dark-mode" className="bg-gray-300 cursor-pointer relative w-10 h-6 rounded-full">
                            <input type="checkbox" id="check-dark-mode" className="sr-only peer" checked={darkTheme} onChange={toggleTheme} />
                            <span className="w-2/5 h-4 bg-amber-600 absolute rounded-full left-1 top-1 peer-checked:left-5 transition-all duration-500"></span>
                        </label>
                    </div>
                    <div>

                        {user ?
                            <Link href={user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'}>
                                <a className="ml-4 text-sm text-gray-700 underline">
                                    Dashboard
                                </a>
                            </Link>
                            :
                            <>
                                <Link href="/login">
                                    <a className="text-sm text-gray-700 underline">Login</a>
                                </Link>


                            </>
                        }
                    </div>
                </div>

                <div className="w-full max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="pt-8 sm:pt-0">
                        <h1 className="dark:text-gray-50 text-2xl">Desafio RAYA</h1>
                        <p className="block text-gray-600 dark:text-gray-400 text-xl">Formulario de registros</p>
                    </div>

                    <div className="w-full mt-8 bg-white dark:bg-gray-800 overflow-hidden shadow sm:rounded-lg">
                        <div className="">
                            <div className="p-6">
                                <div className="items-center">
                                    {/* {JSON.stringify(formValues, null, 4)} */}
                                    <form onSubmit={handleSubmit} action="" className="w-full">
                                        <div className="flex pb-3">
                                            <div className="w-3/4">
                                                <label className="text-gray-400" htmlFor="">Nombre</label>
                                                <input name="name" type="text" className="dark:bg-gray-600 w-full rounded relative" value={formValues.name} onChange={handleChange} />
                                                {errors?.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                                            </div>
                                            <div className="ml-2">
                                                <label className="text-gray-400" htmlFor="">Rut</label>
                                                <input name="rut" type="text" className="dark:bg-gray-600 w-full rounded relative" value={formValues.rut} onChange={handleChange} />
                                                {errors?.rut && <p className="text-red-500 text-xs">{errors.rut}</p>}
                                            </div>
                                        </div>
                                        <div className="flex pb-3">
                                            <div className="w-3/4">
                                                <label className="text-gray-400" htmlFor="">Email</label>
                                                <input name="email" type="text" className="dark:bg-gray-600 w-full rounded relative" value={formValues.email} onChange={handleChange} />
                                                {errors?.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                                            </div>
                                            <div className="ml-2">
                                                <label className="text-gray-400" htmlFor="">Teléfono</label>
                                                <input name="phone" type="text" className="dark:bg-gray-600 w-full rounded relative" value={formValues.phone} onChange={handleChange} />
                                                {errors?.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                                            </div>
                                        </div>
                                        <div className="pb-3">
                                            <label htmlFor="" >Fecha de nacimiento:</label>
                                            <input className="dark:bg-gray-600 w-full rounded relative" type="date" name="date_birth" value={formValues.date_birth} onChange={handleChange} />
                                            {errors?.date_birth && <p className="text-red-500 text-xs">{errors.date_birth}</p>}
                                        </div>
                                        <div className="pb-3">
                                            <label className="text-gray-400" htmlFor="">Región</label>
                                            <select value={formValues.region_id} name="region_id" id="" className="dark:bg-gray-600 w-full rounded relative" value={formValues.region_id} onChange={handleChange}>
                                                <option disabled value="">Selecciona una region</option>
                                                {regions.map(region => (
                                                    <option key={region.id} value={region.id}>{region.region}</option>
                                                ))}
                                            </select>
                                            {errors?.region_id && <p className="text-red-500 text-xs">{errors.region_id}</p>}
                                        </div>
                                        <div className="pb-5">
                                            <label className="text-gray-400" htmlFor="">Comuna</label>
                                            <select value={formValues.comuna_id} name="comuna_id" id="" className="dark:bg-gray-600 w-full rounded relative" value={formValues.comuna_id} onChange={handleChange}>
                                                <option disabled value="">Selecciona una comuna</option>
                                                {communes.map(commune => (
                                                    <option key={commune.id} value={commune.id}>{commune.comuna}</option>
                                                ))}
                                            </select>
                                            {errors?.comuna_id && <p className="text-red-500 text-xs">{errors.comuna_id}</p>}
                                        </div>
                                        <div className="py-3">
                                            <button className="bg-amber-600 rounded p-2 w-full text-gray-50">Registrar</button>
                                        </div>
                                    </form>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
