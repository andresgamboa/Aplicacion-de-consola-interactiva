const inquirer = require('inquirer'); 
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tarea`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            }

        ]
    }
];

const inquirerMenu = async() => {

    console.clear();
    console.log('========================='.green);
    console.log('  Seleccione la opcion: '.white);
    console.log('=========================\n'.green);

    const {opcion} = await inquirer.prompt(preguntas);  //desestructuro el objeto para retornarlo como resultado de la promesa

    return opcion;
}

 const pausa = async() => {

    const question = [
        {
            type: 'input',
            name: 'OpcionPause',
            message: `Presione ${'ENTER'.green} para continuar`
        }

    ]

    console.log('\n');
    await inquirer.prompt(question)

}

const leerInput = async( message ) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ){
                if(value.length === 0){
                    return 'Por favor ingrese un valor'
                }
                return true;
            }

        }
    ];

    const {desc} = await inquirer.prompt(question);
    return desc;
}

const listadoTareasBorrar = async( tareas = [] ) => {

    const choices = tareas.map( (tarea ,i) => {

        const idx = `${ i +1 }.`.green

        return{
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });  //la funcion .map transforma los valores del arreglo actual, a los que yo quiera

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'       //Propiedad para añadir un objeto al principio, esto para poder añadir el boton cancelar dentro de la lista de borrados

    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Tarea a borrar',
            choices
        }
    ];

    const {id} = await inquirer.prompt(preguntas); //Realizo el menu didactico para la seleccion de la tarea a borrar
    
    return id;
}

const confirmar = async( message ) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const {ok} = await inquirer.prompt(question); //REALIZO LA INTERFAZ PARA CONFIRMAR SI DESEAN BORRAR, CONFIRM ME RETORNA UN VALOR BOOLEANO

    return ok;

}


const mostrarListadoCheckList = async( tareas = [] ) => {

    const choices = tareas.map( (tarea ,i) => {

        const idx = `${ i +1 }.`.green

        return{
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false //se hace la validacion para ver que tareas ya estan completadas y no me las marque en la consola como completadas
        }
    });  //la funcion .map transforma los valores del arreglo actual, a los que yo quiera

    const pregunta = [
        {
            type: 'checkbox',  //me regresa un arreglo con todos los id´s seleccionados
            name: 'ids',
            message: 'Selecciones: ',
            choices,
        }
    ];

    const {ids} = await inquirer.prompt(pregunta); //Realizo el menu didactico para la seleccion de la tarea a borrar
    
    return ids;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
}