



const { createApp } = Vue
const vueCarga = createApp({
    data() {
        return {
            cargando: true,
            mapa: `"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.8091456406705!2d-58.39242502477259!3d-34.583695456440104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccaa12e375b6d%3A0x3f9f935dc99bf4fb!2sCentro%20de%20Convenciones%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1684799333349!5m2!1ses!2sar"`
        }
    },

    mounted() {
        
        this.cargando = false
    }
}).mount("#map")








