import { createContext, useState } from 'react'

const themes = {
    
    dark: {
        backgroundColor: 'grey',
        color: 'white'
    },

    light: {
        backgroundColor: 'white',
        color: 'grey'
    },
}
export const ThemeContext = createContext(themes.light)

export const ThemeProvider = ({children}) => {

    const [isDark, setIsDark] = useState(false)
    const theme = isDark ? 'dark' : 'light'
    const toggleTheme = () => { console.log({isDark}); setIsDark(!isDark) }
    return (<ThemeContext.Provider value={{theme, isDark, toggleTheme}}>{children}</ThemeContext.Provider>)
}