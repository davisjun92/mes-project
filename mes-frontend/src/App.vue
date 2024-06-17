<template>
  <div>
    <nav class="bg-gray-800 p-4 text-white">
      <router-link to="/" class="mr-4" active-class="text-blue-500">Dashboard</router-link>
      <router-link to="/production-tracking" class="mr-4" active-class="text-blue-500">Production Tracking</router-link>
      <router-link to="/quality-control" class="mr-4" active-class="text-blue-500">Quality Control</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import './main.css'

export default {}
</script>

<style src="./main.css"></style>
