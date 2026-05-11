const startBtn = document.getElementById("startBtn");
const continuarBtn = document.getElementById("continuarBtn");

const inicio = document.getElementById("inicio");
const bienvenida = document.getElementById("bienvenida");
const pregunta1 = document.getElementById("pregunta1");
const calendario = document.getElementById("calendario");
const pregunta2 = document.getElementById("pregunta2");
const frase1 = document.getElementById("frase1");
const pregunta3 = document.getElementById("pregunta3");
const frase2 = document.getElementById("frase2");
const pregunta4 = document.getElementById("pregunta4");
const minijuego = document.getElementById("minijuego");
const final = document.getElementById("final");

const saludo = document.getElementById("saludo");
const nombreInput = document.getElementById("nombre");

const respuestaBtn = document.getElementById("respuestaBtn");
const respuestaInput = document.getElementById("respuestaInput");

const fraseBtn = document.getElementById("fraseBtn");
const fraseBtn2 = document.getElementById("fraseBtn2");

const respuestaBtn2 = document.getElementById("respuestaBtn2");
const respuestaInput2 = document.getElementById("respuestaInput2");

const correcta = document.querySelector(".correcta");

const otroBtn = document.getElementById("otroBtn");
const otroInput = document.getElementById("otroInput");

const otraRespuesta = document.getElementById("otraRespuesta");

const music = document.getElementById("music");
const volumeSlider = document.getElementById("volumeSlider");

/* CANCIONES */

const canciones = [
  "music/song1.mp3",
  "music/song2.mp3",
  "music/song3.mp3"
];

let indiceCancion = 0;

/* MUSICA */

function reproducirCancion(){

  music.src = canciones[indiceCancion];

  music.volume = volumeSlider.value;

  music.play().catch(() => {

    console.log("Autoplay bloqueado");

  });

}

music.addEventListener("ended", () => {

  indiceCancion++;

  if(indiceCancion >= canciones.length){

    indiceCancion = 0;

  }

  reproducirCancion();

});

/* CAMBIAR PANTALLAS */

function cambiarPantalla(actual, siguiente){

  actual.classList.remove("activa");

  setTimeout(() => {

    siguiente.classList.add("activa");

  }, 300);

}

/* INICIO */

startBtn.addEventListener("click", () => {

  const nombre = nombreInput.value;

  if(nombre.trim() === ""){

    alert("Escribí tu nombre ✨");

    return;

  }

  saludo.innerHTML = `Hola, ${nombre} 💖`;

  reproducirCancion();

  cambiarPantalla(inicio, bienvenida);

});

/* CONTINUAR */

continuarBtn.addEventListener("click", () => {

  cambiarPantalla(bienvenida, pregunta1);

});

/* PREGUNTA 1 */

document.querySelectorAll(".option").forEach(btn => {

  btn.addEventListener("click", () => {

    cambiarPantalla(pregunta1, calendario);

  });

});

/* OTRO */

otroBtn.addEventListener("click", () => {

  otroInput.style.display = "block";

  otroInput.focus();

});

otroInput.addEventListener("keydown", (e) => {

  if(e.key === "Enter"){

    if(otroInput.value.trim() === ""){

      alert("Escribí una respuesta ✨");

      return;

    }

    cambiarPantalla(pregunta1, calendario);

  }

});

/* CALENDARIO */

correcta.addEventListener("click", () => {

  correcta.style.background = "#ffd6e0";

  correcta.style.color = "#111";

  setTimeout(() => {

    cambiarPantalla(calendario, pregunta2);

  }, 500);

});

/* PREGUNTA 2 */

respuestaBtn.addEventListener("click", () => {

  if(respuestaInput.value.trim() === ""){

    alert("Escribí algo ✨");

    return;

  }

  cambiarPantalla(pregunta2, frase1);

});

/* FRASE 1 */

fraseBtn.addEventListener("click", () => {

  cambiarPantalla(frase1, pregunta3);

});

/* PREGUNTA 3 */

document.querySelectorAll(".option2").forEach(btn => {

  btn.addEventListener("click", () => {

    cambiarPantalla(pregunta3, frase2);

  });

});

otraRespuesta.addEventListener("keydown", (e) => {

  if(e.key === "Enter"){

    if(otraRespuesta.value.trim() === ""){

      alert("Escribí algo lindo ✨");

      return;

    }

    cambiarPantalla(pregunta3, frase2);

  }

});

/* FRASE 2 */

fraseBtn2.addEventListener("click", () => {

  cambiarPantalla(frase2, pregunta4);

});

/* PREGUNTA 4 */

respuestaBtn2.addEventListener("click", () => {

  if(respuestaInput2.value.trim() === ""){

    alert("Escribí algo ✨");

    return;

  }

  cambiarPantalla(pregunta4, minijuego);

});

/* VOLUMEN */

volumeSlider.addEventListener("input", () => {

  music.volume = volumeSlider.value;

});

/* MINI JUEGO */

const palabras = document.querySelectorAll(".word");

const resultadoFrase = document.getElementById("resultadoFrase");

const fraseCorrecta = [
  "Tú",
  "eres",
  "mi",
  "hogar"
];

let fraseUsuario = [];

palabras.forEach(btn => {

  btn.addEventListener("click", () => {

    fraseUsuario.push(btn.innerText);

    resultadoFrase.innerHTML = fraseUsuario.join(" ");

    btn.disabled = true;

    btn.style.opacity = "0.5";

    if(fraseUsuario.length === fraseCorrecta.length){

      if(JSON.stringify(fraseUsuario) === JSON.stringify(fraseCorrecta)){

        resultadoFrase.innerHTML =
        "✨ Tú eres mi hogar ✨";

        setTimeout(() => {

          cambiarPantalla(minijuego, final);

        }, 1500);

      }else{

        resultadoFrase.innerHTML =
        "❌ Intentá otra vez";

        setTimeout(() => {

          fraseUsuario = [];

          resultadoFrase.innerHTML = "";

          palabras.forEach(b => {

            b.disabled = false;

            b.style.opacity = "1";

          });

        }, 1200);

      }

    }

  });

});

/* TYPEWRITER */

const textos = document.querySelectorAll(".typewriter");

function escribirTexto(elemento){

  const texto = elemento.getAttribute("data-text");

  elemento.innerHTML = "";

  let i = 0;

  const intervalo = setInterval(() => {

    elemento.innerHTML += texto.charAt(i);

    i++;

    if(i >= texto.length){

      clearInterval(intervalo);

    }

  }, 35);

}

textos.forEach(texto => {

  escribirTexto(texto);

});