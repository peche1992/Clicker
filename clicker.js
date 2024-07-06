const boss=document.getElementById("boss")

const home=document.getElementsByClassName("returnhome")
const viajeboss=document.getElementById("viaje-boss")
const viajemejoras=document.getElementById("viaje-hab")
const viajeheroes=document.getElementById("viaje-heroes")
const viajecompras=document.getElementById("viaje-compras")


//RECOGER LOS ZTIPE DE LOS DIVS
let elementboss = document.getElementById("fondo-boss");
let zIndexBoss = window.getComputedStyle(elementboss).zIndex;

let elementhome = document.getElementById("fondo-home");
let zIndexHome = window.getComputedStyle(elementhome).zIndex;

let elementmejoras = document.getElementById("fondo-mejoras");
let zIndexMejoras = window.getComputedStyle(elementmejoras).zIndex;

let elementheroes = document.getElementById("fondo-heroes");
let zIndexheroes = window.getComputedStyle(elementheroes).zIndex;

let elementcompras = document.getElementById("fondo-compras");
let zIndexcompras = window.getComputedStyle(elementcompras).zIndex;

let barrainicial = 80;
let puntuacion = parseInt(document.querySelector(".oro-texto").innerText,10);
let multPuntuacion = parseInt(document.querySelector(".mult-puntos-texto").innerText,10);



const bosses= ["final-boss.png",
               "pngwing.com.png",
                "pngwing.com (1).png",
                "pngwing.com (2).png"
]

const bossesEspeciales = ["bossesp1.png"]

const bossesfinales = []
let dañito= 20;
listabossessinusar=[].concat(bosses);
let puntuacionOro=1;

// AQUI ES DONDE VAMOS A DAR LOS VALORES A TODOS LOS ZINDEX
function actualizarzIndex (zIndexHome, zIndexMejoras, zIndexBoss){
    elementhome.style.zIndex = zIndexHome;          //0
    elementmejoras.style.zIndex = zIndexMejoras;    //1
    elementboss.style.zIndex = zIndexBoss;          //2
    }

//HOME
for(let listahome=0;listahome<home.length;listahome++){
    home[listahome].addEventListener("click",function(){
        actualizarzIndex(1,0,0,0,0)
    }
)}

// VIAJES DESDE EL HOME.
    //VIAJE A LAS MEJORAS.
viajemejoras.addEventListener("click",function(){
    actualizarzIndex(0,1,0,0,0)
    })

    // VIAJE A LOS BOSSES.
viajeboss.addEventListener("click",function(){
    actualizarzIndex(0,0,1,0,0)
})

    //VIAJE A LOS HEROES
viajeheroes.addEventListener("click",function(){
    actualizarzIndex(0,0,0,1,0)
    })

//VIAJE A LOS HEROES
    viajecompras.addEventListener("click",function(){
        actualizarzIndex(0,0,0,0,1)
        })

//* FUNCION DE DAÑO AL HACER CLICK.
boss.addEventListener("click",function(){
    //SONIDO AL GOLPEAR ESPADA.
    let hit =  document.getElementById("hit1");
    hit.play();

    //BAJAR LA BARRA DE VIDA.
    let barra=document.getElementById("salud");
    barrainicial -= dañito;
    barra.style.width= barrainicial+"%";})

//* FUNCION DE DAÑO CONTINO, DEBE SER COMO LA DE HACER CLICK.
function dañocontinuo(damage){
    let barra=document.getElementById("salud");
    damage = damage*0.5
    barrainicial -= damage;
    barra.style.width= barrainicial+"%";
    // CONDICIONES CUANDO MUERE EL BOSS.

        if (barrainicial<1.1 || barrainicial===0){                     
                if (listabossessinusar.length===0){
                    listabossessinusar=[].concat(bosses);
                }

            // AGREGAR LA PUNTUACION POR CADA BOSS.
            puntuacion += puntuacionOro;    
            document.querySelector(".oro-texto").innerText =puntuacion;
            document.querySelector(".mult-puntos-texto").innerText =multPuntuacion;
 
            
            let aleatorio = Math.floor(Math.random()*listabossessinusar.length);
            barrainicial=80;
            boss.src = listabossessinusar[aleatorio];

            //BOSS ESPECIAL 10
            if (puntuacion===10){
                boss.src = bossesEspeciales[0];
                let boss1grito =  document.getElementById("gritoboss1");
                boss1grito.play();
                puntuacionOro=puntuacionOro*10
                multPuntuacion = multPuntuacion*10
            }
                                let boss10ejecutado =true;
                                if (boss10ejecutado===true && puntuacion==20 ){
                                    alert("Enorabuena, ¡Has matado al elemental de sombra!");
                                    boss10ejecutado=false; } 

            //ELIMINAR EL BOSS DE LA LISTA NORMAL PARA QUE NO SE REPITAN.
            listabossessinusar.splice(aleatorio,1);

            damage -= damage*0.1;
}}

//* CONDICIONES CUANDO MUERE EL BOSS.
   if (barrainicial<1.1 || barrainicial===0){                     
            if (listabossessinusar.length===0){
                listabossessinusar=[].concat(bosses);
            }
                        //!BOSS ESPECIAL 10
                            let boss10aparecer= true;
                            if (boss10aparecer===true && puntuacion>=10){
                                boss.src = bossesEspeciales[0];
                                let boss1grito =  document.getElementById("gritoboss1");
                                boss1grito.play();
                                puntuacionOro=puntuacionOro*10;
                                multPuntuacion = multPuntuacion*10;
                                boss10aparecer =false;}  

                                let boss10ejecutado =true;
                                if (boss10ejecutado===true && puntuacion==20 ){
                                    alert("Enorabuena, ¡Has matado al elemental de sombra!");
                                    boss10ejecutado=false; }  
                                   //ELIMINAR EL BOSS DE LA LISTA NORMAL PARA QUE NO SE REPITAN.
                                   listabossessinusar.splice(aleatorio,1);
                                   dañito -= dañito*0.1;

    let aleatorio = Math.floor(Math.random()*listabossessinusar.length);
    barrainicial=80;
    boss.src = listabossessinusar[aleatorio];

    // AGREGAR LA PUNTUACION POR CADA BOSS.
    puntuacion += puntuacionOro;    
    document.querySelector(".oro-texto").innerText =puntuacion;
    document.querySelector(".mult-puntos-texto").innerText =multPuntuacion;
    }


//? AQUI VOY A IR DEJANDO LAS FUNCIONES
const dañocontinuorep = setInterval(function() {
    dañocontinuo(dañito);}, 500);