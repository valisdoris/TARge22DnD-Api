<template>
  <div>
    <h2>Service Details</h2>
    <table class="table table-striped">
      <tr><th>ID</th><td>{{ service.id }}</td></tr>
      <tr><th>Name</th><td>{{ service.name }}</td></tr>
      <tr><th>Price</th><td>{{ service.price }}</td></tr>
      <tr><th>Description</th><td>{{ service.description }}</td></tr>
    </table>

    <h3>Dates and Times</h3>
  </div>
</template>

<script>
export default {
  props: ['serviceId'],
  data() {
    return {
      service: {},
    };
  },
  watch: {
    // Watch for changes in the route and load data accordingly
    $route(to, from) {
      this.loadServiceDetails();
    },
  },
  mounted() {
    // Load service details when the component is mounted
    this.loadServiceDetails();
  },
  methods: {
    loadServiceDetails() {
      // Use this.serviceId to fetch service details from your data source
      // For now, simulate fetching data
      this.service = {
        id: this.serviceId,
        name: 'Sample Service',
        price: 20.0,
        description: 'Sample service description',
        // Fetch actual data based on this.serviceId from your data source
      };
    },
  },
};
</script>

<style>
/* Add your styles here */
</style>
