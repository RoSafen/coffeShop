function guardar() {
    let valor = document.getElementById("valor").value
    let nombre_receptor = document.getElementById("nombre_receptor").value
    let nombre_emisor = document.getElementById("nombre_emisor").value
    let mail = document.getElementById("mail").value
    let mensaje = document.getElementById("mensaje").value

    let card = {
        valor,
        nombre_receptor,
        nombre_emisor,
        mail,
        mensaje,
    }

    let url = "https://rocioriveros.pythonanywhere.com/admin"
    var options = {
        body: JSON.stringify(card),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    }
    fetch(url, options)
        .then(response => response.json())
        .then(giftCard => {
            console.log("creado")
            alert("Tu tarjeta fue realizada con exito!")
            // Devuelve el href (URL) de la página actual
            window.location.href = "./gift_card_vista.html?"+giftCard.id;  
            // Handle response we get from the API
        })
        .catch(err => {
            //this.errored = true
            alert("Error al grabar" )
            console.error(err);
        })
}

