import {addDoc,collection,doc,updateDoc,getDocs,deleteDoc} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {db} from "./firebase.js"

export const registrarPersona = async (persona) => {
    const docRef = await addDoc(collection(db,"persona"),persona);
}


export const obtenerPersonas = async()=>{
    const ref = collection(db, "persona");
    const querySnap = await getDocs(ref);
    let listado = []
    querySnap.forEach(doc => {
        listado.push({...doc.data(),id: doc.id})
    });
    return listado;
}

export const actualizarPersona = async(objeto,id)=>{
    const ref = doc (db,"persona",id);
    await updateDoc(ref,objeto);
}

export const eliminarPersona = async(id)=>{
    const ref = doc (db,"persona",id);
    await deleteDoc(ref);
}
