import {addDoc,collection,doc,updateDoc,getDocs,deleteDoc} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {db} from "./firebase.js"

//regustramos una persona en la collecion persona
export const registrarPersona = async (persona) => {
    const docRef = await addDoc(collection(db,"persona"),persona);
}

//obtenemos los datos de la collecion persona 
export const obtenerPersonas = async()=>{
    //obtiene la referencia
    const ref = collection(db, "persona");
    //y a qui recuperamos los datos
    const querySnap = await getDocs(ref);
    //alamecenamos los datos obtenidos
    let listado = []
    //recorremos la lista creada para añadir los datos y el id a la lista
    querySnap.forEach(doc => {
        listado.push({...doc.data(),id: doc.id})
    });
    return listado;
}

//actualizamos una persona en la collecion persona
export const actualizarPersona = async(objeto,id)=>{
    //obtenemos la referencia
    const ref = doc (db,"persona",id);
    //actualiza
    await updateDoc(ref,objeto);
}

//eliminamos una persona en la collecion persona
export const eliminarPersona = async(id)=>{
    //obtenemos la referencia
    const ref = doc (db,"persona",id);
    //eliminamos
    await deleteDoc(ref);
}
