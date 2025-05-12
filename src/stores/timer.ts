import { defineStore } from 'pinia'

interface TimerSettings {
  pomodoroDuration: number
  shortBreakDuration: number
  longBreakDuration: number
  autoStartBreaks: boolean
  autoStartPomodoros: boolean
}

interface TimerState {
  minutes: number
  seconds: number
  isRunning: boolean
  mode: 'pomodoro' | 'shortBreak' | 'longBreak'
  completedPomodoros: number
  settings: TimerSettings
}

export const useTimerStore = defineStore('timer', {
  state: (): TimerState => ({
    minutes: 25,
    seconds: 0,
    isRunning: false,
    mode: 'pomodoro',
    completedPomodoros: 0,
    settings: {
      pomodoroDuration: 25,
      shortBreakDuration: 5,
      longBreakDuration: 15,
      autoStartBreaks: false,
      autoStartPomodoros: false
    }
  }),

  getters: {
    formattedTime: (state): string => {
      const minutes = state.minutes.toString().padStart(2, '0')
      const seconds = state.seconds.toString().padStart(2, '0')
      return `${minutes}:${seconds}`
    }
  },

  actions: {
    startTimer() {
      this.isRunning = true
    },

    pauseTimer() {
      this.isRunning = false
    },

    resetTimer() {
      this.isRunning = false
      this.minutes = this.settings.pomodoroDuration
      this.seconds = 0
    },

    setMode(mode: 'pomodoro' | 'shortBreak' | 'longBreak') {
      this.mode = mode
      this.isRunning = false
      
      switch (mode) {
        case 'pomodoro':
          this.minutes = this.settings.pomodoroDuration
          break
        case 'shortBreak':
          this.minutes = this.settings.shortBreakDuration
          break
        case 'longBreak':
          this.minutes = this.settings.longBreakDuration
          break
      }
      this.seconds = 0

      // Auto-start if enabled
      if ((mode === 'pomodoro' && this.settings.autoStartPomodoros) ||
          (mode !== 'pomodoro' && this.settings.autoStartBreaks)) {
        this.startTimer()
      }
    },

    decrementTime() {
      if (this.seconds > 0) {
        this.seconds--
      } else if (this.minutes > 0) {
        this.minutes--
        this.seconds = 59
      } else {
        this.handleTimerComplete()
      }
    },

    handleTimerComplete() {
      if (this.mode === 'pomodoro') {
        this.completedPomodoros++
        if (this.completedPomodoros % 4 === 0) {
          this.setMode('longBreak')
        } else {
          this.setMode('shortBreak')
        }
      } else {
        this.setMode('pomodoro')
      }
    },

    updateSettings(newSettings: Partial<TimerSettings>) {
      this.settings = { ...this.settings, ...newSettings }
      // Update current timer if it's not running
      if (!this.isRunning) {
        this.setMode(this.mode)
      }
    }
  }
}) 