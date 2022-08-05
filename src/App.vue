<script setup>
  import { ref, computed } from 'vue'
  import HelloWorld from './components/HelloWorld.vue'
  import Register from './pages/register/register-page.vue'

  const routes = {
    '/': HelloWorld,
    '/register': Register,
  }

  const currentPath = ref(window.location.hash)

  window.addEventListener('hashchange', () => {
    currentPath.value = window.location.hash
  })

  const currentView = computed(() => {
    return routes[currentPath.value.slice(1) || '/'] || HelloWorld
  })
</script>

<template>
  <a href="#/">Home</a> | <a href="#/register">Register</a> |
  <component :is="currentView" />
</template>
