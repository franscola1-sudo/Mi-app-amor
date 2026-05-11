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

const music = document.getElementById("music");
const volumeSlider = document.getElementById("volumeSlider");

/* 🎵 MUSICA */
const canciones = [
  "music/song1.mp3",
  "music/song2.mp3",
  "music/song3.mp3"
];

let indice = 0;

function reproducir(){
  music.src = canciones[indice];
  music.volume = volumeSlider.value;
  music.play().catch(()=>{});
}

music.addEventListener("ended", () => {
  indice = (indice + 1) % canciones.length;
  reproducir();
});

/* 📱 FIX IPHONE AUDIO */
function desbloquearAudio(){
  music.load();
  music.play().then(()=>{
    music.pause();
    music.currentTime = 0;
  }).catch(()=>{});
}

/* 🔄 CAMBIO DE PANTALLA */
function cambiar(actual, siguiente){

  if(!actual || !siguiente) return;

  actual.classList.remove("activa");
  siguiente.classList.add("activa");

}

/* 🚀 START */
startBtn.addEventListener("click", () => {

  const nombre = nombreInput.value;

  if(nombre.trim() === ""){
    alert("Escribí tu nombre ✨");
    return;
  }

  saludo.innerText = `Hola, ${nombre} 💖`;

  desbloquearAudio();
  reproducir();

  cambiar(inicio, bienvenida);

});

/* ➡️ SIGUIENTE */
continuarBtn.addEventListener("click", () => {
  cambiar(bienvenida, pregunta1);
});

/* ❓ OPCIONES */
document.querySelectorAll(".option").forEach(b => {
  b.addEventListener("click", () => {
    cambiar(pregunta1, calendario);
  });
});

otroBtn?.addEventListener("click", () => {
  otroInput.style.display = "block";
});

/* 📅 CALENDARIO */
correcta?.addEventListener("click", () => {
  cambiar(calendario, pregunta2);
});

/* 💭 PREGUNTAS */
respuestaBtn.addEventListener("click", () => {
  if(respuestaInput.value.trim() === "") return;
  cambiar(pregunta2, frase1);
});

fraseBtn.addEventListener("click", () => {
  cambiar(frase1, pregunta3);
});

document.querySelectorAll(".option2").forEach(b => {
  b.addEventListener("click", () => {
    cambiar(pregunta3, frase2);
  });
});

fraseBtn2.addEventListener("click", () => {
  cambiar(frase2, pregunta4);
});

respuestaBtn2.addEventListener("click", () => {
  if(respuestaInput2.value.trim() === "") return;
  cambiar(pregunta4, minijuego);
});

/* 🔊 VOLUMEN */
volumeSlider.addEventListener("input", () => {
  music.volume = volumeSlider.value;
});

/* 🎮 MINI JUEGO */
const words = document.querySelectorAll(".word");
const resultado = document.getElementById("resultadoFrase");

const correctaFrase = ["Tú","eres","mi","hogar"];
let user = [];

words.forEach(w => {
  w.addEventListener("click", () => {

    user.push(w.innerText);
    resultado.innerText = user.join(" ");

    w.disabled = true;

    if(user.length === correctaFrase.length){

      if(user.join(" ") === correctaFrase.join(" ")){
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