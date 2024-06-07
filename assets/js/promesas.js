import {addDoc,collection} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {db} from "./firebase.js"

export const registrarPersona = async (persona) => {
    const docRef = await addDoc(collection(db,"persona"),persona);
}