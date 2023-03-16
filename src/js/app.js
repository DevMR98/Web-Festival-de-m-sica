document.addEventListener('DOMContentLoaded', () => {
    initApp();
    //scrollNap();
});

const initApp=(()=>{
    crearGaleria();
    navegacionFija();
} );

const crearGaleria=(()=>{
    const $galeria = document.querySelector('.galeria-imagenes');
    for (let i = 1; i <= 12; i++) {
        const $imagen = document.createElement('picture');
        $imagen.innerHTML = `
        <source src="build/img/thumb/${i}.avif" type="img/avif">
        <source src="build/img/thumb/${i}.webp" type="img/webp">
        <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen vocalista">`;
        //console.log($imagen);
        $galeria.appendChild($imagen);

        $imagen.addEventListener('click',()=>{
            mostrarImagen(i);
        });
    }
});

//mostrar la imagen en grande de la seccion de galeria
const mostrarImagen=((id)=>{
    //console.log("mostrando..",id);
    const $imagen = document.createElement('picture');
    $imagen.innerHTML = `
        <source src="build/img/grande/${id}.avif" type="img/avif">
        <source src="build/img/grande/${id}.webp" type="img/webp">
        <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen galeria">`;

    //crea el overlay con la imagen
    const $overlay=document.createElement('div');
    $overlay.appendChild($imagen);
    $overlay.classList.add('overlay');

    //añade el overlay al body en html
    const $body=document.querySelector('body');
    $body.appendChild($overlay);
    $body.classList.add('fijar-body');

    //ventana modal
    const $cerrarModal=document.createElement('p');
    $cerrarModal.textContent='X';
    $cerrarModal.classList.add('btn-cerrar');
    $overlay.appendChild($cerrarModal);
    $cerrarModal.addEventListener('click',()=>{
        const $body=document.querySelector('body');
        $body.classList.remove('fijar-body');
        $overlay.remove()
    } );

});

/* No funciono ademas ya hay una manera de hacerlo nativamente con css scroll-behaviour:"smooth"
const scrollNap=(()=>{
    const $enlaces=document.querySelectorAll('.navegacion-principal a')
    $enlaces.forEach(enlaces=>{
        enlaces.addEventListener('click',e=>{
            e.preventDefault();
            const seccionScroll=e.target.attributes.href.value;
            const $seccion=document.querySelector(seccionScroll);  
            $seccion.scrollIntoView({behaviour:'smooth'}); 
        });
    })
});*/

const navegacionFija=(()=>{
    const $barra=document.querySelector('.header');
    const $sobreFestival=document.querySelector('.sobre-festival');
    const $body=document.querySelector('body');

    window.addEventListener('scroll',()=>{
        if ($sobreFestival.getBoundingClientRect().bottom<0) {
        //console.log("ya pasamos el elemento")
        $barra.classList.add('fijo');
        $body.classList.add('body-scroll');
    } else {
        //console.log("No hemos pasado el elemento")
        $barra.classList.remove('fijo');
        $body.classList.remove('body-scroll');     
    }
    });

    
})