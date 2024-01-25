const app = Vue.createApp({
  data() {
    
    return {
      serviceInModal: {name: null},
      services : [],
      timeslotInModal: {date: null},
      //timeslot:[],
      timeslotsAlias: [],
      selectedTime: '',
      appointmentInModal: { serviceName: null, resDate: '', resTime: null, name: '', email: ''},
      appointmentForm: {
        resDate: '',
        resTime: null,
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

    showModal: async function (timeslotId) {
      console.log('Fetching timeslot data...');
      const response = await fetch(`http://localhost:8090/timeslot/${timeslotId}`);
      const data = await response.json();
      console.log('Timeslot data received:', data);
  
      this.timeslotInModal = data;
      
      console.log('Before showing modal');
      this.$nextTick(() => {
      let timeslotInfoModal = new bootstrap.Modal(document.getElementById('timeslotInfoModal'), {});
      timeslotInfoModal.show();
      });
      console.log('After showing modal');
      

    },

    getAppointment: async function (servicesId) {
      try {
        // Fetch service details
        const response = await fetch(`http://localhost:8090/services/${servicesId}`);
        const serviceData = await response.json();
    
        this.serviceInModal = serviceData

        this.appointmentInModal.servicesId = this.serviceInModal.id;
        this.appointmentInModal.serviceName = this.serviceInModal.name;
        this.appointmentInModal.resDate = this.appointmentInModal.resDate;
      this.appointmentInModal.resTime = this.appointmentInModal.resTime;       
    
            
        // Show the appointmentModal
        const appointmentModal = new bootstrap.Modal(document.getElementById('appointmentModal'), {});
        appointmentModal.show();

        const appointmentForm = document.getElementById('appointmentForm');
        
    appointmentForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);
      
      this.appointmentInModal.resDate = this.appointmentInModal.resDate;
      this.appointmentInModal.resTime = this.appointmentInModal.resTime;  
      formData.append('servicesId', this.appointmentInModal.servicesId);
// formData.append('resDate', this.appointmentForm.resDate);
// formData.append('resTime', this.appointmentForm.resTime);
// formData.append('name', this.appointmentForm.name);
// formData.append('email', this.appointmentForm.email);
this.appointmentForm.resDate = formData.get('resDate');
this.appointmentForm.resTime = formData.get('resTime');
this.appointmentForm.name = formData.get('name');
this.appointmentForm.email = formData.get('email');
      const response = await fetch(`http://localhost:8090/appointments`, {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            servicesId: this.appointmentInModal.servicesId,
            resDate: this.appointmentForm.resDate,
            resTime: this.appointmentForm.resTime,
            name: this.appointmentForm.name,
            email: this.appointmentForm.email,
          }),
      });

      const responseData = await response.json();
console.log(responseData);

        console.log(response);
        console.log('Appointment data:', this.appointmentInModal);
      })
      } catch (error) {
        console.error('Error fetching appointment data:', error);
      }
    },

    async submitAppointmentForm() {
      console.log('Submitting appointment form...');
      try {
        const formData = {
          servicesId: this.serviceInModal.id,
          resDate: this.appointmentForm.resDate,
          resTime: this.appointmentForm.resTime,
          name: this.appointmentForm.name,
          email: this.appointmentForm.email,
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
});
const vue = app.mount('#app');