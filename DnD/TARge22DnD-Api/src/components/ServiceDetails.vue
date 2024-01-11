<template>
  <div>
    <h2>Service Details</h2>
    <table class="table table-striped">
      <!-- Display details about the selected service -->
      <tr><th>ID</th><td>{{ service.id }}</td></tr>
      <tr><th>Name</th><td>{{ service.name }}</td></tr>
      <tr><th>Price</th><td>{{ service.price }}</td></tr>
      <tr><th>Description</th><td>{{ service.description }}</td></tr>
    </table>

    <h3>Dates and Times</h3>
    <!-- Display a table of dates and times for the selected service -->
    <!-- Add your logic here to display the dates and times -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      service: {} // Assuming you pass the selected service as a prop
    };
  },
};
</script>
