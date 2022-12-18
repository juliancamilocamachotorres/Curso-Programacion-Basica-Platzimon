const sectionSelecionarAtaque = document.getElementById("seleccionar-ataque");
const sectionReiniciar = document.getElementById("reiniciar");
const botonMascotaJugador = document.getElementById("boton-mascota");

const botonReiniciar = document.getElementById("boton-reiniciar");

const inputLangostelvis = document.getElementById("langostelvis");
const inputTucapalma = document.getElementById("tucapalma");
const inputPydos = document.getElementById("pydos");
const spanMascotaJugador = document.getElementById("mascota-jugador");
const sectionSelecionarMascota = document.getElementById("seleccionar-mascota");

const spanMascotaEnemigo = document.getElementById("mascota-enemigo");

const spanVidasJugador = document.getElementById('vidas-jugador');
const spanVidasEnemigo = document.getElementById('vidas-enemigo');

const sectionMensaje = document.getElementById('resultado');
const ataquesDeJugador = document.getElementById('ataques-de-jugador');
const ataquesDeEnemigo = document.getElementById('ataques-de-enemigo');

const contenedorTarjetas = document.getElementById('contenedorTarjetas');
const contenedorAtaques = document.getElementById('contenedorAtaques');

const sectionVerMapa = document.getElementById('ver-mapa');
const mapa = document.getElementById('mapa');

let platzimones = [];
let platzimonesEnemigos = [];
let ataqueJugador = [];
let ataqueEnemigo = [];
let opcionPlatzimones;
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let mascotaJugador;
let mascotaJugadorObjeto;
let ataquesPlatzimon;
let botonFuego;
let botonAgua;
let botonTierra;
let botones = [];
let ataquesPlatzimonEnemigo;
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let vidasJugador = 3;
let vidasEnemigo = 3;
let lienzo = mapa.getContext("2d");
let intervalo;
let mapaBackground = new Image();
mapaBackground.src = './assets/mokemap.png'
let alturaQueBuscamos;
let anchoDelMapa = window.innerWidth - 20;
const anchoMaximoDelMapa = 350;
let jugadorId = null;
let enemigoId = null;

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20;
}

alturaQueBuscamos = anchoDelMapa * 600 / 800;

mapa.width = anchoDelMapa;
mapa.height = alturaQueBuscamos;

class Platzimon {
    constructor(nombre, foto, vida, fotoMapa,id = null) {
        this.id = id;
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
        this.ancho = 40;
        this.alto = 40;
        this.x = aleatorio(0, mapa.width - this.ancho);
        this.y = aleatorio(0, mapa.height - this.alto);
        this.mapaFoto = new Image();
        this.mapaFoto.src = fotoMapa;
        this.velocidadX = 0;
        this.velocidadY = 0;
    }
    pintarPlatzimon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        );
    }
}

let hipodoge = new Platzimon('hipodoge','./assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png');

let capipepo = new Platzimon('capipepo','./assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png');

let ratigueya = new Platzimon('ratigueya','./assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png');

/* let hipodogeEnemigo = new Platzimon('hipodoge','./assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png');

let capipepoEnemigo = new Platzimon('capipepo','./assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png');

let ratigueyaEnemigo = new Platzimon('ratigueya','./assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png'); */

/* Platzimones.push(hipodoge, capipepo, ratigueya);

console.log(Platzimones); */

const hipodoge_ataques = [
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌿', id: 'boton-tierra'},
]
const capipepo_ataques = [
    {nombre: '🌿', id: 'boton-tierra'},
    {nombre: '🌿', id: 'boton-tierra'},
    {nombre: '🌿', id: 'boton-tierra'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
]
const ratigueya_ataques = [
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🌿', id: 'boton-tierra'},
]

hipodoge.ataques.push(...hipodoge_ataques)

capipepo.ataques.push(...capipepo_ataques)

ratigueya.ataques.push(...ratigueya_ataques)

/* hipodogeEnemigo.ataques.push(...hipodoge_ataques)

capipepoEnemigo.ataques.push(...capipepo_ataques)

ratigueyaEnemigo.ataques.push(...ratigueya_ataques) */

platzimones.push(hipodoge, capipepo, ratigueya);

function iniciarJuego(){
    sectionSelecionarAtaque.style.display = 'none';
    sectionVerMapa.style.display = 'none';
    platzimones.forEach((platzimon) => {
        opcionPlatzimones = `
        <input type="radio" name="mascota" id=${platzimon.nombre}>
                <label class="tarjeta-de-platzimon" for=${platzimon.nombre}>
                    <img src=${platzimon.foto} alt=${platzimon.nombre}>
                    <p>${platzimon.nombre}</p>
                </label>
                `

        contenedorTarjetas.innerHTML += opcionPlatzimones;
        inputHipodoge = document.getElementById("hipodoge");
        inputCapipepo = document.getElementById("capipepo");
        inputRatigueya = document.getElementById("ratigueya");        
    });
    sectionReiniciar.style.display = 'none';   
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);        
    botonReiniciar.addEventListener("click", reiniciarJuego);
    unirseAlJuego();
}

function unirseAlJuego(){
    fetch("http://192.168.1.4:8080/unirse")
        .then(function (res){
            if(res.ok){
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta);
                        jugadorId = respuesta;
                    })
            }
        })
}

function seleccionarMascotaJugador(){
    let juego = true;
    if(inputHipodoge.checked){
        spanMascotaJugador.innerHTML = inputHipodoge.id;
        mascotaJugador = inputHipodoge.id;
    } else if(inputCapipepo.checked){
        spanMascotaJugador.innerHTML = inputCapipepo.id;
        mascotaJugador = inputCapipepo.id;
    } else if(inputRatigueya.checked){
        spanMascotaJugador.innerHTML = inputRatigueya.id;
        mascotaJugador = inputRatigueya.id;
    } /* else if(inputLangostelvis.checked){
        spanMascotaJugador.innerHTML = "Langostelvis";
    } else if(inputTucapalmEnemigoa.checked){
        spanMascotaJugador.innerHTML = "Tucapalma";
    } else if(inputPydos.checked){
        spanMascotaJugador.innerHTML = "Pydos";
    } */ else {
        alert("No seleccionaste ninguna mascota")
        juego = false;
    }

    seleccionarPlatzimon(mascotaJugador);

    extraerAtaques(mascotaJugador);
    if(juego){
        //seleccionarMascotaEnemigo()
        //sectionSelecionarAtaque.style.display = 'flex';
        sectionVerMapa.style.display = 'flex';     
        sectionSelecionarMascota.style.display = 'none';
        iniciarMapa();
    }
}

function seleccionarPlatzimon(mascotaJugador) {
    fetch(`http://192.168.1.4:8080/platzimon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            platzimon: mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador){
    let ataques;
    for (let i = 0; i < platzimones.length; i++) {
        if(mascotaJugador === platzimones[i].nombre) {
            ataques = platzimones[i].ataques;
        }
        
    }
    mostrarAtaques(ataques);
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        ataquesPlatzimon = `
        <button id=${ataque.id} class="boton-ataque BAtaque">${ataque.nombre}</button>
                `

        contenedorAtaques.innerHTML += ataquesPlatzimon;
    });
    botonFuego = document.getElementById("boton-fuego");
    botonAgua = document.getElementById("boton-agua");
    botonTierra = document.getElementById("boton-tierra");
    botones = document.querySelectorAll('.BAtaque');
    /* botonFuego.addEventListener("click",ataqueFuego);    
    botonAgua.addEventListener("click",ataqueAgua);    
    botonTierra.addEventListener("click",ataqueTierra);  */ 
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if(e.target.textContent === '🔥'){
                ataqueJugador.push("FUEGO");
                console.log(ataqueJugador);
                boton.style.background = '#6C4AB6';
                boton.disabled = true;
            } else if(e.target.textContent === '💧'){
                ataqueJugador.push("AGUA");
                console.log(ataqueJugador);
                boton.style.background = '#6C4AB6';
                boton.disabled = true;
            } else{
                ataqueJugador.push("TIERRA");
                console.log(ataqueJugador);
                boton.style.background = '#6C4AB6';
                boton.disabled = true;
            }
            if (ataqueJugador.length === 5) {
                enviarataques();    
            }
        })
    });
    
}

function enviarataques(){
    fetch(`http://192.168.1.4:8080/platzimon/${jugadorId}/ataques`, {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                ataques: ataqueJugador
            }
        )
    })
    intervalo = setInterval(obtenerAtaques,50);
}

function obtenerAtaques(){
    fetch(`http://192.168.1.4:8080/platzimon/${enemigoId}/ataques`)
        .then(function(res) {
            if (res.ok) {
                res.json()
                    .then(function({ataques}){
                        if (ataques.length === 5) {
                            ataqueEnemigo = ataques
                            combate()
                        }
                    })
            }
        })
}

function seleccionarMascotaEnemigo(enemigo){
    //let mascotaAleatorio = aleatorio(0,platzimones.length-1);

    spanMascotaEnemigo.innerHTML = enemigo.nombre;
    ataquesPlatzimonEnemigo = enemigo.ataques;
    secuenciaAtaque();
    /* if(mascotaAleatorio == 1){
        spanMascotaEnemigo.innerHTML = "Hipodoge";
    } else if(mascotaAleatorio == 2){
        spanMascotaEnemigo.innerHTML = "Capipepo";
    } else if(mascotaAleatorio == 3){
        spanMascotaEnemigo.innerHTML = "Ratigueya";
    } else if(mascotaAleatorio == 4){
        spanMascotaEnemigo.innerHTML = "Langostelvis";
    } else if(mascotaAleatorio == 5){
        spanMascotaEnemigo.innerHTML = "Tucapalma";
    } else if(mascotaAleatorio == 6){
        spanMascotaEnemigo.innerHTML = "Pydos";
    } */
}

/* function ataqueFuego(){
    ataqueJugador = 'FUEGO'
    ataqueAleatorioEnemigo();
}

function ataqueAgua(){
    ataqueJugador = 'AGUA'
    ataqueAleatorioEnemigo();
}

function ataqueTierra(){
    ataqueJugador = 'TIERRA'
    ataqueAleatorioEnemigo();
} */

function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(0,ataquesPlatzimonEnemigo.length-1);
    if(ataqueAleatorio == 0 || ataqueAleatorio == 1){
        ataqueEnemigo.push('FUEGO');
    } else if(ataqueAleatorio == 3 || ataqueAleatorio == 4){
        ataqueEnemigo.push('AGUA');
    } else {
        ataqueEnemigo.push('TIERRA');
    }
    console.log(ataqueEnemigo);
    iniciarPelea();

}

function iniciarPelea(){
    if(ataqueJugador.length === 5){
        combate();
    }
}

function indexAmboOponentes(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador];
    indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}

function combate(){
    clearInterval(intervalo);
    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueEnemigo[index] === ataqueJugador[index]){
            indexAmboOponentes(index, index);
            crearMensaje("Empate 😬");
        } else if(ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA'){
            indexAmboOponentes(index, index);
            crearMensaje("Ganaste 😄🎉");
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
        } else if(ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'FUEGO'){
            indexAmboOponentes(index, index);
            crearMensaje("Ganaste 😄🎉");
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
        } else if(ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA'){
            indexAmboOponentes(index, index);
            crearMensaje("Ganaste 😄🎉");
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
        } else{
            indexAmboOponentes(index, index);
            crearMensaje("perdiste 😥");
            victoriasEnemigo++;
            spanVidasEnemigo.innerHTML = victoriasEnemigo;
        }
    
        revisarvidas();
        
    }
    

}

function revisarvidas(){
    if(victoriasJugador === victoriasEnemigo){
        crearMensajeFinal("EMPATE");
    } else if(victoriasJugador > victoriasEnemigo){
        crearMensajeFinal("GANASTE");
    } else{
        crearMensajeFinal("PERDISTE");
    }
}

function crearMensaje(resultado){
    let nuevoAtaquesDeJugador = document.createElement('P');
    let nuevoAtaquesDeEnemigo = document.createElement('P');

    sectionMensaje.innerHTML = resultado;
    nuevoAtaquesDeJugador.innerHTML = indexAtaqueJugador;
    nuevoAtaquesDeEnemigo.innerHTML = indexAtaqueEnemigo;

    ataquesDeJugador.appendChild(nuevoAtaquesDeJugador);
    ataquesDeEnemigo.appendChild(nuevoAtaquesDeEnemigo);
}

function crearMensajeFinal(resultadoFinal){
    sectionMensaje.innerHTML = resultadoFinal; 
    sectionReiniciar.style.display = 'block';
}

function reiniciarJuego(){
    location.reload();
}

function aleatorio(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function pintarCanvas(){
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX;
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY;
    lienzo.clearRect(0,0,mapa.width,mapa.height);
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarPlatzimon();

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y);
    platzimonesEnemigos.forEach(function (platzimon) {
        platzimon.pintarPlatzimon();
        revisarColision(platzimon);
    })
    /* hipodogeEnemigo.pintarPlatzimon();
    ratigueyaEnemigo.pintarPlatzimon();
    capipepoEnemigo.pintarPlatzimon(); */
    if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0){
        /* revisarColision(hipodogeEnemigo);
        revisarColision(ratigueyaEnemigo);
        revisarColision(capipepoEnemigo); */
    }
}

function enviarPosicion(x,y) {
    fetch(`http://192.168.1.4:8080/platzimon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                x,
                y
        }
        )
    })
    .then(function(res){
        if(res.ok) {
            res.json()
                .then(function ({ enemigos }) {
                    platzimonesEnemigos = enemigos.map(function (enemigo) {
                        console.log(enemigos);
                        let platzimonEnemigo = null;
                        const platzimonNombre = enemigo.platzimon.nombre || "";
                        if (platzimonNombre === "hipodoge") {
                            platzimonEnemigo = new Platzimon('hipodoge','./assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png',enemigo.id);
                        } else if (platzimonNombre === "capipepo"){
                            platzimonEnemigo = new Platzimon('capipepo','./assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png',enemigo.id);
                        } else if (platzimonNombre === "ratigueya") {
                            platzimonEnemigo = new Platzimon('ratigueya','./assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png',enemigo.id);
                        }
                        platzimonEnemigo.x = enemigo.x || 0;
                        platzimonEnemigo.y = enemigo.y || 0;

                        return platzimonEnemigo;
                    })
                    
                })
        }
    })
}

function moverArriba(){
    mascotaJugadorObjeto.velocidadY = - 5;
}

function moverIzquierda(){
    mascotaJugadorObjeto.velocidadX = - 5;
}

function moverAbajo(){
    mascotaJugadorObjeto.velocidadY = 5;
}

function moverDerecha(){
    mascotaJugadorObjeto.velocidadX = 5;
}

function detenerMovimiento(){
    
    mascotaJugadorObjeto.velocidadX = 0;
    mascotaJugadorObjeto.velocidadY = 0;
}

function sePresionoUnaTecla(event){
    switch (event.key) {
        case 'ArrowUp':
            moverArriba();
            break;
        case 'ArrowDown':
            moverAbajo();
            break;
        case 'ArrowRight':
                moverDerecha();
                break;
        case 'ArrowLeft':
            moverIzquierda();
            break;
        default:
            break;
    }
}

function iniciarMapa() {
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador);
    intervalo = setInterval(pintarCanvas, 50);
    window.addEventListener('keydown',sePresionoUnaTecla);
    window.addEventListener('keyup', detenerMovimiento);
}

function obtenerObjetoMascota(){
    for (let i = 0; i < platzimones.length; i++) {
        if(mascotaJugador === platzimones[i].nombre) {
            return platzimones[i];
        }
        
    }
}

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y;
    const abajoEnemigo = enemigo.y + enemigo.alto;
    const izquierdaEnemigo = enemigo.x;
    const derechaEnemigo = enemigo.x + enemigo.ancho;

    const arribaMascota = mascotaJugadorObjeto.y;
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto;
    const izquierdaMascota = mascotaJugadorObjeto.x;
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho;

    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        izquierdaMascota > derechaEnemigo ||
        derechaMascota < izquierdaEnemigo
    ) {
        return;
    } 

    detenerMovimiento();
    clearInterval(intervalo);
    enemigoId = enemigo.id;
    sectionSelecionarAtaque.style.display = 'flex';
    sectionVerMapa.style.display = 'none';  
    seleccionarMascotaEnemigo(enemigo);
    /* alert('Colision con ' + enemigo.nombre + ' enemigo'); */

    
}

window.addEventListener("load",iniciarJuego)