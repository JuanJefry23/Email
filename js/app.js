//VARIABLES
const btnEnviar = document.querySelector("#enviar");
const btnReset = document.querySelector("#resetBtn");

//VARIABLES DEL FORMULARIO
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");

//SELECCIONO EL FORMULARIO
const formulario = document.querySelector("#enviar-mail");

const er =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

cargarEventListener();
function cargarEventListener() {
  document.addEventListener("DOMContentLoaded", iniciarApp);

  email.addEventListener("blur", validarFormulario);
  asunto.addEventListener("blur", validarFormulario);
  mensaje.addEventListener("blur", validarFormulario);

  btnReset.addEventListener("click", resetearFormulario);

  formulario.addEventListener("submit", enviarEmail);
}

//FUNCIONES
function iniciarApp() {
  btnEnviar.disabled = true;
  btnEnviar.classList.add("cursor-not-allowed", "opacity-50");
}

//Validar el formulario
function validarFormulario(e) {
  if (e.target.value.length > 0) {
    const error = document.querySelector("p.error");
    if (error) {
      error.remove();
    }

    e.target.classList.remove("border", "border-red-500");
    e.target.classList.add("border", "border-green-500");
  } else {
    e.target.classList.remove("border", "border-green-500");
    e.target.classList.add("border", "border-red-500");
    mostrarError("Fill all the inputs");
  }

  if (e.target.type === "email") {
    if (er.test(e.target.value)) {
      const error = document.querySelector("p.error");
      if (error) {
        error.remove();
      }

      e.target.classList.remove("border", "border-red-500");
      e.target.classList.add("border", "border-green-500");
    } else {
      //En caso que no verifica la expresion regeular
      e.target.classList.remove("border", "border-green-500");
      e.target.classList.add("border", "border-red-500");
      mostrarError("Invalid email");
    }
  }

  //SI TODOS LOS CAMPOS ESTAN COMPLETOS Y PASO LA VALIDACION, ENTONCES HABILITO EL BOTON ENVIAR !
  if (er.test(email.value) && asunto.value !== " " && mensaje.value !== " ") {
    btnEnviar.disabled = false;
    btnEnviar.classList.remove("cursor-not-allowed", "opacity-50");
  }
}

//Muestra el error de que falta completar el campo
function mostrarError(mensaje) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = mensaje;
  mensajeError.classList.add(
    "border",
    "border-red-500",
    "background-red-100",
    "text-red-500",
    "p-3",
    "mt-5",
    "text-center",
    "error"
  );

  //Ahora verifico que no exista ya un mensaje de error en la pantalla, asi no se repite el mensaje una y otra vez en la pantalla
  const existe = document.querySelectorAll(".error");

  if (existe.length === 0) {
    formulario.appendChild(mensajeError);
  }
}

function enviarEmail(e) {
  e.preventDefault();

  //Mostrar el spinner
  const spinner = document.querySelector("#spinner");
  spinner.style.display = "flex";

  //Después de 3 segundos ocultar el spinner y mostrar el mensaje
  setTimeout(() => {
    spinner.style.display = "none";

    //Mensaje que dice que se envió correctamente
    const parrafo = document.createElement("p");
    parrafo.textContent = "The message was successfully submitted";
    parrafo.classList.add(
      "text-center",
      "my-10",
      "p-2",
      "bg-green-500",
      "text-white",
      "font-bold",
      "uppercase"
    );

    //Inserta el parrafo antes del spinner
    formulario.insertBefore(parrafo, spinner);

    setTimeout(() => {
      parrafo.remove();
      resetearFormulario();
    }, 5000);
  }, 3000);
}

//Resetea el formulario
function resetearFormulario(e) {
  e.preventDefault();
  formulario.reset();
  iniciarApp();
}
/*
function habilitarBoton() {
  if (
    email.value.length > 0 &&
    asunto.value.length > 0 &&
    mensaje.value.length > 0
  ) {
    btnEnviar.disabled = false;
    btnEnviar.classList.remove("cursor-not-allowed", "opacity-50");
  } else {
    iniciarApp();
  }
}
*/
