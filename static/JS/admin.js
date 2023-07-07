const { createApp } = Vue

  createApp({
    data() {
      return {
        url:"https://rocioriveros.pythonanywhere.com/admin",
        cards:[],
        error:false,
        cargando:true
      }
    },
    // Se llama después de que la instancia haya 
    // terminado de procesar todas las opciones relacionadas con el estado.
    created() {
        this.fetchData(this.url)
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.cards = data;
                    this.cargando=false
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },


        eliminar(card) {
            const url = 'https://rocioriveros.pythonanywhere.com/admin/' + card;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
                    location.reload();
                })
        }

    },
    


  }).mount('#app')