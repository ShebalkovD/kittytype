import { useState } from 'react'
import HeaderModal from './HeaderModal.jsx'
import themes from '../assets/theme.js'

function Header({theme, setTheme}) {

    const [showThemeMenu, setShowThemeMenu] = useState(false)

    return (
       <header
            className="w-full h-24"
            style={{backgroundColor: theme.header}}
        >
            <div className="container h-full flex items-center justify-between">
                <h1 className="logo text-4xl font-bold" style={{color: theme.text}}>
                    KITTY
                    <span style={{color: theme.accent}}>type</span>
                </h1>

                <div className="header-buttons">
                    <div className="button-wrapper w-[3.2rem] h-[3.2rem] relative">
                        <button tabIndex={-1} onClick={() => showThemeMenu ? setShowThemeMenu(false) : setShowThemeMenu(true)} className="header-button hover:cursor-pointer relative w-[3.2rem] h-[3.2rem]">
                            <svg style={{'--accent-color': theme.accent}} className={`hover:[&>path]:fill-[var(--accent-color)]`} width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="27" cy="27" r="27" fill={theme.background}/>
                                <path style={{'--text-color': theme.text}} className={`fill-[var(--text-color)] transition-all duration-200 ease-in-out`} fillRule="evenodd" clipRule="evenodd" d="M27 9.08334C27.6903 9.08334 28.25 9.64299 28.25 10.3333V12C28.25 12.6904 27.6903 13.25 27 13.25C26.3097 13.25 25.75 12.6904 25.75 12V10.3333C25.75 9.64299 26.3097 9.08334 27 9.08334ZM14.331 14.331C14.8192 13.8429 15.6106 13.8429 16.0988 14.331L16.7535 14.9858C17.2417 15.4739 17.2417 16.2654 16.7535 16.7535C16.2654 17.2417 15.4739 17.2417 14.9858 16.7535L14.331 16.0988C13.8429 15.6106 13.8429 14.8192 14.331 14.331ZM39.6685 14.3315C40.1567 14.8196 40.1567 15.6111 39.6685 16.0992L39.0138 16.754C38.5257 17.2421 37.7342 17.2421 37.246 16.754C36.7578 16.2658 36.7578 15.4743 37.246 14.9862L37.9008 14.3315C38.389 13.8433 39.1803 13.8433 39.6685 14.3315ZM27 18.25C22.1675 18.25 18.25 22.1675 18.25 27C18.25 31.8325 22.1675 35.75 27 35.75C31.8325 35.75 35.75 31.8325 35.75 27C35.75 22.1675 31.8325 18.25 27 18.25ZM15.75 27C15.75 20.7868 20.7868 15.75 27 15.75C33.2132 15.75 38.25 20.7868 38.25 27C38.25 33.2132 33.2132 38.25 27 38.25C20.7868 38.25 15.75 33.2132 15.75 27ZM9.08334 27C9.08334 26.3097 9.64299 25.75 10.3333 25.75H12C12.6904 25.75 13.25 26.3097 13.25 27C13.25 27.6903 12.6904 28.25 12 28.25H10.3333C9.64299 28.25 9.08334 27.6903 9.08334 27ZM40.75 27C40.75 26.3097 41.3097 25.75 42 25.75H43.6667C44.357 25.75 44.9167 26.3097 44.9167 27C44.9167 27.6903 44.357 28.25 43.6667 28.25H42C41.3097 28.25 40.75 27.6903 40.75 27ZM37.246 37.246C37.7342 36.7578 38.5257 36.7578 39.0138 37.246L39.6685 37.9008C40.1567 38.389 40.1567 39.1803 39.6685 39.6685C39.1803 40.1567 38.389 40.1567 37.9008 39.6685L37.246 39.0138C36.7578 38.5257 36.7578 37.7342 37.246 37.246ZM16.7535 37.2465C17.2417 37.7347 17.2417 38.5262 16.7535 39.0143L16.0988 39.669C15.6106 40.1572 14.8192 40.1572 14.331 39.669C13.8429 39.1808 13.8429 38.3893 14.331 37.9012L14.9858 37.2465C15.4739 36.7583 16.2654 36.7583 16.7535 37.2465ZM27 40.75C27.6903 40.75 28.25 41.3097 28.25 42V43.6667C28.25 44.357 27.6903 44.9167 27 44.9167C26.3097 44.9167 25.75 44.357 25.75 43.6667V42C25.75 41.3097 26.3097 40.75 27 40.75Z"/>
                            </svg>
                        </button>
                        {showThemeMenu && (<HeaderModal list={themes} theme={theme} handleClick={setTheme}/>)}
                    </div>
                </div>
            </div>

            
        </header> 
    ) 
}

export default Header