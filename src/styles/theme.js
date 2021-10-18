import { rhythm } from "../utils/typography"

export const Theme = {
    // most dark
    Dark00: '#000000',
    Dark25: '#212121',
    Dark50: '#424242',
    Dark75: '#616161',
    // least dark
    Dark100: '#E0E0E0',
}

// Style fragments
export const SF = {
    darkText: {
        color: Theme.Dark100
    },
    darkBackground: {
        backgroundColor: Theme.Dark25
    },
    button: {
        color: Theme.Dark100,
        backgroundColor: Theme.Dark50,
        minWidth: `15%`,
        border: 0,
        padding: 0,
    },
    logoButton: {
        boxShadow: `none`,
        marginRight: `8px`,
    }
}