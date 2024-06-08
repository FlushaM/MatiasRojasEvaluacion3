import {  registrarPersona , obtenerPersonas , actualizarPersona, eliminarPersona } from "./promesas.js";


//agregamos eventos a los botones al cargar la pagina
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

//cambiamos el contraste usando cambio de clases
const cambiarContraste = () => {
    document.body.classList.toggle("contraste");
}
//lo mismo para la fuente , cambiamos las clases
const cambiarFuente = () => {
    document.body.classList.toggle("fuente-alternativa");
}
//funcion general para validar los datos ingresados en el formulario , tomando los valores y haciendo validaciones
const validarFormulario = () =>{
    
    let eNombre = document.getElementById("UPDnombre").value;
    let eApellido = document.getElementById("UPDapellido").value;
    let eContraseña = document.getElementById("UPDcontraseña").value;
    let eDate = document.getElementById("UPDfecha");
    let eSexo = obtenerValorRadio(document.getElementsByName("UPDsexo"));
    let eCategoria = document.getElementById("UPDcategoria").value;
    let eBici = document.getElementById("UPDbicicleta").value;
    let eOpinion = document.getElementById("UPDopinion");

    if (eNombre === "" || eApellido === "" || eContraseña === "" || eDate === "" || eSexo === null || eCategoria === "" || eBici === "" || eOpinion === ""){
        alert("Debe llenar todos los campos");
        return false;
    }
    return true;

};

//funcion para registrar personas se recuperan elementos se agrega valor y se crea el objeto
const registrar = () => {
    //llamamos la funcion de validacion<
    if (!validarFormulario()) return;

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
    registrarPersona(objeto).then(() => {
        alert("Registro exitoso");
        cargarDatos();
        registerForm.reset(); //con esta funcion limpiamos el formulario
         
    }).catch((r) => {
        alert("algo ocurrio");
        alert(r);
    });

    let id = document.getElementById("btnActualizar").value;
    actualizarPersona(objeto, id).then(() => {
        alert("actualizado con exito");
        cargarDatos();
        registerForm.reset(); //con esta funcion limpiamos el formulario
    });
};


//funcion que carga los datos de los ciclistas en la tabla utilizando su id #tdDatos
const cargarDatos = () => {
    obtenerPersonas().then((personas) => {
        //alamcenamos cicclistas
        let estructura = "";
        //iteramos en la lista para construir la tabla
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
                        registerForm.reset(); //con esta funcion limpiamos el formulario
                    });
                }
            });
        });
    });
};


//en esta funcion reutilizamos la estructura del registro , y tambien el mismo form usando las mismas id o class en caso del sexo
const actualizar = () => {
    if (!validarFormulario()) return;
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
        registerForm.reset(); //con esta funcion limpiamos el formulario
    });
};

