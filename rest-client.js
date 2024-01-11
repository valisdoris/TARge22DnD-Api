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
    },
    chooseService() {
      const selectedService = {
        id: 1,
        name: 'Selected Service',
        price: 100,
        description: 'Service description',
      };
  
      // Update the route and navigate to the ServiceDetails component
      this.$router.push({
        path: '/service-details',
        query: { serviceId: selectedService.id },
      });
    }
  }
}).mount('#app')