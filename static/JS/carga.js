const { createApp } = Vue

const vueMenu = createApp({
    data() {
        return {
            bebidas: [],
            cargando: true
        }
    },

    methods: {
        setBebidas(bebidas) {
            this.bebidas = bebidas

        },
        setCargando(cargando) {
            this.cargando = cargando

        }
    },

}).mount("#menu")

const getAllDrinks = async () => {
    try {
        const respuesta = await fetch(`https://64625b3c7a9eead6facd3d7d.mockapi.io/api/coffee/bebidas`)
        const bebidas = await respuesta.json()
        vueMenu.setBebidas(bebidas)
        vueMenu.setCargando(false)
    } catch (error) { console.log("Hubo un error", error) }

}

getAllDrinks();


