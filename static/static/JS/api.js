
const { createApp} = Vue
const vueCard = createApp({
    data() {
        return {
            cargando: true,
            name:null,
            imageUrl: null,
            ingredients: null,
            details: null
        }
    },
    methods:{
        setcafes(name, imageUrl, ingredients, details){
            this.name = name
            this.imageUrl = imageUrl
            this.ingredients = ingredients
            this.details = details
        },
        setCargando(cargando) {
            this.cargando = cargando

        }

    }
}).mount("#api")

const getInfoAsync = async (id) => {
    try {
        const respuesta = await fetch(`https://64625b3c7a9eead6facd3d7d.mockapi.io/api/coffee/bebidas/${id}`)
        const respuestaJson = await respuesta.json()

       vueCard.setcafes(respuestaJson.name, respuestaJson.imageUrl, respuestaJson.ingredients, respuestaJson.details)
       vueCard.setCargando(false)


    } catch (error) { console.log("Hubo un error", error) }
}


const htmlLocation = window.location.href
const pageId = htmlLocation.split("?")[1]

getInfoAsync(pageId)








