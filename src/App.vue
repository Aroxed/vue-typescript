<script setup lang="ts">
import PomodoroTimer from './components/PomodoroTimer.vue'
</script>

<template>
  <header>
    <h1>Vue TypeScript Pomodoro Timer</h1>
  </header>

  <main>
    <PomodoroTimer />
  </main>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background-color: #f5f5f5;
}

#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 2rem;
}

header {
  margin-bottom: 2rem;
}

header h1 {
  color: #42b883;
  font-size: 2.5rem;
  margin: 0;
}
</style>
