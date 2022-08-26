// Campos del form
const mascotaInput = document.querySelector("#mascota");
const propietarioInput = document.querySelector("#propietario");
const telefonoInput = document.querySelector("#telefono");
const fechaInput = document.querySelector("#fecha");
const horaInput = document.querySelector("#hora");
const sintomasInput = document.querySelector("#sintomas");

// UI
const formulario = document.querySelector("#nueva-cita");
const contenedorCitas = document.querySelector("#citas");

let editando;

// Constructor UI no tiene, pero Citas si porque va a ser un array de citas.

class Citas {
    constructor (){
        this.citas = [];
    }

    agregarCita(cita){
        this.citas = [...this.citas, cita];

        console.log(this.citas);
    }

    eliminarCita(id){
        this.citas = this.citas.filter ( cita => cita.id  !== id );
    }
    //En este caso usamos .map, porque filter quita un elemento o los demas y deja un elemento basado en una condición, en este caso es edicion, .map a diferencia de forEach, ambos recorren los elementos del arreglo, pero .map crea un nuevo arreglo, por lo tanto reescribe lo que tengamos en cita. Retorna un nuevo arreglo que lo asignamos a cita
    //citaActualizada para q las variables no se llamen igual
    editarCita(citaActualizada){ 
        //Iteramos en cada una de las citas, verifica que la cita actualizada y la cita actual tengan el mismo id, en caso que esa condicion se cumpla se reescribe todo el objeto de la cita con la cita actualizada que es lo que le pasamos que viene desde editarCita y en caso que sea el mismo reescribimos todo ese objeto, caso contrario mantenemos la cita actual.
        this.citas = this.citas.map ( cita => cita.id === citaActualizada.id ? citaActualizada : cita )

    }

}

class UI {

    imprimirAlerta(mensaje , tipo){
        // Crear el div - bootstrap
        const divMensaje = document.createElement("div");
        divMensaje.classList.add("text-center", "alert" , "d-block", "col-12");

        // Agregar clase en base al tipo de error
        if( tipo === "error" ) {
            divMensaje.classList.add("alert-danger");
        } else {
            divMensaje.classList.add("alert-success");
        }

        // Mensaje de error
        divMensaje.textContent = mensaje;

        // Agregar al DOM
        document.querySelector("#contenido").insertBefore(divMensaje, document.querySelector(".agregar-cita"));

        // Quitar la alerta después de 2 segundos
        setTimeout( () => {
            divMensaje.remove();
        }, 2000 );
    }

    imprimirCitas({citas})  {  //hacemos distructuring desde el parametro
       //console.log(citas);

       this.limpiarHTML(); // Para que no repita el html anterior

       citas.forEach( cita => {
        const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

        const divCita = document.createElement("div");
        divCita.classList.add("cita", "p-3");
        divCita.dataset.id = id; //Agregamos el id como atributo personalizado
        
        //Scripting de los elementos de la cita
        const mascotaParrafo = document.createElement("h2");
        mascotaParrafo.classList.add("card-title", "font-weight-bolder");
        mascotaParrafo.textContent = mascota;

        const propietarioParrafo = document.createElement("p");
        propietarioParrafo.innerHTML = `
            <span class="font-weight-bolder"> Propietario: </span> ${propietario}
        `;

        const telefonoParrafo = document.createElement("p");
        telefonoParrafo.innerHTML = `
            <span class="font-weight-bolder"> telefono: </span> ${telefono}
        `;

        const fechaParrafo = document.createElement("p");
        fechaParrafo.innerHTML = `
            <span class="font-weight-bolder"> fecha: </span> ${fecha}
        `;

        const horaParrafo = document.createElement("p");
        horaParrafo.innerHTML = `
            <span class="font-weight-bolder"> hora: </span> ${hora}
        `;

        const sintomasParrafo = document.createElement("p");
        sintomasParrafo.innerHTML = `
            <span class="font-weight-bolder"> sintomas: </span> ${sintomas}
        `;

        //Boton para eliminar cita
        const btnEliminar = document.createElement("button");
        btnEliminar.classList.add("btn", "btn-danger", "mr-2");
        btnEliminar.innerHTML = 'ELIMINAR <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"> <path stroke-linecap="round" troke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /> </svg> ' //heroicon
        
        btnEliminar.onclick = () => eliminarCita(id); //le paso el id

        //Añadir boton editar
        const btnEditar = document.createElement("button");
        btnEditar.classList.add("btn", "btn-info", "mr-2");
        btnEditar.innerHTML = ' Editar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"> <path stroke-linecap="round" troke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /> </svg> ';

        btnEditar.onclick = () => cargarEdicion(cita); //le paso la cita completa

        //Agregar los parrafos al divCita
        divCita.appendChild(mascotaParrafo);
        divCita.appendChild(propietarioParrafo);
        divCita.appendChild(telefonoParrafo);
        divCita.appendChild(fechaParrafo);
        divCita.appendChild(horaParrafo);
        divCita.appendChild(sintomasParrafo);
        divCita.appendChild(btnEliminar);
        divCita.appendChild(btnEditar);
           
        //Agrega las citas al HTML
        contenedorCitas.appendChild(divCita);
       } )
    }

    limpiarHTML(){
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild( contenedorCitas.firstChild )
        }
    }
       
}

const ui = new UI ();
const administrarCitas = new Citas();

// Registrar eventos
eventListeners();
function eventListeners(){
    mascotaInput.addEventListener("input" , datosCita);
    propietarioInput.addEventListener("input" , datosCita);
    telefonoInput.addEventListener("input" , datosCita);
    fechaInput.addEventListener("input" , datosCita);
    horaInput.addEventListener("input" , datosCita);
    sintomasInput.addEventListener("input" , datosCita);

    formulario.addEventListener("submit" , nuevaCita);
    
}

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
function datosCita(e){
   //console.log(e.target.name); //name -> atributo del html
   citaObj[e.target.name] = e.target.value
   //console.log(citaObj)

}


// Valida y agrega una nueva cita a la clase de citas
function nuevaCita(e){
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

function reiniciarObj() {
    citaObj.mascota = "";
    citaObj.propietario = "";
    citaObj.telefono = "";
    citaObj.fecha = "";
    citaObj.hora = "";
    citaObj.sintomas = "";

}

function eliminarCita(id){
    //console.log(id)
    //Eliminar la cita
    administrarCitas.eliminarCita(id);

    //Mensaje
    ui.imprimirAlerta("La cita se eliminó correctamente");

    //Refrescar las citas
    ui.imprimirCitas(administrarCitas);
}

// Carga los datos y el modo edición
function cargarEdicion(cita){
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
