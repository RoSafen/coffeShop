//RECIBE ->
// id=1&nombre=MICROONDAS&precio=50000&stock=10&imagen=https://picsum.photos/200/300?grayscale

console.log(location.search)     // lee los argumentos pasados a este formulario
var args = location.search.substr(1).split('&');  
//separa el string por los “&” creando una lista
// [“id=3” , “nombre=’tv50’” , ”precio=1200”,”stock=20”]
console.log(args)

var parts = []
for (let i = 0; i < args.length; ++i) {
    parts[i] = args[i].split('=');
}
console.log(parts)

//// [[“id",3] , [“nombre",’tv50’]]
//decodeUriComponent elimina los caracteres especiales que recibe en la URL 
document.getElementById("id").value = decodeURIComponent(parts[0][1])
document.getElementById("valor").value = decodeURIComponent(parts[1][1])
document.getElementById("nombre_receptor").value = decodeURIComponent(parts[2][1])
document.getElementById("nombre_emisor").value =decodeURIComponent( parts[3][1])
document.getElementById("mail").value =decodeURIComponent( parts[4][1])
document.getElementById("mensaje").value =decodeURIComponent( parts[5][1])

function modificar() {
    let id = document.getElementById("id").value
    let valor = parseInt(document.getElementById("valor").value)
    let nombre_receptor = document.getElementById("nombre_receptor").value
    let nombre_emisor = document.getElementById("nombre_editor").value
    let mail = document.getElementById("mail").value
    let mensaje = document.getElementById("mensaje").value

    let card = {
        id,
        valor,
        nombre_receptor,
        nombre_emisor,
        mail,
        mensaje,
    }

    let url = "http://localhost:5000/admin/"+id

    const options = {
        body: JSON.stringify(card),
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow'
    }
    fetch(url, options)
        .then(function () {
            console.log("modificado")
            alert("Registro modificado")
            window.location.href = "./admin.html";  
        //NUEVO,  si les da error el fetch  comentar esta linea que puede dar error  
        })
        .catch(err => {
            //this.errored = true
            console.error(err);
            alert("Error al Modificar")
        })      
}
