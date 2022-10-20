import Citas from "./classes/Citas.js";
import UI from "./classes/Ui.js";

import { 
    mascotaInput,
    propietarioInput,
    telefonoInput,
    fechaInput,
    horaInput,
    sintomasInput,
    formulario
 } from "./selectores.js"


// Constructor UI no tiene, pero Citas si porque va a ser un array de citas.

const ui = new UI ();
const administrarCitas = new Citas();

let editando = false;

// Objeto con la info de la cita
const citaObj = {
    mascota: "",
    propietario: "",
    telefono: "",
    fecha: "",
    hora: "",
    sintomas: ""
}
// Agregar datos al obj de cita
export function datosCita(e){
    //console.log(e.target.name); //name -> atributo del html
    citaObj[e.target.name] = e.target.value
    //console.log(citaObj)
 
 }
 
 // Valida y agrega una nueva cita a la clase de citas
export function nuevaCita(e){
    e.preventDefault(); //Porque es un submit!

    // Extraer la información del obj de cita
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    // Validar
    if( mascota === "" || propietario === "" || telefono === "" || fecha === "" ||hora === "" || sintomas === "" ) {
        ui.imprimirAlerta ("Todos los campos son obligatorios" , "error");

        return; // -> para que no se ejecute la siguiente linea
    }

    if (editando){
        console.log("Modo edición");
        ui.imprimirAlerta("Se editó correctamente");

        //Pasar el objeto de la cita a edición
        administrarCitas.editarCita({...citaObj})//no le pasamos el objeto completo sino una copia


        //Regresar el texto del botón
        formulario.querySelector('button[type="submit"]').textContent = "CREAR CITA";

        //Quitar modo edición
        editando = false;

    } else {
        console.log("Modo nueva cita");
        // Generar un id unico
        citaObj.id = Date.now();

        // Creando nueva cita, le pasamos una copia del anterior, sino queda repetido el ultimo administrarCitas.agregarCita(citaObj);
        administrarCitas.agregarCita({...citaObj});

        //mensaje de agregado correctamente
        ui.imprimirAlerta("Se agregó correctamente");

    }


    
    // Reiniciar form pero el objeto sigue lleno. Hacemos funcion de reinicarOjb
    formulario.reset();

    // Reinicar objeto para la validación
    reiniciarObj();

    // Mostrar el HTML de las citas
    ui.imprimirCitas(administrarCitas);

}

export function reiniciarObj() {
    citaObj.mascota = "";
    citaObj.propietario = "";
    citaObj.telefono = "";
    citaObj.fecha = "";
    citaObj.hora = "";
    citaObj.sintomas = "";

}

export function eliminarCita(id){
    //console.log(id)
    //Eliminar la cita
    administrarCitas.eliminarCita(id);

    //Mensaje
    ui.imprimirAlerta("La cita se eliminó correctamente");

    //Refrescar las citas
    ui.imprimirCitas(administrarCitas);
}

// Carga los datos y el modo edición
export function cargarEdicion(cita){
    //console.log(cita);
    //Extraer la información del obj de cita
    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    //Llenar inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    //Llenar el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    //Cambiar texto del botón
    formulario.querySelector('button[type="submit"]').textContent = "Guardar cambios";

    editando = true;

}
