require('colors');  
const { inquirerMenu,
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoCheckList } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');



const main = async() =>{


    let opt = '';
    const tareas = new Tareas();

    const tareaDB = leerDB();

    if( tareaDB ){
        tareas.cargarTareasFromArray(tareaDB);  //CARGAR TAREAS
    }

    do {
        
        opt = await inquirerMenu(); //esta funcion imprime el menu, y almacena la respuesta en una variable llamada opt que tenia un string vacio

        switch (opt) {
            case '1': //Crear opcion
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea( desc );
            break;
            

            case '2': //muestra el listado de todas las tareas, pendientes o completadas
                tareas.listadoCompleto();
            break;


            case '3':   //LISTA LAS TAREAS COMPLETADAS
                tareas.listarPendientesCompletadas();
            break;


            case '4':   //LISTA LAS TAREAS PENDIENTES
                tareas.listarPendientesCompletadas(false);
            break;


            case '5':  //COMPLETADO || PENDIENTE
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
            break;


            case '6':   //BORRA LAS TAREAS
                const id = await listadoTareasBorrar(tareas.listadoArr); 

                if(id !== '0'){
                    const confirmarBorrado = await confirmar('¿Está seguro de borrar la tarea?: ' );
                    if(confirmarBorrado){
                        tareas.borrarTarea(id);
                        console.log('\nLa tarea fue borrada existosamente '.green);
                    }
                }
            break;
        }
        
        guardarDB( tareas.listadoArr );   

        await pausa ();
        
    } while (opt !== '0');

    
    // pausa(); 

}

main();