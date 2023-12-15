const vue = Vue.createApp({
  data() {
    
    return {
      serviceInModal: {name: null},
      services : []
    }
  },
  async created() {
    this.services = await (await fetch('http://localhost:8090/services')).json();
  },
  methods: {
    getService: async function (id) {
      this.serviceInModal = await (await fetch(`http://localhost:8090/services/${id}`)).json()
      let serviceInfoModal = new bootstrap.Modal(document.getElementById('serviceInfoModal'), {})
      serviceInfoModal.show()
    }
  }
}).mount('#app')