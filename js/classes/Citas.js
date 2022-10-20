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

export default Citas;