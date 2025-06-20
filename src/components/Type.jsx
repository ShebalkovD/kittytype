import {useState, useRef, useEffect} from 'react'
import themes from '../assets/theme.js'
import cats from '../assets/cat.js'
import Header from './Header.jsx'
import Textline from './Textline.jsx'

function Type() {
    const INITIAL_TEXT = 'запуск импонировать город насидеть котики непреклонный собачки перевесить профинтить следуемый'
    
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

    useEffect(() => setCatConfig(cats.gray), [])

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
        <Header theme={theme} setTheme = {setTheme}/>
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
                        <Textline theme={theme}  shift={shift} counter={counter} textArray={textArray} mistake={mistake} ref={textlineRef}/>
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

export default Type