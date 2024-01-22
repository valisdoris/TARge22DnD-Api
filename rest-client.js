const vue = Vue.createApp({
  data() {
    
    return {
      serviceInModal: {name: null},
      services : [],
      timeslotInModal: {id: null, date: null, times: null},
      timeslot:[],
      timeslotsAlias: [],
      selectedTime: '',
      appointmentInModal: { serviceName: null },
      appointmentForm: {
        date: '',
        time: null,
        name: '',
        email: '',
        servicesId: null,
      },
      appointment: []

    }
  },
  async created() {
    this.services = await (await fetch('http://localhost:8090/services')).json();
    //this.timeslot = await (await fetch('http://localhost:8090/timeslot')).json();
    this.appointments = await (await fetch('http://localhost:8090/appointments')).json();
    this.timeslotsAlias = await (await fetch('http://localhost:8090/timeslot')).json();

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

    showModal: async function (id) {
      console.log('Fetching timeslot data...');
      const response = await fetch(`http://localhost:8090/timeslot/${id}`);
      const data = await response.json();
      console.log('Timeslot data received:', data);
  
      this.timeslotInModal = data;
  
      let timeslotInfoModal = new bootstrap.Modal(document.getElementById('timeslotInfoModal'), {});
      timeslotInfoModal.show();
      // this.appointmentForm.time = this.selectedTime;
      // $('#appointmentModal').modal('show');

    },

    getTimeslot: async function (timeslotId) {
      this.timeslotInModal = await (await fetch(`http://localhost:8090/timeslots/${timeslotId}`)).json()
      
      
      let timeslotInfoModal = new bootstrap.Modal(document.getElementById('timeslotInfoModal'), {});
      timeslotInfoModal.show();
      
    },
    
    getAppointment: async function (serviceId) {
      try {
        // Fetch service details
        const response = await fetch(`http://localhost:8090/services/${serviceId}`);
        const serviceData = await response.json();
    
        this.serviceInModal = serviceData

        this.appointmentInModal.serviceId = this.serviceInModal.id;
        this.appointmentInModal.serviceName = this.serviceInModal.name;
        
    
            
        // Show the appointmentModal
        const appointmentModal = new bootstrap.Modal(document.getElementById('appointmentModal'), {});
        appointmentModal.show();
    
        console.log('Appointment data:', this.appointmentInModal);
      } catch (error) {
        console.error('Error fetching appointment data:', error);
      }
    },

    async submitAppointmentForm() {
      console.log('Submitting appointment form...');
      try {
        const formData = {
          ServicesId: this.serviceInModal.Id,
          Name: this.appointmentForm.name,
          Email: this.appointmentForm.email,
          Date: this.appointmentForm.date,
          Time: this.appointmentForm.time,
        }

        const response = await fetch('http://localhost:8090/appointments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        console.log('Appointment submitted successfully. Response:', result);
        if (result.success) {
          alert(`Appointment submitted successfully. Your appointment ID is: ${result.appointmentId}`);
        } else {
          console.error('Error submitting booking:', error);
        }
      } catch (error) {
        console.error('Error submitting appointment:', error);
      }
      this.resetAppointmentForm();
    },
    
    resetAppointmentForm() {
      this.appointmentForm = {
        servicesId: null,
        date: null,
        time: null,
        name: '',
        email: ''
      };
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