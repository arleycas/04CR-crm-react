import { useLoaderData } from "react-router-dom"
import Cliente from "../components/Cliente";
import { getClientes } from "../data/clientes";

// debe nombrarse en minuculas
// debe siempre retornar algo para que no bote error
export function loader() {
  return getClientes()
}

export default function Index() {

  const arrClientes = useLoaderData();

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
      <p className="mt-3">Administra tus clientes</p>

      {
        arrClientes.length ? (
          <table className="w-full bg-white shadow mt-5 table-auto">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="p-2">Cliente</th>
                <th className="p-2">Contacto</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {
                arrClientes.map(objCliente => (
                  <Cliente 
                    key={objCliente.id}  
                    objCliente={objCliente} />
                ))
              }
            </tbody>
          </table>
        ) : (
          <p className="text-center mt-10">No hay clientes aún</p>
        )
      }

    </>
  )
}
