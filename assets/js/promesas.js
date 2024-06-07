import {addDoc,collection} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {db} from "./firebase.js"

export const registrarPersona = async (persona) => {
    const docRef = await addDoc(collection(db,"persona"),persona);
}


export const obtenerDatos = async()=>{
    const ref = collection(db,"persona");
    const querySnapshot = await getDocs(ref);
    let listado = []
    querySnapshot.forEach(doc => {
        listado.push({...doc.data(),id: doc.id});
    });
    return listado;
}