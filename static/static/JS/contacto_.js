function validarFormulario() {
  var nombre = document.getElementById("nombre").value.trim();
  var email = document.getElementById("email").value.trim();
  var asunto = document.getElementById("asunto").value.trim();
  var mensaje = document.getElementById("mensaje").value.trim();


  if (nombre === "" || email === "" || asunto === "" || mensaje === "") {
    alert("Por favor, complete todos los campos del formulario.");
    return false;
  }




  for (var i = 0; i < nombre.length; i++) {
    var charCode = nombre.charCodeAt(i);

    if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32)) {
      alert("El campo 'nombre' solo puede contener caracteres alfabéticos y espacios.");
      return false;

    }

    alert("Formulario enviado correctamente.");
    return true;
  }
}
