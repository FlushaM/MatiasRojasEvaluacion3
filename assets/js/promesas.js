import {} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {db} from "./firebase.js"

export const registrarPersona = async () => {
    const docRef = await addDoc(collection(db,"persona"),pesona);
}