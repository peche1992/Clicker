// LO QUE SE ME HA OCURRIDO PARA AUDIO SEMIAUTOMATICO.
const cualquierlugar = document.getElementsByTagName("body")
const audiohome = document.getElementById('audiohome');
cualquierlugar[0].addEventListener('click', function() {
        audiohome.play();
});
//! VARIABLES DE LA PANTALLA DE MEJORAS
let comprardaño=document.getElementById("comprar_mejora_daño")

//*Aqui van a ir el texto que informa de daño y oro.
let textdaño = document.getElementById("texto-daño-actual")
let textdaño_oro = document.getElementById("texto-daño-actual_oro")



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

    // VIAJE A LOS BOSSES.
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

let puntuacionOro=1;

let puntuacion = parseInt(document.querySelector(".oro-texto").innerText,10);
let multPuntuacion = parseInt(document.querySelector(".mult-puntos-texto").innerText,10);

const bosses= ["final-boss.png",
               "pngwing.com.png",
                "pngwing.com (1).png",
                "pngwing.com (2).png"
]

const bossesEspeciales = ["bossesp1.png"]
let boss10aparecer= false;
let boss10ejecutado =false;

const bossesfinales = []
listabossessinusar=[].concat(bosses);




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
                listabossessinusar=[].concat(bosses);
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
                        puntuacionOro=puntuacionOro*10;
                        multPuntuacion = multPuntuacion*10;
                    }  
           
            barrainicial=60;
            saludinicial+=1;
            vidainicial+=1;
            saludqueda=saludinicial;
            contadormuertos+=1;

        
            // AGREGAR LA PUNTUACION POR CADA BOSS.
            puntuacionoro += 1;    
            document.querySelector(".oro-texto").innerText =puntuacionOro;
            document.querySelector(".mult-puntos-texto").innerText =multPuntuacion;
            textdaño_oro.innerText = puntuacionOro;

        } }



//!A PARTIR DE AQUI VOY A HACER LAS FUNCIONES DE LA PANTALLA DE MEJORAS
comprardaño.addEventListener("click",function(){

    if (daño>=1 && daño<=10 && puntuacionOro>0)
        puntuacionOro-=1
        daño+=1;
        textdaño.innerText = daño;
        textdaño_oro.innerText = puntuacionOro;
})