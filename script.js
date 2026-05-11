const splash = document.getElementById("splash");

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

const startBtn = document.getElementById("startBtn");
const continuarBtn = document.getElementById("continuarBtn");

const nombreInput = document.getElementById("nombre");
const saludo = document.getElementById("saludo");

const respuestaBtn = document.getElementById("respuestaBtn");
const respuestaInput = document.getElementById("respuestaInput");

const fraseBtn = document.getElementById("fraseBtn");
const fraseBtn2 = document.getElementById("fraseBtn2");

const respuestaBtn2 = document.getElementById("respuestaBtn2");
const respuestaInput2 = document.getElementById("respuestaInput2");

const otroBtn = document.getElementById("otroBtn");
const otroInput = document.getElementById("otroInput");

const correcta = document.querySelector(".correcta");

const music = document.getElementById("music");
const volumeSlider = document.getElementById("volumeSlider");

/* 🎵 MUSICA */
const canciones = [
  "music/song1.mp3",
  "music/song2.mp3",
  "music/song3.mp3"
];

let index = 0;
let started = false;

/* 🔓 desbloqueo iOS audio */
function unlockAudio(){
  music.load();
  music.play().then(() => {
    music.pause();
    music.currentTime = 0;
  }).catch(()=>{});
}

/* 🎵 cargar música */
function loadMusic(){
  music.src = canciones[index];
  music.volume = volumeSlider.value;
  music.load();
}

/* ▶️ reproducir */
function playMusic(){
  music.play().catch(()=>{});
}

/* 🔁 siguiente canción */
music.addEventListener("ended", () => {
  index = (index + 1) % canciones.length;
  loadMusic();
  playMusic();
});

/* 🔊 volumen */
volumeSlider.addEventListener("input", () => {
  music.volume = volumeSlider.value;
});

/* 💌 SPLASH */
window.addEventListener("load", () => {

  setTimeout(() => {

    splash.style.transition = "0.8s ease";
    splash.style.opacity = "0";

    setTimeout(() => {
      splash.style.display = "none";
      inicio.classList.add("activa");
    }, 800);

  }, 2000);

});

/* 🔄 CAMBIO PANTALLA */
function cambiar(actual, siguiente){
  if(actual) actual.classList.remove("activa");
  if(siguiente) siguiente.classList.add("activa");
}

/* 🚀 START */
startBtn.addEventListener("click", () => {

  const nombre = nombreInput.value;

  if(nombre.trim() === ""){
    alert("Escribí tu nombre ✨");
    return;
  }

  saludo.innerText = `Hola, ${nombre} 💖`;

  /* 🎵 activar música iOS */
  if(!started){
    unlockAudio();
    loadMusic();
    playMusic();
    started = true;
  }

  cambiar(inicio, bienvenida);

});

/* ➡️ CONTINUAR */
continuarBtn.addEventListener("click", () => {
  cambiar(bienvenida, pregunta1);
});

/* ❓ PREGUNTA 1 */
document.querySelectorAll(".option").forEach(btn => {
  btn.addEventListener("click", () => {
    cambiar(pregunta1, calendario);
  });
});

if(otroBtn){
  otroBtn.addEventListener("click", () => {
    otroInput.style.display = "block";
    otroInput.focus();
  });
}

/* 📅 CALENDARIO */
if(correcta){
  correcta.addEventListener("click", () => {
    cambiar(calendario, pregunta2);
  });
}

/* 💭 PREGUNTA 2 */
respuestaBtn.addEventListener("click", () => {
  if(respuestaInput.value.trim() === "") return;
  cambiar(pregunta2, frase1);
});

/* 💖 FRASE 1 */
fraseBtn.addEventListener("click", () => {
  cambiar(frase1, pregunta3);
});

/* ✨ PREGUNTA 3 */
document.querySelectorAll(".option2").forEach(btn => {
  btn.addEventListener("click", () => {
    cambiar(pregunta3, frase2);
  });
});

/* 💖 FRASE 2 */
fraseBtn2.addEventListener("click", () => {
  cambiar(frase2, pregunta4);
});

/* 💭 PREGUNTA 4 */
respuestaBtn2.addEventListener("click", () => {
  if(respuestaInput2.value.trim() === "") return;
  cambiar(pregunta4, minijuego);
});

/* 🎮 MINI JUEGO */
const words = document.querySelectorAll(".word");
const resultado = document.getElementById("resultadoFrase");

const fraseCorrecta = ["Tú", "hogar", "eres", "mi"];
let user = [];

words.forEach(w => {
  w.addEventListener("click", () => {

    user.push(w.innerText);
    resultado.innerText = user.join(" ");

    w.disabled = true;

    if(user.length === fraseCorrecta.length){

      if(user.join(" ") === fraseCorrecta.join(" ")){

        resultado.innerText = "✨ Tú eres mi hogar ✨";

        setTimeout(() => {
          cambiar(minijuego, final);
        }, 1200);

      } else {

        resultado.innerText = "❌ Intentá otra vez";

        setTimeout(() => {
          user = [];
          resultado.innerText = "";
          words.forEach(x => x.disabled = false);
        }, 1000);

      }
    }
  });
});