import {  registrarPersona } from "./promesas.js";

window.addEventListener("load", () => {
    document.getElementById("btnregistrar").addEventListener("click", registrar);

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

//funcion para registrar personas se recuperan elementos se agrega valor y se crea el objeto
const registrar = () => {
    let eNombre = document.getElementById("nombre");
    let eApellido = document.getElementById("apellido");
    let eContraseña = document.getElementById("contraseña");
    let eFecha = document.getElementById("fecha");
    //uso la funcion class name porque al ser dos valores distintos debo meterlos en una clase ya que el id es solo para 1
    let eSexo = document.getElementsByClassName("sexo");
    let eCategoria = document.getElementById("categoria");
    let eBici = document.getElementById("bici");
    let eOpinion = document.getElementById("opinion");
    //luego de definir y recuperar los elementos le agrupamos el valor
    let vNombre = eNombre.value;
    let vApellido = eApellido.value;
    let vContraseña = eContraseña.value;
    let vFecha = eFecha.value;
    //utilizamos la funcion general de validaciones del radio
    let vSexo = obtenerValorRadio(eSexo);
    let Vcategoria = eCategoria.value;
    let vBici = eBici.value;
    let vOpinion = eOpinion.value;

    //agrego una validacion para los campos (espero crear otra funcion que valide cada data ingresado al form)

    if (vNombre === "" || vApellido === "" || vContraseña === "" || vFecha === "" || vSexo === null || Vcategoria === "" || vBici === "" || vOpinion === "") {
        alert("Debe llenar todos los campos");
        return;
    }

    //creamos el objeto
    let objeto = {
        nombre: vNombre,
        apellido: vApellido,
        contraseña:  vContraseña,
        fecha: vFecha,
        sexo: vSexo,
        categoria: Vcategoria,
        bici: vBici,
        opinion: vOpinion,
    };
    console.log(objeto);

    registrarPersona(objeto).then(()=>{
        alert("Registro Completado");
    }).catch((r)=>{
        alert("Hubo un error:"+ r );
    });

};