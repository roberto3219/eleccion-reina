window.addEventListener("load",function(){
    let erroresList = document.querySelector(".errores")
    let form = document.querySelector("#formCandidata")
    let errores = [];
    let nombre = document.querySelector("#nombre")
    let dni = document.querySelector("#dni")
    let edad = document.querySelector("#edad")
    let curso = document.querySelector("#curso")
    let correo = document.querySelector("#correo")
    let tel = document.querySelector("#tel")
    let provincia = document.querySelector("#provincia")
    let ciudad = document.querySelector("#ciudad")
    form.addEventListener("submit",function(e){
        let errores = [];
        if(
            nombre.value == "" ||
            nombre.value == null ||
            nombre.value == undefined
        ){
            errores.push("Campo nombre obligatorio")
        } else if (nombre.value.length < 2) {
            errores.push("El nombre debe tener al menos 2 caracteres");
        }

        if(
            dni.value == "" ||
            dni.value == null ||
            dni.value == undefined
        ){
            errores.push("Campo DNI obligatorio")
        }else if(dni.value.length != 7){
            errores.push("tiene que ser 7 digitos")
        }

        if(
            edad.value == "" ||
            edad.value == null ||
            edad.value == undefined
        ){
            errores.push("Campo edad obligatorio")
        }else if(edad.value < 15 ){
            errores.push("Tienes que tener al menos 15 años")
        }

        if(
            curso.value == "" ||
            curso.value == null ||
            curso.value == undefined
        ){
            errores.push("Campo curso obligatorio")
        }

        if(
            correo.value == "" ||
            correo.value == null ||
            correo.value == undefined
        ){
            errores.push("Campo correo obligatorio")
        }
        if(
            tel.value == "" ||
            tel.value == null ||
            tel.value == undefined
        ){
            errores.push("Campo telefono obligatorio")
        }

        if(
            provincia.value == "" ||
            provincia.value == null ||
            provincia.value == undefined
        ){
            errores.push("Campo provincia obligatorio")
        }

        if(
            ciudad.value == "" ||
            ciudad.value == null ||
            ciudad.value == undefined
        ){
            errores.push("Campo ciudad obligatorio")
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