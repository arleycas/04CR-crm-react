export async function getClientes() {

  const response = await fetch(import.meta.env.VITE_API_URL)
  const resul = await response.json();

  return resul;
}

export async function getOneCliente(clientId) {

  const response = await fetch(`${import.meta.env.VITE_API_URL}/${clientId}`)
  const resul = await response.json();

  return resul;
}

export async function addCliente(datos) {
  try {
    console.log(datos);
    const response = await fetch(import.meta.env.VITE_API_URL, {
      method: 'POST',
      body: JSON.stringify(datos),
      headers: { 'Content-Type': 'application/json' }
    })

    await response.json();


  } catch (error) {
    console.log(error);
  }
}

export async function updateCliente(id, datos) {
  try {
    console.log(datos);
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(datos),
      headers: { 'Content-Type': 'application/json' }
    })

    await response.json();


  } catch (error) {
    console.log(error);
  }
}

export async function deleteCliente(id) {

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })

    await response.json();


  } catch (error) {
    console.log(error);
  }
}