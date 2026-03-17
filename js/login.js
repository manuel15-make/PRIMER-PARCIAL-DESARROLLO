document.getElementById("loginForm").addEventListener("submit", function(e){

e.preventDefault();

const usuario = document.getElementById("usuario").value.trim();
const password = document.getElementById("password").value.trim();
const error = document.getElementById("error");

if(usuario === "" || password === ""){

error.textContent = "Por favor completa todos los campos";
return;

}

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

let valido = usuarios.find(u => u.usuario === usuario && u.password === password);

if(valido){

localStorage.setItem("sesion","activa");
localStorage.setItem("usuarioActivo",usuario);

window.location.href = "index.html";

}else{

error.textContent = "Usuario o contraseña incorrectos";

}

});

function togglePassword(){

const password = document.getElementById("password");

password.type = password.type === "password" ? "text" : "password";

}