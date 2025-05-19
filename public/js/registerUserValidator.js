window.addEventListener("load",function(){
    let erroresList = document.querySelector(".errores")
    let formulario = document.querySelector("form");
    let errores = [];
    let dni = document.querySelector("#dni")
    let nombre = document.querySelector("#nombre");
    let correo = document.querySelector("#correo");
    let password = document.querySelector("#password")
    formulario.addEventListener("submit",function(e){
        errores = [];
        console.log(dni.value.length)
        if(
          dni.value == "" ||
          dni.value == null ||
          dni.value == undefined
        ){
          errores.push("Campo dni obligatorio")
        }else if(dni.value.length != 8){
          errores.push("debe tener 8 digitos")
        }
        if (
            nombre.value == "" ||
            nombre.value == null ||
            nombre.value == undefined
          ) {
            errores.push("Campo nombre obligatorio");
          } else if (nombre.value.length < 4) {
            errores.push("El nombre debe tener al menos 4 caracteres");
          }
          console.log(password.value.length)
          if (
            correo.value == "" ||
            correo.value == null ||
            correo.value == undefined
          ) {
            errores.push("Campo correo obligatorio");
          } 
          if (password.value == "" || password.value == null || password.value == undefined) {
            errores.push("Campo contraseña obligatorio");
          } else if (password.value.length > 32 && password.value.length > 8) {
            errores.push("La contraseña debe tener entre 8 y 32 caracteres");
          }
          if (errores.length > 0) {
            erroresList.innerHTML = "";
            for (let i = 0; i < errores.length; i++) {
              erroresList.innerHTML += `<li class="error">${errores[i]}</li>`;
            }
            e.preventDefault();
          }
    })
})
