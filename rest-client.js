const vue = Vue.createApp({
  data() {
    
    return {
      serviceInModal: {name: null},
      services : [],
      timeslotInModal: {
        name: null,
        price: null,
        date: null,
        times: null
      },
      timeslots : []

    }
  },
  async created() {
    this.services = await (await fetch('http://localhost:8090/services')).json();
    this.timeslots = await (await fetch('http://localhost:8090/timeslot')).json();
  },
  methods: {
    getService: async function (id) {
      this.serviceInModal = await (await fetch(`http://localhost:8090/services/${id}`)).json()
      let serviceInfoModal = new bootstrap.Modal(document.getElementById('serviceInfoModal'), {})
      serviceInfoModal.show()
    },

    getTimeslot: async function (serviceId) {
      this.timeslotInModal = await (await fetch(`http://localhost:8090/timeslot/${serviceId}`)).json()
      // const response = (await fetch(http://localhost:;
      // const serviceData = await response.json();

      // this.serviceInModal = serviceData;
      // this.timeslotInModal.name = this.serviceInModal.Name;
      
      let timeslotInfoModal = new bootstrap.Modal(document.getElementById('timeslotInfoModal'), {});
      timeslotInfoModal.show();
      
    },
    chooseService() {
      const selectedService = {
        id: 1,
        name: 'Selected Service',
        price: 100,
        description: 'Service description',
      };
        
    },
    
  
}
}).mount('#app')