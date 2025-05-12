<template>
  <div class="pomodoro-timer">
    <div class="timer-display">
      <h1>{{ timerStore.formattedTime }}</h1>
      <div class="mode-indicator">{{ currentModeLabel }}</div>
    </div>

    <div class="controls">
      <button 
        @click="toggleTimer" 
        :class="{ 'active': timerStore.isRunning }"
      >
        {{ timerStore.isRunning ? 'Pause' : 'Start' }}
      </button>
      <button @click="timerStore.resetTimer">Reset</button>
      <button @click="showSettings = !showSettings">Settings</button>
    </div>

    <div class="mode-selector">
      <button 
        @click="timerStore.setMode('pomodoro')"
        :class="{ active: timerStore.mode === 'pomodoro' }"
      >
        Pomodoro
      </button>
      <button 
        @click="timerStore.setMode('shortBreak')"
        :class="{ active: timerStore.mode === 'shortBreak' }"
      >
        Short Break
      </button>
      <button 
        @click="timerStore.setMode('longBreak')"
        :class="{ active: timerStore.mode === 'longBreak' }"
      >
        Long Break
      </button>
    </div>

    <div class="stats">
      <p>Completed Pomodoros: {{ timerStore.completedPomodoros }}</p>
    </div>

    <Transition name="fade">
      <TimerSettings v-if="showSettings" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useTimerStore } from '@/stores/timer'
import TimerSettings from './TimerSettings.vue'

const timerStore = useTimerStore()
let timerInterval: number | null = null
const showSettings = ref(false)

const currentModeLabel = computed(() => {
  switch (timerStore.mode) {
    case 'pomodoro':
      return 'Focus Time'
    case 'shortBreak':
      return 'Short Break'
    case 'longBreak':
      return 'Long Break'
    default:
      return ''
  }
})

const toggleTimer = () => {
  if (timerStore.isRunning) {
    timerStore.pauseTimer()
    if (timerInterval) {
      clearInterval(timerInterval)
      timerInterval = null
    }
  } else {
    timerStore.startTimer()
    timerInterval = window.setInterval(() => {
      timerStore.decrementTime()
    }, 1000)
  }
}

onMounted(() => {
  // Initialize timer
})

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval)
  }
})
</script>

<style scoped>
.pomodoro-timer {
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
  text-align: center;
}

.timer-display h1 {
  font-size: 3rem;
  margin: 1rem 0;
}

.controls, .mode-selector {
  margin: 1rem 0;
}

button {
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
}

button.active {
  background: #42b883;
  color: white;
  border-color: #42b883;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 