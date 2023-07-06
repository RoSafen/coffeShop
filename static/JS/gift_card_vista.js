const { createApp} = Vue



const vueCard = createApp({
    data() {
        return {
            url:"http://127.0.0.1:5000/admin",
            card,
            error:false,
            cargando: true
        }
    },

    created(){
        const htmlLocation = window.location.href;
        const pageId = htmlLocation.split("?")[1];
        this.mostrar(pageId)
    },
    methods: {

        mostrar(id) {
            const url = this.url +"/"+ id;

            fetch(url)
            .then(response => response.json())
            .then(data => {
                this.card = data;
                this.cargando = false
            })
            .catch(err => {
                console.error(err);
                this.error=true              
            })
              
        }
    }
}).mount("#card")















