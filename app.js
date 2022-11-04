// variables

const carrito = document.querySelector('#carrito');

const contenedorCarrito = document.querySelector('#lista-carrito tbody');

const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')

const listaCursos = document.querySelector('#lista-cursos');

let articulosCarrito = [];

cargarEventListenners();
function cargarEventListenners() {
    // cuando agregas un curso presionando "agregar al carrito"
    listaCursos.addEventListener('click', agregarcurso);

    // Elimina cursos del carrito

    carrito.addEventListener('click', eliminarCurso);

    //vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // reseteamos el arreglo

        limipiarHTML(); // eliminamos todo el html
    })
}



// Funciones
function agregarcurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}
//parentElement para acceder a los padres en el curso

//Elimina un curso del carrito
function eliminarCurso(e) {
    /*console.log(e.target.getAttribute('data-id')) se sabe cual es id del curso a eliminar*/
    const cursoId = e.target.getAttribute('data-id')
    //elimina del arreglo por el data id.

    articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

    carritoHTML(); //iterar sobre el carrito y mostrar su html
}

// Leer el contenido del HTML al que le dimos click y extrae la informacion

function leerDatosCurso(curso) {


    ///crear un objeto con ek curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1

    }
    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        //Atualizamos a cantidad
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; // retorna el objeto actualizado
            } else {
                return curso; // retorna los objetos que no son duplicados
            }
        });

        articulosCarrito = [...cursos];

    } else {
        //Agregamos al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }



    // Agregar elementos al arreglo

    console.log(articulosCarrito)

    carritoHTML();
}

// muestra el carrito de compras en el HTML

function carritoHTML() {
    //limipiar el html
    limipiarHTML();



    // REcorre el carrito y genera el html
    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        
        <td>  <img src="${imagen}" width="100" > </td>
        <td>  ${titulo} </td>
        <td>  ${precio} </td>
        <td>  ${cantidad} </td>
        <td>
            <a href="#" class= "borrar-curso" data-id="${id}" > X </a>
        </td>
        `;
        //Agregar el html en el carrito en el tbody

        contenedorCarrito.appendChild(row);


    })
}

//Elimina los cursos del tbody
//forma lenta
function limipiarHTML() {
    //    contenedorCarrito.innerHTML = ''
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }

}