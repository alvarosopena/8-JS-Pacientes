import { eliminarCita, cargarEdicion } from "../funciones.js";
import { contenedorCitas } from "../selectores.js";

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
export default UI;