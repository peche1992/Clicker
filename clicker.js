// LO QUE SE ME HA OCURRIDO PARA AUDIO SEMIAUTOMATICO.
const cualquierlugar = document.getElementsByTagName("body")
const audiohome = document.getElementById('audiohome');
cualquierlugar[0].addEventListener('click', function() {
        audiohome.play();
});
//! VARIABLES DE LA PANTALLA DE MEJORAS
let comprardaño=document.getElementById("comprar_mejora_daño");

//*Aqui van a ir el texto que informa de daño y oro.
let textdaño = document.getElementById("texto-daño-actual");
let textdaño_oro = document.getElementById("texto-daño-actual_oro");


//! TODA LA PARTE DE CAMBIAR DE PANTALLA
const home=document.getElementsByClassName("returnhome")
const viajemejoras=document.getElementById("viaje-hab")
const viajeboss=document.getElementById("viaje-boss")
const viajeheroes=document.getElementById("viaje-heroes")
const viajecompras=document.getElementById("viaje-compras")
const viajeconfiguracion=document.getElementById("viaje-configuracion")
const viajeclasificacion=document.getElementById("viaje-clasificacion")

//RECOGER LOS ZTIPE DE LOS DIVS
const fondos = {
    home: document.getElementById("fondo-home"),
    mejoras: document.getElementById("fondo-mejoras"),
    boss: document.getElementById("fondo-boss"),
    heroes: document.getElementById("fondo-heroes"),
    compras: document.getElementById("fondo-compras"),
    configuracion:document.getElementById("fondo-configuracion"),
    clasificacion:document.getElementById("fondo-clasificacion")

};

const zIndices = {
    zIndexHome: window.getComputedStyle(fondos.home).zIndex,
    zIndexMejoras: window.getComputedStyle(fondos.mejoras).zIndex,
    zIndexBoss: window.getComputedStyle(fondos.boss).zIndex,
    zIndexHeroes: window.getComputedStyle(fondos.heroes).zIndex,
    zIndexCompras: window.getComputedStyle(fondos.compras).zIndex,
    zIndexConfiguracion: window.getComputedStyle(fondos.configuracion).zIndex,
    zIndexClasificacion: window.getComputedStyle(fondos.clasificacion).zIndex

};

// AQUI ES DONDE VAMOS A DAR LOS VALORES A TODOS LOS ZINDEX
function actualizarzIndex (zIndexHome, zIndexMejoras, zIndexBoss, zIndexHeroes, zIndexCompras, zIndexConfiguracion, zIndexClasificacion){
    fondos.home.style.zIndex = zIndexHome;          //0
    fondos.mejoras.style.zIndex = zIndexMejoras;    //1
    fondos.boss.style.zIndex = zIndexBoss;          //2
    fondos.heroes.style.zIndex = zIndexHeroes       //3
    fondos.compras.style.zIndex=zIndexCompras       //4   
    fondos.clasificacion.style.zIndex=zIndexClasificacion       //5   
    fondos.configuracion.style.zIndex=zIndexConfiguracion       //6      
}

//HOME
for(let listahome=0;listahome<home.length;listahome++){
    home[listahome].addEventListener("click",function(){
        actualizarzIndex(1,0,0,0,0,0,0)
    }
)}

// VIAJES DESDE EL HOME.
    //VIAJE A LAS MEJORAS.
viajemejoras.addEventListener("click",function(){
    actualizarzIndex(0,1,0,0,0,0,0)
    })

    // VIAJE A LOS BOSSEs.
viajeboss.addEventListener("click",function(){
    actualizarzIndex(0,0,1,0,0,0,0)
})

    //VIAJE A LOS HEROES
viajeheroes.addEventListener("click",function(){
    actualizarzIndex(0,0,0,1,0,0,0)
    })

//VIAJE A LOS COMPRAS
viajecompras.addEventListener("click",function(){
    actualizarzIndex(0,0,0,0,1,0,0)
    })

//VIAJE A LA CONFIGURACION.
viajeconfiguracion.addEventListener("click",function(){
    actualizarzIndex(0,0,0,0,0,1,0)
    })

//VIAJE A LA CLASIFICACION.
viajeclasificacion.addEventListener("click",function(){
    actualizarzIndex(0,0,0,0,0,0,1)
    })

const boss=document.getElementById("boss")


let barrainicial = 60;
let vidainicial = 10;
const anchovida = 60;

let saludinicial = 10;
let saludqueda = 10;

let contadormuertos=0;
let contadormuertosboss=0;

let daño= 1;

let puntuacion_oro=1;
document.querySelector(".oro-texto").innerText =puntuacion_oro;

// let puntuacion = parseInt(document.querySelector(".oro-texto").innerText,10);
let multPuntuacion = parseInt(document.querySelector(".mult-puntos-texto").innerText,10);

const slimes= ["Monstruos/slimes/0 (1).png","Monstruos/slimes/0 (2).png","Monstruos/slimes/0 (3).png",
               "Monstruos/slimes/0 (4).png","Monstruos/slimes/0 (5).png","Monstruos/slimes/0 (6).png",
               "Monstruos/slimes/0 (7).png","Monstruos/slimes/0 (8).png","Monstruos/slimes/0 (9).png",
               "Monstruos/slimes/0 (10).png","Monstruos/slimes/0 (11).png","Monstruos/slimes/0 (12).png",
               "Monstruos/slimes/0 (13).png","Monstruos/slimes/0 (14).png","Monstruos/slimes/0 (15).png",
]

const bossesEspeciales = ["bossesp1.png"]
let boss10aparecer= false;
let boss10ejecutado =false;

const bossesfinales = []
listabossessinusar=[].concat(slimes);




//* FUNCION DE DAÑO AL HACER CLICK.
boss.addEventListener("click",function(){
    //SONIDO AL GOLPEAR ESPADA.
    let hit =  document.getElementById("hit1");
    hit.play();

    //BAJAR LA BARRA DE VIDA.
    let barra=document.getElementById("salud");
    barrainicial -= (daño*anchovida)/vidainicial;
    barra.style.width= barrainicial+"%";
    saludqueda-=daño;
    //BAJAR PUNTOS DE VIDA
    document.getElementById("salud-tiene-texto").textContent=saludqueda.toFixed(2);
    document.getElementById("salud-total-texto").textContent=saludinicial.toFixed(2);

    muerteboss();
})


//* FUNCION DE DAÑO CONTINO, DEBE SER COMO LA DE HACER CLICK.
function dañocontinuo(damage){
    let barra=document.getElementById("salud");
    damage = daño*0.1
    barrainicial -= (damage*anchovida)/vidainicial;
    barra.style.width= barrainicial+"%";
    saludqueda-=damage;
    //BAJAR PUNTOS DE VIDA
    document.getElementById("salud-tiene-texto").textContent=saludqueda.toFixed(2);
    document.getElementById("salud-total-texto").textContent=saludinicial.toFixed(2);
    // CONDICIONES CUANDO MUERE EL BOSS.
    muerteboss()
}

//* CONDICIONES CUANDO MUERE EL BOSS.
//? AQUI VOY A IR DEJANDO LAS FUNCIONES
const dañocontinuorep = setInterval(function() {
    dañocontinuo(daño);}, 500);

function muerteboss(){ 

    let aleatorio = Math.floor(Math.random()*listabossessinusar.length);
        if (saludqueda<=0){  
            boss.src = listabossessinusar[aleatorio];  

        //ELIMINAR EL BOSS DE LA LISTA NORMAL PARA QUE NO SE REPITAN.
        listabossessinusar.splice(aleatorio,1);     
        
            if (listabossessinusar.length===0){
                listabossessinusar=[].concat(slimes);
            }

                //!BOSS ESPECIAL 10
                    if (boss10aparecer===false && contadormuertos === 9){
                        boss.src = bossesEspeciales[0];
                        let boss1grito =  document.getElementById("gritoboss1");
                        boss1grito.play();
                        boss10aparecer =true;}

                    if (boss10aparecer===true && saludqueda<=0 && contadormuertos===10){
                        contadormuertosboss+=1;
                        boss10ejecutado = true;
                        boss10aparecer = false;
                        alert("Enhorabuena, has matado al elemental de sombra."); 
                        puntuacion_oro+=10;
                        multPuntuacion = multPuntuacion*10;
                    }  
           
            barrainicial=60;
            saludinicial+=1;
            vidainicial+=1;
            saludqueda=saludinicial;
            contadormuertos+=1;

        
            // AGREGAR LA PUNTUACION POR CADA BOSS.
            puntuacion_oro += 1;    
            

            //TENGO QUE ACTUALIZAR TODOS LOS TEXTOS TANTO EN EL BOSS COMO EN MEJORAS. ESTE ES EN EL BOSS
            document.querySelector(".mult-daño-texto").innerText=daño;
            document.querySelector(".oro-texto").innerText =puntuacion_oro;
            document.querySelector(".mult-puntos-texto").innerText =multPuntuacion;

            textdaño_oro.innerText = puntuacion_oro;

        } }

//*FUNCION PARA QUE CUANDO HAGA CLICK APAREZCA LA IMAGEN
document.getElementById('boss').addEventListener('click', function() {
    //PRIMERO COGEMOS LA IMAGEN DEL ATAQUE
    const attackImg = document.getElementById('ataquealboss');

    // VOY A PONERLE QUE APAREZCA DE MANERA ALEATORIO CON UN MARGEN
    let ataque_izquierda=Math.floor(Math.random()*(50-20)+20)
    let ataque_abajo=Math.floor(Math.random()*(50-20)+20)
    //AQUI LE DAMOS LA POSICION EN EL CSS A LA IMAGEN DE ATAQUE.
    attackImg.style.left = ataque_izquierda + "%";
    attackImg.style.bottom = ataque_abajo +"%";

    //APARECE LA IMAGEN DE ATAQUE.
    attackImg.style.display = 'block';

    // A LOS 500ms DESAPARECE DE NUEVO ESTA IMAGEN QUITANDOLA EN EL CSS
    setTimeout(function() {
        attackImg.style.display = 'none';
    }, 200);
});


//!A PARTIR DE AQUI VOY A HACER LAS FUNCIONES DE LA PANTALLA DE MEJORAS
comprardaño.addEventListener("click",function(){

    if (daño<=10 && puntuacion_oro>0){
        puntuacion_oro-=1
        daño+=1;
        }
    
    else if(daño>=10 && puntuacion_oro>=10){
        puntuacion_oro-=10
        daño+=1;
        }
        
//AQUI TENEMOS DOS EJEMPLOS DE COMO HACER UNA ENTRADA DE TEXTO EN HTML

        document.querySelector(".mult-daño-texto").innerText=daño;
        document.querySelector(".oro-texto").innerText =puntuacion_oro;
        textdaño_oro.innerText = puntuacion_oro;
        textdaño.innerText = daño;


})

//!FUNCION PARA QUE APAREZCAN LOS CUADROS DESCRIPTIVOS DE LOS HEROES.
//SI PINCHAMOS EN LA IMAGEN DEL GUERRERO SU ICONO
document.getElementById('imagen_guerrero').addEventListener('click', function() {
    //CREAMOS LA CONSTANTE DE EL GUERRERO
    const imagenespecguerrero = document.getElementById('espec1');
    //APARECE LA IMAGEN COMPLETA DEL GUERRERO.
    imagenespecguerrero.style.display = 'flex';
});
// PARA QUITAR LA IMAGEN PINCHAMOS ESTA VEZ EN EL DIV QUE APARECE
document.getElementById('espec1').addEventListener('click', function() {
    const imagenespecguerrero = document.getElementById('espec1');
    //APARECE LA IMAGEN DE ATAQUE.
    imagenespecguerrero.style.display = 'none';
});

document.getElementById('imagen_cazador').addEventListener('click', function() {
    //CREAMOS LA CONSTANTE DE EL GUERRERO
    const imagenespeccazador = document.getElementById('espec3');
    //APARECE LA IMAGEN COMPLETA DEL GUERRERO.
    imagenespeccazador.style.display = 'flex';
});
// PARA QUITAR LA IMAGEN PINCHAMOS ESTA VEZ EN EL DIV QUE APARECE
document.getElementById('espec3').addEventListener('click', function() {
    const imagenespeccazador = document.getElementById('espec3');
    //APARECE LA IMAGEN DE ATAQUE.
    imagenespeccazador.style.display = 'none';
})

document.getElementById('imagen_druida').addEventListener('click', function() {
    //CREAMOS LA CONSTANTE DE EL GUERRERO
    const imagenespecdruida = document.getElementById('espec4');
    //APARECE LA IMAGEN COMPLETA DEL GUERRERO.
    imagenespecdruida.style.display = 'flex';
});
// PARA QUITAR LA IMAGEN PINCHAMOS ESTA VEZ EN EL DIV QUE APARECE
document.getElementById('espec4').addEventListener('click', function() {
    const imagenespecdruida = document.getElementById('espec4');
    //APARECE LA IMAGEN DE ATAQUE.
    imagenespecdruida.style.display = 'none';
})

document.getElementById('imagen_paladin').addEventListener('click', function() {
    //CREAMOS LA CONSTANTE DE EL GUERRERO
    const imagenespecpaladin = document.getElementById('espec2');
    //APARECE LA IMAGEN COMPLETA DEL GUERRERO.
    imagenespecpaladin.style.display = 'flex';
});
// PARA QUITAR LA IMAGEN PINCHAMOS ESTA VEZ EN EL DIV QUE APARECE
document.getElementById('espec2').addEventListener('click', function() {
    const imagenespecpaladin = document.getElementById('espec2');
    //APARECE LA IMAGEN DE ATAQUE.
    imagenespecpaladin.style.display = 'none';
})
