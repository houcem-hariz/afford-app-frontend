import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeProvider';

export default function ToggleThemeButton(props) {
    const { theme, isDark, toggleTheme } = useContext(ThemeContext);
    const handleToggleTheme = () => {
        toggleTheme()
        props.handleToggleTheme(theme)
    } 
    return (
        <div className='toggle-theme-button'>
            <input type="checkbox" className="checkbox" id="checkbox" onChange={handleToggleTheme}/>
                <label htmlFor="checkbox" className="label">
                    <i className="bi bi-moon-fill"></i>
                    <i className='bi bi-brightness-high-fill'></i>
                    <div className='ball' />
                </label>
        </div>
    )
}
