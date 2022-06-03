

const FormRecord = ({record, handleForm, action}) => {
    return (
        <>
            <form onSubmit={action}>
                <div className="pb-5">
                    <label htmlFor="" >Nombre:</label>
                    <input className="text-gray-900 w-full rounded" type="text" name="name" value={record?.name} onChange={handleForm}/>
                    
                </div>
                <div className="pb-5">
                    <label htmlFor="" >Rut:</label>
                    <input className="text-gray-900 w-full rounded" type="text" name="name" value={record?.rut} onChange={handleForm}/>
                    
                </div>
                <div className="pb-5">
                    <label htmlFor="" >Email:</label>
                    <input className="text-gray-900 w-full rounded" type="text" name="name" value={record?.email} onChange={handleForm}/>
                    
                </div>
                <div className="pb-5">
                    <label htmlFor="" >Telefono:</label>
                    <input className="text-gray-900 w-full rounded" type="text" name="name" value={record?.phone} onChange={handleForm}/>
                    
                </div>
                <div className="pb-5">
                    <label htmlFor="" >Telefono:</label>
                    <input className="text-gray-900 w-full rounded" type="text" name="name" value={record?.telefono} onChange={handleForm}/>
                    
                </div>
                <button className="py-2 px-4 rounded my-5 bg-gray-900">Guardar</button>
            </form>
        </>
    )
}

export default FormRecord