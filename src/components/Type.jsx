import {useState, useRef, useEffect} from 'react'
import themes from '../assets/theme.js'
import cats from '../assets/cat.js'
import Header from './Header.jsx'
import Textline from './Textline.jsx'
import Result from './Result.jsx'
import TypeLayout from './TypeLayout.jsx'

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
            ?   <TypeLayout 
                    theme={theme}
                    restart={restart}
                    catImg={catImg}
                    time={time}
                    gameStarted={gameStarted} 
                >
                    <Textline
                        theme={theme} 
                        shift={shift}
                        counter={counter}
                        textArray={textArray}
                        mistake={mistake}
                        ref={textlineRef}
                    />
                </TypeLayout>
            :   <Result 
                    theme={theme}
                    counter={counter}
                    mistakeCounter={mistakeCounter}
                    restart={restart} 
                />
        }
        </main>
        </div>
    )
}

export default Type