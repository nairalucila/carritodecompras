//variables

const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');



//listeners

cargarEventListeners();

function cargarEventListeners(){
    //se dispara cuando se presiona "agregar carrito"
cursos.addEventListener('click', comprarCurso);


//cuando se elimina un curso del carrito
carrito.addEventListener('click', eliminarCurso)

//al vaciar carrito
vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

//al cargar el doc, mostrar ls

document.addEventListener('DOMContentLoaded', leerLocalStorage);

}




//funciones
//funcion que agrega curso al carrito
function comprarCurso(e){
 e.preventDefault();
 //delegation para agregar carrito

 if(e.target.classList.contains('agregar-carrito')){
     const curso = e.target.parentElement.parentElement;
     //acá lo que hizo es seleccionar una parte del interior de la card del curso
     //se tiene que seleccionar toda la cart, por esto, hizo el segundo parent element,
     //para llegar al padre anterior, ahi ya selecciono toda la card

     leerDatosCursos(curso);
     //esta funcion va recibir la info de curso y va a leerla.
 }  //se envian los cursos seleccionados pa tomar datos

 
}
//leer datos del curso
function leerDatosCursos(curso){

const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio:  curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),

}

insertarCarrito(infoCurso);
   
}

//muestra el curso seleccionado en el carrito
function insertarCarrito(curso){
    //se inserta dentro de la tag tbody

    const row = document.createElement("tr");
    row.innerHTML = `
        <td> 
        
        <img src="${curso.imagen}"> 
        
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
     `;
    listaCursos.appendChild(row);
    //a la tabla donde van los cursos > agrega un hijo > el row 

    guardarCursoLocalStorage(curso);
}


function eliminarCurso(e){

    e.preventDefault();
    
    let curso,
        cursoId;

    if(e.target.classList.contains('borrar-curso')){
       
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoId = curso.querySelector('a').getAttribute('data-id');

        
        console.log(cursoId);

    }
    eliminarCursoLocalStorage(cursoId);
};

//elimina cursos en el dom
function vaciarCarrito(){
    //forma lenta
    //listaCursos.innerHTML = "";

    //forma rápida recomendada
    // pasa un parametro listaCursos.firstchild 
    //hace ciclo hasta que no hay mas nada
    
    while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild);
    }
     
// vaciar local storage con btn vaciar todo

vaciarLocalStorage();

return false
}

//almacenar cursos en local storage

function guardarCursoLocalStorage(curso){
     let cursos;
    // toma el valor de un arreglo con dato o vacio en ls
     cursos = obtenerCursosLocalStorage();

     cursos.push(curso); //el curso seleccionado se agrega al arreglo
 
     localStorage.setItem('cursos', JSON.stringify(cursos));
}

 //comprobar algo si hay algo en locals

function obtenerCursosLocalStorage(){
 
    let cursosLS;
 
 if(localStorage.getItem('cursos')=== null ){
     cursosLS = [];
 
} else {
    cursosLS = JSON.parse(localStorage.getItem('cursos'));

 }
 return cursosLS
}

//imprime cursos ls en el carrito

function leerLocalStorage(){

    let cursosLS;
     
    cursosLS = obtenerCursosLocalStorage();

    cursosLS.forEach(function(curso){
        //construir el template
        const row = document.createElement("tr");
        row.innerHTML = `
            <td> 
            
            <img src="${curso.imagen}"> 
            
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
            </td>
         `;
        listaCursos.appendChild(row);

    });

}

//eliminar curso por ID por el localStorage

function eliminarCursoLocalStorage(curso){
    
    let cursosLS;
    //obtenemos el arreglo de cursos
    
    cursosLS = obtenerCursosLocalStorage();
    //iteramos comparando el ID del curso borrado  en carrito c/ los de LS
    cursosLS.forEach(function(cursoLS, index){
       
        if(cursoLS.id === curso){
            cursosLS.splice(index, 1);
        }
    });
    //añadir arreglo actual local storage

    localStorage.setItem('cursos', JSON.stringify(cursosLS));
}

//funcion de vaciado completo de carrito de ls
function vaciarLocalStorage(){
    localStorage.clear();
}