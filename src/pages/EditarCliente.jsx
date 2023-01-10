import { getOneCliente } from "../data/clientes";

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

export default function EditarCliente() {
  return (
    <div>EditarCliente</div>
  )
}
