import { useNavigate, Form, useActionData, redirect } from "react-router-dom"
import Formulario from "../components/Formulario";
import Error from "../components/Error";
import { addCliente } from "../data/clientes";

export async function action({request}) {
  // console.log('Enviando info...', request);

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

  await addCliente(objDatosForm);

  return redirect('/')
}

export default function NuevoCliente() {

  const arrErrores = useActionData() // me devuelve lo enviado por la función 'action'
  const navigate = useNavigate();

  // console.log('esto', arrErrores);

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Nuevo cliente</h1>
      <p className="mt-3">Llena todos los campos para registrar un nuevo cliente</p>

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
          <Formulario />

          <input 
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
            value='Registrar cliente'/>
          </Form>
      </div>
    </>
  )
}
