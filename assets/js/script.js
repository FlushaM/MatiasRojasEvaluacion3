import {  registrarPersona , obtenerPersonas , actualizarPersona } from "./promesas.js";

window.addEventListener("load", () => {
    document.getElementById("btnregistrar").addEventListener("click", registrar);
    document.getElementById("btnActualizar").addEventListener("click",actualizar);
    document.getElementById("btnContraste").addEventListener("click", cambiarContraste);
    document.getElementById("btnFuente").addEventListener("click", cambiarFuente);
    cargarDatos(); 

});
//funcion para validar campos que usen radio de cualqueir formualario 
//en est caso usada para el sexo
//recorre con un for una lista creada con el valor del radio
//luego usamos if si si el radio esta clickeado con .checked y le devolvemos el valor
const obtenerValorRadio = (valores) => {
    for (let i = 0; i < valores.length; i++){
        if (valores[i].checked){
            return valores[i].value;
        }
    }
    return null; // si no seleeciono ningun radio es nulo
  };

const cambiarContraste = () => {
    document.body.classList.toggle("contraste");
}

const cambiarFuente = () => {
    document.body.classList.toggle("fuente-alternativa");
}

//funcion para registrar personas se recuperan elementos se agrega valor y se crea el objeto
const registrar = () => {
    // recuperar el elemento
    let eNombre = document.getElementById("UPDnombre");
    let eApellido = document.getElementById("UPDapellido");
    let eContraseña = document.getElementById("UPDcontraseña")
    let eDate = document.getElementById("UPDfecha");
    let eSexo = document.getElementsByClassName("UPDsexo");
    let eCategoria = document.getElementById("UPDcategoria");
    let eBici = document.getElementById("UPDbicicleta");
    let eOpinion = document.getElementById("UPDopinion");
    // recuperamos valor
    let vNombre = eNombre.value;
    let vApellido = eApellido.value;
    let vContraseña = eContraseña.value;
    let vDate = eDate.value;
    let vSexo = obtenerValorRadio(eSexo);
    let vCategoria = eCategoria.value;
    let vBici = eBici.value;
    let vOpinion = eOpinion.value;
    // creamos objeto


    

    let objeto = {nombre: vNombre, apellido: vApellido, eContraseña:vContraseña, fecha: vDate, sexo: vSexo, categoria: vCategoria, bici: vBici, opinion: vOpinion};
    console.log(objeto);
    registrarPersona(objeto).then(() => {
        alert("Registro exitoso");
        cargarDatos(); // Esto asegurará que los datos se recarguen después de un registro exitoso.
    }).catch((r) => {
        alert("algo ocurrio");
        alert(r);
    });
    // llamar a la función
    let id = document.getElementById("btnActualizar").value;
    console.log(objeto);
    actualizarPersona(objeto, id).then(() => {
        alert("actualizado con exito");
        cargarDatos();
    });
};



const cargarDatos = () => {
    obtenerPersonas().then((personas) => {
        console.log("recupere");
        console.log(personas);
        let estructura = "";
        personas.forEach((persona) => {
            estructura += "<tr>";
            estructura += "<td>" + persona.nombre + "</td>";
            estructura += "<td>" + persona.apellido + "</td>";
            estructura += "<td>" + persona.contraseña + "</td>";
            estructura += "<td>" + persona.fecha + "</td>";
            estructura += "<td>" + persona.sexo + "</td>";
            estructura += "<td>" + persona.categoria + "</td>";
            estructura += "<td>" + persona.bici + "</td>";
            estructura += "<td>" + persona.opinion + "</td>";
            estructura += "<td> <button id='UPD" + persona.id + "'>Actualizar</button></td>";
            estructura += "<td> <button id='DEL" + persona.id + "'>Eliminar</button></td>";
            estructura += "</tr>";
        });
        document.getElementById("tdDatos").innerHTML = estructura;
        personas.forEach((persona) => {
            let botonUPD = document.getElementById("UPD" + persona.id);
            botonUPD.addEventListener("click", () => {
                let eNombre = document.getElementById("UPDnombre");
                let eApellido = document.getElementById("UPDapellido");
                let eContraseña = document.getElementById("UPDcontraseña");
                let eDate = document.getElementById("UPDfecha");
                let eSexo = document.getElementsByClassName("UPDsexo");
                let eCategoria = document.getElementById("UPDcategoria");
                let eBici = document.getElementById("UPDbicicleta");
                let eOpinion = document.getElementById("UPDopinion");
                eNombre.value = persona.nombre;
                eApellido.value = persona.apellido;
                eContraseña.value = persona.contraseña;
                eDate.value = persona.fecha;
                for (let i = 0; i < eSexo.length; i++) {
                    if (eSexo[i].value === persona.sexo) {
                        eSexo[i].checked = true;
                    }
                }
                eCategoria.value = persona.categoria;
                eBici.value = persona.bici;
                eOpinion.value = persona.opinion;
                document.getElementById("btnActualizar").value = persona.id;
            });
            let botonDEL = document.getElementById("DEL" + persona.id);
            botonDEL.addEventListener("click", () => {
                if (confirm("Seguro de eliminar Nombre:" + persona.nombre + " " + persona.apellido)) {
                    eliminarPersona(persona.id).then(() => {
                        alert("eliminado con exito");
                        cargarDatos();
                    });
                }
            });
        });
    });
};

const actualizar = () => {
    // recupere elemento
    let eNombre = document.getElementById("UPDnombre");
    let eApellido = document.getElementById("UPDapellido");
    let eContraseña = document.getElementById("UPDcontraseña");
    let eDate = document.getElementById("UPDfecha");
    let eSexo = document.getElementsByClassName("UPDsexo");
    let eCategoria = document.getElementById("UPDcategoria");
    let eBici = document.getElementById("UPDbicicleta");
    let eOpinion = document.getElementById("UPDopinion");
    // recuperamos valor
    let vNombre = eNombre.value;
    let vApellido = eApellido.value;
    let vContraseña = eContraseña.value;
    let vDate = eDate.value;
    let vSexo = obtenerValorRadio(eSexo);
    let vCategoria = eCategoria.value;
    let vBici = eBici.value;
    let vOpinion = eOpinion.value;
    // creamos objeto
    let objeto = {nombre: vNombre, apellido: vApellido,contraseña:vContraseña, fecha: vDate, sexo: vSexo, categoria: vCategoria, bici: vBici, opinion: vOpinion};
    let id = document.getElementById("btnActualizar").value;
    console.log(objeto);
    actualizarPersona(objeto, id).then(() => {
        alert("actualizado con exito");
        cargarDatos();
    });
};

