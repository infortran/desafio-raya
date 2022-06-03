import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import {useTheme} from 'next-themes'

export default function Home() {
    const { user } = useAuth({ middleware: 'guest' })
    const [darkTheme, setDarkTheme] = useState(true)
    const { setTheme } = useTheme()

    useEffect(() => {
        if(localStorage.getItem('theme')){
            if(localStorage.getItem('theme') === 'dark'){
                setDarkTheme(true)
            }else if(localStorage.getItem('theme') === 'light'){
                setDarkTheme(false)
            }
        }
    },[])

    const toggleTheme = (e) => {
        if(e.target.checked){
            localStorage.setItem('theme', 'dark')
            setTheme('dark')
            setDarkTheme(true)
        }else{
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
                           <input type="checkbox" id="check-dark-mode" className="sr-only peer" checked={darkTheme} onChange={toggleTheme}/>
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
                                    <form action="" className="w-full">
                                        <div className="flex pb-3">
                                            <div className="w-3/4">
                                                <label className="text-gray-400" htmlFor="">Nombre</label>
                                                <input name="" type="text" className="w-full rounded" />
                                            </div>
                                            <div className="ml-2">
                                                <label className="text-gray-400" htmlFor="">Rut</label>
                                                <input type="text" className="w-full rounded" />
                                            </div>
                                        </div>
                                        <div className="flex pb-3">
                                            <div className="w-3/4">
                                                <label className="text-gray-400" htmlFor="">Email</label>
                                                <input type="text" className="w-full rounded" />
                                            </div>
                                            <div className="ml-2">
                                                <label className="text-gray-400" htmlFor="">Teléfono</label>
                                                <input type="text" className="w-full rounded" />
                                            </div>
                                        </div>
                                        <div className="pb-3">
                                            <label className="text-gray-400" htmlFor="">Región</label>
                                            <select name="" id="" className="rounded w-full">
                                                <option value="">Selecciona una region</option>
                                            </select>
                                        </div>
                                        <div className="pb-5">
                                            <label className="text-gray-400" htmlFor="">Comuna</label>
                                            <select name="" id="" className="rounded w-full">
                                                <option value="">Selecciona una region</option>
                                            </select>
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
