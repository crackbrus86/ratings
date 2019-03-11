export interface ShellState{
    currentDate: Date
}

const defaultState = {
    currentDate: new Date()
} as ShellState