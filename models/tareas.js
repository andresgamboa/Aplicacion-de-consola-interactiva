const Tarea = require('./tarea');

class Tareas{

    _listar = {};

    get listadoArr() {

        const listado = [];

        Object.keys(this._listar).forEach(keys => { // Se hace un barrido de cada llave del objeto _listar, luego haciendo uso de javascript, le digo que forEach o para cada uno, lo inserto en el arreglo que voy a retornar
            
            const tarea = this._listar[keys];  //extraigo las llaves del objeto _listar para insertarlas en el arreglo
            listado.push( tarea )   //inserto al arreglo vacio
        })



        return listado;


    }

    constructor(){
        this._listar = {};
    }

    borrarTarea( id='' ) {

        if( this._listar[id] ){
            delete this._listar[id];
        }
    }

    cargarTareasFromArray( tareas = [] ) {

        tareas.forEach( tarea => {
            this._listar[tarea.id] = tarea;
        });
    }

    crearTarea ( desc = '') {

        const tarea = new Tarea (desc)
        this._listar[tarea.id] = tarea;
    }

    listadoCompleto(  ){

        console.log();

        this.listadoArr.forEach( (tarea,i) => {

            const idx = `${i + 1}`.green;
            const {desc,completadoEn} = tarea;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;

            console.log(`${idx} ${desc} :: ${estado}`);
            


        });
    }

    listarPendientesCompletadas( completadas = true ) {

        console.log();
        let contador = 0;

        this.listadoArr.forEach((tarea) => {

            const {desc, completadoEn} = tarea;
            const estado = (completadoEn) ? 'Completada'.green  : 'Pendiente'.red;

            if(completadas){
                //Me muestra las tareas completadas
                if(completadoEn){
                    contador += 1;
                    console.log(`${ contador.toString().green }${'.'.green} ${desc} :: ${completadoEn.green} `);
                }
            }else{
                //Me muestra las tareas pendientes
                if(!completadoEn){
                    contador += 1;
                    console.log(`${ contador.toString().green }${'.'.green} ${desc} :: ${estado} `);
                }
            }
            
        });
    }

    toggleCompletadas ( ids = []){

        ids.forEach( id => {
            
            const tarea = this._listar[id];

            if( !tarea.completadoEn ){
                tarea.completadoEn = new Date().toISOString();
            }

            this.listadoArr.forEach ( tarea => {

                if ( !ids.includes(tarea.id)){  //al preguntar que si en ids no me incluye lo que hay en tarea.id, debe pasar su estado a null = incompleta
                    // const tarea = this._listar[id];
                    // tarea.completadoEn = null;

                    this._listar[tarea. id].completadoEn = null; //significa lo mismo que las 2 lineas comentadas de arriba
                
                }
            });
        });

    }
}


module.exports = Tareas;