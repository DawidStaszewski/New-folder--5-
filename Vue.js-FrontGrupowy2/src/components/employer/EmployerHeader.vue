<template>
  <div
    class="w-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 text-white p-6 flex items-center justify-between shadow-lg">
    <!-- User Information -->
    <div class="flex items-center space-x-4">
      <div>
        <p class="text-lg font-semibold">Jan Kowalski</p>
        <p class="text-sm text-gray-400">Student</p>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "EmployerHeader",
};
</script>

<style scoped>
.bg-gradient-to-r {
  background-image: linear-gradient(to right, #1f2937, #2d3748, #1f2937);
}
</style>