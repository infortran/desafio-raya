import Head from 'next/head'
import { useEffect, useState } from 'react'

const GuestLayout = ({ children }) => {
    
    return (
        <div>
            <Head>
                <title>Desafio RAYA | Freddy Perez</title>
                
            </Head>


            <div className="font-sans text-gray-900 antialiased">
                {children}
            </div>
        </div>
    )
}

export default GuestLayout
