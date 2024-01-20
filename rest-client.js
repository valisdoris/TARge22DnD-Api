const vue = Vue.createApp({
  data() {
    
    return {
      serviceInModal: {name: null},
      services : [],
      timeslotInModal: {name: null},
      timeslots:[],
      selectedTime: '',
      appointmentForm: {
        date: '',
        time: null,
        name: '',
        email: '',
        selectedTime: null,
      },
      appointments : []

    }
  },
  async created() {
    this.services = await (await fetch('http://localhost:8090/services')).json();
    this.timeslots = await (await fetch('http://localhost:8090/timeslot')).json();
    this.appointments = await (await fetch('http://localhost:8090/appointment')).json();

  },
  methods: {
    getService: async function (id) {
      this.serviceInModal = await (await fetch(`http://localhost:8090/services/${id}`)).json()
      let serviceInfoModal = new bootstrap.Modal(document.getElementById('serviceInfoModal'), {})
      serviceInfoModal.show()
    },

    selectTime(time) {
      this.selectedTime = time;
    },

    setAppointmentTime() {
      this.appointmentForm.time = this.selectedTime;
      $('#appointmentModal').modal('show');

    },

    getTimeslot: async function (timeslotId) {
      this.timeslotInModal = await (await fetch(`http://localhost:8090/timeslot/${timeslotId}`)).json()
      // const response = (await fetch(http://localhost:;
      // const serviceData = await response.json();

      // this.serviceInModal = serviceData;
      // this.timeslotInModal.name = this.serviceInModal.Name;
      
      let timeslotInfoModal = new bootstrap.Modal(document.getElementById('timeslotInfoModal'), {});
      timeslotInfoModal.show();
      
    },
    // getAppointment: async function (appointmentId) {
    //   this.appointmentInModal = await (await fetch(`http://localhost:8090/appointments/${appointmentId}`)).json()
      
      
    //   // request service based on serviceid from appointment.
    //   // request all entries from timeslot

    //   // hold service id in its own variable
    //   // hold users

    //   let appointmentInfoModal = new bootstrap.Modal(document.getElementById('appointmentInfoModal'), {});
    //   appointmentInfoModal.show();
      
    // },



    getAppointment: async function (appointmentId) {
      try {
        const response = await fetch(`http://localhost:8090/appointments/${appointmentId}`);
        const appointmentData = await response.json();
    
        this.appointmentInModal = appointmentData;
    
        const appointmentModal = new bootstrap.Modal(document.getElementById('appointmentModal'), {});
        appointmentModal.show();
    
        console.log('Appointment data:', this.appointmentInModal);
      } catch (error) {
        console.error('Error fetching appointment data:', error);
      }
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