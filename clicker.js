const boss=document.getElementById("boss")
const home=document.getElementByClass("returnhome")
let barrainicial = 80;
let puntuacion = parseInt(document.querySelector(".oro-texto").innerText,10);
let multPuntuacion = parseInt(document.querySelector(".mult-puntos-texto").innerText,10);

let puntuacionOro=1;

const bosses= ["final-boss.png",
               "pngwing.com.png",
                "pngwing.com (1).png",
                "pngwing.com (2).png"
]

const bossesEspeciales = ["bossesp1.png"]

const bossesfinales = []
let dañito= 20;
listabossessinusar=[].concat(bosses);

boss.addEventListener("click",function(){

    //SONIDO AL GOLPEAR ESPADA.
    let hit =  document.getElementById("hit1");
    hit.play();

    //BAJAR LA BARRA DE VIDA.
    let barra=document.getElementById("salud");
    barrainicial -= dañito;
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

            //ELIMINAR EL BOSS DE LA LISTA NORMAL PARA QUE NO SE REPITAN.
            listabossessinusar.splice(aleatorio,1);

            dañito -= dañito*0.1;
        }
}
)

