var btnIniciarJuego = document.querySelector(".btnIniciarJuego");
var btnAgregarPalabra = document.querySelector(".btnAgregarPalabra");
var btnAnadir = document.querySelector(".btnAnadir");
var btnRegresar = document.querySelector(".btnRegresar");
var seccionInicio = document.querySelector(".seccionInicio");
var seccionAgregarPalabra = document.querySelector(".seccionAgregarPalabra");
var seccionMuneco = document.querySelector(".seccionMuneco");
var botonNuevoJuego = document.querySelector(".btnNuevoJuego");
var botonRendirse = document.querySelector(".btnRendirse");
var stickerGanaste = document.querySelector(".msgGanaste");
var stickerPerdiste = document.querySelector(".msgPerdiste");
stickerGanaste.style.display = "none";
stickerPerdiste.style.display = "none";

seccionMuneco.style.display = "none";
seccionAgregarPalabra.style.display = "none";
seccionInicio.style.display = "";

btnIniciarJuego.addEventListener("click", () => {
    seccionInicio.style.display = "none";
    seccionMuneco.style.display = "";
    tablero.clearRect(0 , 0, 400, 550);
    stickerGanaste.style.display = "none";
    stickerPerdiste.style.display = "none";
    letras = [];
    palabraCorrecta = [];
    errores = 0;
    dibujarGuiones(escogerPalabraSecreta());
});

btnAgregarPalabra.addEventListener("click", () => {
    seccionInicio.style.display = "none";
    seccionAgregarPalabra.style.display = "";
    capturarPalabra.focus();
});

btnRegresar.addEventListener("click", () => {
    capturarPalabra.value = "";
    seccionInicio.style.display = "";
    seccionAgregarPalabra.style.display = "none";
});

botonRendirse.addEventListener("click", () => {
    seccionInicio.style.display = "";
    seccionMuneco.style.display = "none";
});

btnAnadir.addEventListener("click", function() {
    let capturarPalabra = document.querySelector(".capturarPalabra");
    let palabraNueva = capturarPalabra.value;
    palabraNueva = palabraNueva.toUpperCase();
    
    palabras.push(palabraNueva);
    capturarPalabra.value = "";
    capturarPalabra.focus();
});

botonNuevoJuego.addEventListener("click", function() {
    tablero.clearRect(0 , 0, 400, 550);
    stickerGanaste.style.display = "none";
    stickerPerdiste.style.display = "none";
    dibujarGuiones(escogerPalabraSecreta());
    letras = [];
    palabraCorrecta = [];
    errores = 0;
});

let palabras = ['PROGRAMA', 'JAVASCRIPT', 'LENGUAJE', 'GITHUB', 'CODIGO', 'WEB', 'LOGICA', 'TECNOLOGIA', 'CHALLENGE', 'DESARROLLO'];
var tablero = document.querySelector('.canvasMuneco').getContext('2d');
var letras = [];
var palabraCorrecta = [];
var palabraSecreta;
var errores = 0;
var palabrasGanadas = [];

function escogerPalabraSecreta() {
    let palabra = palabras[Math.floor(Math.random() * palabras.length)];
    if (palabrasGanadas.length >= palabras.length) {
        palabrasGanadas = [];
    }
    if(palabrasGanadas.includes(palabra)) {
        escogerPalabraSecreta();
    } else {
        palabraSecreta = palabra;
        console.log(palabra);
        console.log(palabrasGanadas);
        return palabraSecreta;
    }
}

function dibujarGuiones() {
    tablero.lineWidth = 5;
    tablero.lineCap = "round";
    tablero.lineJoin = "round";
    tablero.strokeStyle = "#ad5e1c";
    tablero.beginPath();

    let ancho = 400 / palabraSecreta.length;
    for( let i = 0; i < palabraSecreta.length; i++ ) {
        tablero.moveTo(3 + (ancho * i), 500);
        tablero.lineTo(33 + (ancho * i), 500);
    }
    tablero.stroke();
    tablero.closePath();
}

function escribirLetraCorrecta(index) {
    tablero.font = 'bold 42px Inter';
    tablero.lineWidth = 5;
    tablero.lineCap = 'round';
    tablero.lineJoin = 'round';
    tablero.fillStyle = '#000000';

    var ancho = 400 / palabraSecreta.length;
    tablero.fillText( palabraSecreta[index], 4 + (ancho * index), 490 );
}

function escribirLetraIncorrecta(letra, errorsLeft) {
    tablero.font = 'normal 25px Inter';
    tablero.lineWidth = 6;
    tablero.lineCap = 'round';
    tablero.lineJoin = 'round';
    tablero.fillStyle = '#000000';
    tablero.fillText(letra, (30 * errorsLeft), 550, 40);
}

function verificarLetraClicada(key) {
    if (( letras.length < 1 || letras.indexOf(key) < 0 ) && (key >= 'A' && key >= 'Z')) {
        letras.push(key);
        return false;
    } else {
        letras.push(key);
        return true;
    }
}

function adicionarLetraCorrecta( i, letra ) {
    palabraCorrecta[i] = letra.toUpperCase();
    if(palabraCorrecta.join("") == palabraSecreta) {
        palabrasGanadas.push(palabraSecreta);
        stickerGanaste.style.display = "";
    }
}

function adicionarLetraIncorrecta(letter) {
    if (palabraSecreta.indexOf(letter) <= 0) {
        dibujarMuneco(errores);
        errores += 1;
        if(errores > 9) {
            stickerPerdiste.style.display = "";
        }
    }
}

document.onkeydown = (e) => {
    let letra = e.key.toUpperCase();
    if((palabraCorrecta.join("") != palabraSecreta) && (errores <= 9)) {
        if ( !verificarLetraClicada(e.key)) {
            if(palabraSecreta.includes(letra)) {
                for(let i = 0; i < palabraSecreta.length; i++) {
                    if(palabraSecreta[i] === letra) {
                        adicionarLetraCorrecta(i, letra);
                        escribirLetraCorrecta(i);  
                    }
                }
            } else {
                if( !verificarLetraClicada(e.key)) return
                    adicionarLetraIncorrecta(letra)
                    escribirLetraIncorrecta(letra, errores)
            }
        }
    }
}

function dibujarMuneco(Linea) {
    
    switch(Linea) {
        case 0:
            tablero.beginPath();
            tablero.lineWidth = 10; 
            tablero.strokeStyle = "#ad5e1c";
            tablero.lineCap="round";

            tablero.moveTo(30,410);
            tablero.lineTo(300,410);
            tablero.stroke();
            break;
        case 1:
            tablero.moveTo(100,410);
            tablero.lineTo(100,10);
            tablero.stroke();
            break;
        case 2:
            tablero.moveTo(100,10);
            tablero.lineTo(250,10);
            tablero.stroke();
            break;
        case 3:
            tablero.lineCap="butt";
            tablero.moveTo(250,10);
            tablero.lineTo(250,70);
            tablero.stroke();
            break;
        case 4:
            tablero.strokeStyle = "#000000";
            tablero.beginPath();
            tablero.lineWidth = 5;
            tablero.arc(250,110,40,0,Math.PI*2);
            tablero.stroke();
            break;
        case 5:
            tablero.lineCap="round";
            tablero.moveTo(250,150);
            tablero.lineTo(250,260);
            tablero.stroke();
            break;
        case 6:
            tablero.moveTo(250,260);
            tablero.lineTo(200,360);
            tablero.stroke();
            break;
        case 7:
            tablero.moveTo(250,260);
            tablero.lineTo(300,360);
            tablero.stroke();
            break;
        case 8:
            tablero.moveTo(250,170);
            tablero.lineTo(200,250);
            tablero.stroke();
            break;
        case 9:
            tablero.moveTo(250,170);
            tablero.lineTo(300,250);
            tablero.stroke();
            break;
    }
}


