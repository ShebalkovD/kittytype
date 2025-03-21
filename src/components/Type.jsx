import {useState, useRef, useEffect} from 'react'
import themes from '../assets/theme.js'
import cats from '../assets/cat.js'
import HeaderModal from './HeaderModal.jsx'

export default function Type() {
    let INITIAL_TEXT = 'запуск импонировать город насидеть котики непреклонный собачки перевесить профинтить следуемый'
    const textArray = INITIAL_TEXT.split('')

    const textlineRef =  useRef(null)
    const [counter, setCounter] = useState(0)
    const [mistakeCounter, setMistakeCounter] = useState(0)
    const [shift, setShift] = useState(0)
    const [theme, setTheme] = useState(themes.dark)
    const [catConfig, setCatConfig] = useState(cats.gray)
    const [catImg, setCatImg] = useState(catConfig.default)
    const [mistake, setMistake] = useState(false)
    const timeRef = useRef(30)
    const [time, setTime] = useState(timeRef.current)
    const timerIdRef = useRef(null)
    const [gameStarted, setGameStarted] = useState(false)
    const [showResult, setShowResult] = useState(false)

    const [showThemeMenu, setShowThemeMenu] = useState(false)
    let currentSymbol = textArray[counter]

    const handleKeyDown = (event) => {
        if (event.key == currentSymbol) {
            setMistake(false)
            if (counter == 0) {
                setCatImg(catConfig.left)
                setGameStarted(true)
                console.log('первый')
            }
            setShift(prev => prev + textlineRef.current.childNodes[counter].offsetWidth)
            setCounter(prev => prev + 1)
            currentSymbol = textArray[counter]
            if (counter == 0) {
                setCatImg(catConfig.left)
            }
            catImg == catConfig.left ? setCatImg(catConfig.right) : setCatImg(catConfig.left)
        }else {
            if (event.code === 'Enter' && (event.ctrlKey || event.metaKey)) {
                restart()
            }else {
                setMistake(true)
                setCatImg(catConfig.default)
                setMistakeCounter(prev => prev + 1)
            }
        }
    }

    const restart = () => {
        setCounter(0)
        setMistakeCounter(0)
        setCatImg(catConfig.default)
        setShift(0)
        setTime(timeRef.current)
        setShowResult(false)
        setGameStarted(false)
    }

    const startTimer = () => {
        let counter = timeRef.current
        timerIdRef.current = setInterval(() => {
            if (counter > 0) {
                counter -= 1
                setTime(counter) 
            }else {
                setGameStarted(false)
                setShowResult(true)
            }

        }, 1000)  
    }

    useEffect(() => {
        if (gameStarted) {
            startTimer()
        }

        return () => clearInterval(timerIdRef.current)
        
    }, [gameStarted])

    return(
        <div onKeyDown={handleKeyDown} tabIndex={0}>
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
                        <button onClick={() => showThemeMenu ? setShowThemeMenu(false) : setShowThemeMenu(true)} className="header-button hover:cursor-pointer relative w-[3.2rem] h-[3.2rem]">
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
        <main 
            className="min-h-[calc(100vh-6rem)]"
            style={{backgroundColor: theme.background}}
        >
            {!showResult 
                ? (<div className="container flex flex-col items-center justify-start min-h-full">
                    <div className="timer-wrapper flex justify-center items-center">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="20" cy="21" r="14" fill={theme.text}/>
                            <path d="M20 13V20.382C20 20.7607 20.214 21.107 20.5528 21.2764L26 24" stroke={theme.background} strokeWidth="2" strokeLinecap="round"/>
                            <path d="M7 9L13 5M7 9L13 5" stroke={theme.text} strokeWidth="4" strokeLinecap="round"/>
                            <path d="M33 9L27 5M33 9L27 5" stroke={theme.text} strokeWidth="4" strokeLinecap="round"/>
                        </svg>
                        <span 
                            className="timer ml-2 font-normal text-[1.25rem] transition-transform duration-100 ease-in-out" 
                            style={{color: theme.text, transform: `translateX(${time > 9 ? 0 : 1})rem`}}
                        >
                            {time}
                        </span>
                    </div>
    
                    <div className="mt-[25vh] flex flex-col justify-center items-center w-[100%]">
                        <img 
                            className="block w-12"
                            src={catImg} 
                        />
    
                        <div className="text-line-wrapper relative w-full h-fit">
                            <div className="text-line-start lg:w-10 w-20 h-full absolute top-0 left-0 z-20 rounded-[100%]" style={{background: `linear-gradient(90deg, ${theme.header} 50%,  rgba(0,0,0,0) 100%)`}}></div>
                            <div className="text-line-end lg:w-10 w-20 h-full absolute top-0 right-0 z-20 rounded-[100%]" style={{background: `linear-gradient(90deg, rgba(0,0,0,0) 0%, ${theme.header} 50%)`}}></div>
                            
                            <div
                                className="text-line relative w-full h-16 lg:h-12 overflow-hidden rounded-full z-5"
                                style={{backgroundColor: theme.header, border: `2px solid ${theme.header}`}}
                            >
    
                                <div 
                                    className={`wrapper absolute top-1 w-fit whitespace-nowrap transition-transform duration-50 ease-linear z-10`}
                                    ref={textlineRef}
                                    style={{transform: `translateX(calc(-${shift}px))`, left: '50%'}}
                                >
                                    {textArray.map((symbol, index) => 
                                        (<span 
                                            key={index} 
                                            style={{opacity: index >= counter ? 0.8 : 1, position: 'relative', color: theme.text, overflow: 'visible'}}
                                            className={
                                                index == counter && mistake
                                                ? `current-symbol symbol text-mistake text-[2rem] lg:text-[1.5rem]`
                                                : index == counter && !mistake
                                                    ? `current-symbol symbol text-[2rem] lg:text-[1.5rem]`
                                                    : "text-[2rem] lg:text-[1.5rem]"
                                            }
                                        >
                                            <div className="symbol-cursor" style={{backgroundColor: theme.accent}}></div>
                                            {symbol}
                                        </span>)
                                    )}
                                </div>
                            </div>
                        </div>
                        
    
                    </div>
    
                    {
                        gameStarted ? (<div 
                            className="restart mt-[10vh] hover:cursor-pointer text-center flex flex-col justify-center items-center hover:[&>svg]:opacity-100 hover:[&>p]:opacity-0 hover:[&>p]:translate-y-1"
                            onClick={restart}
                        >
                            <svg className="opacity-10 transition-opacity duration-200 ease-in-out" width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M36.364 20.636C31.6777 15.9497 24.0797 15.9497 19.3934 20.636C14.7071 25.3223 14.7071 32.9203 19.3934 37.6066C24.0797 42.2929 31.6777 42.2929 36.364 37.6066" stroke={theme.text} strokeWidth="4" strokeLinecap="round"/>
                                <path d="M37.412 15.6787L30.9082 22.2251C30.2755 22.8621 30.7375 23.9455 31.6352 23.9298L38.2517 23.8138C38.8039 23.8041 39.2437 23.3486 39.234 22.7964L39.1213 16.366C39.1058 15.4821 38.0351 15.0516 37.412 15.6787Z" fill={theme.text}/>
                            </svg>
                            <p className="opacity-10 text-[0.8rem] font-bold translate-x-0.5 transition-all duration-200 ease-in-out" style={{color: theme.text}}>Ctrl + Enter</p>
                        </div>) 
                        : (
                            <p className="mt-[1vh] opacity-20 text-[1rem] font-normal translate-x-0.5 transition-all duration-200 ease-in-out" style={{color: theme.text}}>Начните печатать, чтобы запустить тренажер</p>
                        )
                    }
                </div>)
                : (
                    <div className="result w-[20%] mx-auto p-8 rounded-2xl relative top-[30vh]" style={{backgroundColor: theme.header, color: theme.text}}>
                        <p>Скорость печати: <span style={{color: theme.accent}}>{counter * 2}</span> с/м</p>
                        <p>Ошибки: <span style={{color: theme.accent}}> {mistakeCounter}</span></p>
                        <button onClick={restart} style={{backgroundColor: theme.accent}}>Заново</button>
                    </div>
                )
            }
            
        </main>
        </div>
    )
}