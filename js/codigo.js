/* funcion para que salga un numero aleatorio en un rango determinado
min -> number
max -> number 
return un numero entre max y min */
function aleatorio(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

/* funcion para decir cual fue mi eleccion
num -> number 
return si es piedra, papel o tijera */
function eleccion(num){
    if(num == 1){
        return "๐";
    } else if(num == 2){
        return "๐งป";
    } else if(num == 3){
        return "โ";
    } else {
        return "perder ๐คจ";
    }    
}
/* funcion para decidir cual es el ganador
jugador -> number
pc -> number 
return alerta del ganador */
function combate(jugador,pc){
    if(pc == jugador){
        alert("Empate ๐ฌ")
    } else if(jugador == 1 && pc == 3){
        alert("Ganaste ๐๐");
        triunfos = triunfos+1;
    } else if(jugador == 2 && pc == 1){
        alert("Ganaste ๐๐");
        triunfos = triunfos+1;
    } else if(jugador == 3 && pc == 2){
        alert("Ganaste ๐๐");
        triunfos = triunfos+1;
    } else{
        alert("perdiste ๐ฅ");
        perdidas = perdidas+1;
    }
}
// 1. piedra, 2. papel, 3. tijera
let jugador = 0;
let pc = 0;
let triunfos = 0;
let perdidas = 0;


while(triunfos < 3 && perdidas < 3){
    pc = aleatorio(1,3);
    jugador = prompt("Elige: 1. piedra, 2. papel, 3. tijera");
    alert("Eligiste " + eleccion(jugador))
    alert("PC eligio " + eleccion(pc))
    //alert("Elegiste "+ jugador);
    //COMBATE
    combate(jugador,pc);
}
alert("Ganaste " + triunfos + " veces, perdiste " + perdidas + " veces ");