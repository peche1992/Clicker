const boss=document.getElementById("boss")
let barrainicial = 80;
const bosses= ["final-boss.png",
               "pngwing.com.png",
                "pngwing.com (1).png",
                "pngwing.com (2).png"
]
let dañito= 20;
listabossessinusar=[].concat(bosses);

boss.addEventListener("click",function(){
    let barra=document.getElementById("daño");
    barrainicial -= dañito;
    barra.style.width= barrainicial+"%";
        if ((barrainicial-dañito)<=1){
            barrainicial=1
        }
        if (barrainicial<1.1 || barrainicial===0){                     
                if (listabossessinusar.length===0){
                    listabossessinusar=[].concat(bosses);
                }
            let aleatorio = Math.floor(Math.random()*listabossessinusar.length);
            boss.src = listabossessinusar[aleatorio];
            listabossessinusar.splice(aleatorio,1);

            dañito -= dañito*0.1;
            barrainicial=80;
        }
}
)

