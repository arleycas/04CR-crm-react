import { Form, useNavigate, useLoaderData, useActionData, redirect } from "react-router-dom";
import Formulario from "../components/Formulario";
import { getOneCliente, updateCliente } from "../data/clientes";
import Error from "../components/Error";

export async function loader({params}) {
  const cliente = await getOneCliente(params.clienteId);

  if (Object.values(cliente).length === 0) {
    throw new Response('', {
      status: 404,
      statusText: 'Cliente no encontrado o inexistente'
    })
  }

  return cliente; 
}

export async function action({request, params}) {
  // params, son los parametros que vienen en la url (url/:clienteId)

  const formData = await request.formData()

  // se pueden obtner los datos de varias formas
  const objDatosForm = Object.fromEntries(formData) // se obtienen todos los datos en un objeto {}

  const email = formData.get('email') // se obtiene solo uno de los datos (con la propiedad name del input)
  
  // validación
  const arrErrores = []
  if(Object.values(objDatosForm).includes('')) {
    arrErrores.push('Todos los cambios son obligatorios')
  }
  
  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

  if (!regex.test(email)) {
    console.log('No es valido el emai');
    arrErrores.push('El email no es valido')
  }

  //retornar datos si hay errores
  if(arrErrores.length) {
    console.log('Si hay errores');
    return arrErrores
  }

  await updateCliente(params.clienteId, objDatosForm);

  return redirect('/')
}

export default function EditarCliente() {

  const navigate = useNavigate();
  const objCliente = useLoaderData();
  const arrErrores = useActionData();

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar cliente</h1>
      <p className="mt-3">Modifica los cambios de un cliente</p>

      <div className="flex justify-end">
        <button 
          className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
          onClick={()=> { navigate('/') }}>Volver</button>
      </div>

      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">

        { arrErrores?.length && arrErrores.map((error, i) => <Error key={i}>{error}</Error>) }

        <Form
          method="post"
          noValidate>
          <Formulario objCliente={objCliente}/>

          <input 
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
            value='Registrar cliente'/>
          </Form>
      </div>
    </>
  )
}
