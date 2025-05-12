<template>
  <div class="settings-panel">
    <h2>Timer Settings</h2>
    
    <div class="settings-group">
      <h3>Duration (minutes)</h3>
      <div class="setting-item">
        <label for="pomodoro-duration">Pomodoro:</label>
        <input 
          type="number" 
          id="pomodoro-duration"
          v-model.number="localSettings.pomodoroDuration"
          min="1"
          max="60"
        >
      </div>
      
      <div class="setting-item">
        <label for="short-break-duration">Short Break:</label>
        <input 
          type="number" 
          id="short-break-duration"
          v-model.number="localSettings.shortBreakDuration"
          min="1"
          max="30"
        >
      </div>
      
      <div class="setting-item">
        <label for="long-break-duration">Long Break:</label>
        <input 
          type="number" 
          id="long-break-duration"
          v-model.number="localSettings.longBreakDuration"
          min="1"
          max="60"
        >
      </div>
    </div>

    <div class="settings-group">
      <h3>Auto Start</h3>
      <div class="setting-item">
        <label>
          <input 
            type="checkbox" 
            v-model="localSettings.autoStartPomodoros"
          >
          Auto-start Pomodoros
        </label>
      </div>
      
      <div class="setting-item">
        <label>
          <input 
            type="checkbox" 
            v-model="localSettings.autoStartBreaks"
          >
          Auto-start Breaks
        </label>
      </div>
    </div>

    <div class="settings-actions">
      <button @click="saveSettings">Save Settings</button>
      <button @click="resetSettings">Reset to Default</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTimerStore } from '@/stores/timer'

const timerStore = useTimerStore()

interface LocalSettings {
  pomodoroDuration: number
  shortBreakDuration: number
  longBreakDuration: number
  autoStartBreaks: boolean
  autoStartPomodoros: boolean
}

const localSettings = ref<LocalSettings>({
  pomodoroDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  autoStartBreaks: false,
  autoStartPomodoros: false
})

onMounted(() => {
  localSettings.value = { ...timerStore.settings }
})

const saveSettings = () => {
  timerStore.updateSettings(localSettings.value)
}

const resetSettings = () => {
  localSettings.value = {
    pomodoroDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    autoStartBreaks: false,
    autoStartPomodoros: false
  }
  timerStore.updateSettings(localSettings.value)
}
</script>

<style scoped>
.settings-panel {
  max-width: 400px;
  margin: 1rem auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.settings-group {
  margin: 1rem 0;
}

.setting-item {
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
}

.setting-item label {
  flex: 1;
}

.setting-item input[type="number"] {
  width: 60px;
  padding: 0.25rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.settings-actions {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
}

.settings-actions button {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
}

.settings-actions button:first-child {
  background: #42b883;
  color: white;
  border-color: #42b883;
}
</style> 