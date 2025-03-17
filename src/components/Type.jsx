import {useState, useRef, useEffect} from 'react'
import themes from '../assets/theme.js'
import cats from '../assets/cat.js'


export default function Type() {
    let INITIAL_TEXT = 'запуск импонировать город насидеть котики непреклонный собачки перевесить профинтить следуемый'
    const textArray = INITIAL_TEXT.split('')

    const textlineRef =  useRef(null)
    const [counter, setCounter] = useState(0)
    const [shift, setShift] = useState(0)
    const [theme, settheme] = useState(themes.dark)
    const [catConfig, setCatConfig] = useState(cats.gray)
    const [catImg, setCatImg] = useState(catConfig.default)
    let currentSymbol = textArray[counter]

    const handleKeyDown = (event) => {
        if (event.key == currentSymbol) {
            if (counter == 0) {
                setCatImg(catConfig.left)
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
                setCatImg(catConfig.default)
            }
        }
    }

    const restart = () => {
        setCounter(0)
        setCatImg(catConfig.default)
        setShift(0)
    }

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
            </div>
        </header>
        <main 
            className=""
            style={{backgroundColor: theme.background}}
        >
            <div className="container flex items-center justify-center min-h-[calc(100vh-6rem)]">
                <div className="flex flex-col justify-center items-center w-[100%]">
                    <img 
                        className="block w-12"
                        src={catImg} 
                    />


                    <div className="text-line-wrapper relative w-full h-fit">
                        <div className="text-line-start w-10 h-full absolute top-0 left-0 z-20 rounded-[100%]" style={{background: `linear-gradient(90deg, ${theme.header} 50%,  rgba(0,0,0,0) 100%)`}}></div>
                        <div className="text-line-end w-10 h-full absolute top-0 right-0 z-20 rounded-[100%]" style={{background: `linear-gradient(90deg, rgba(0,0,0,0) 0%, ${theme.header} 50%)`}}></div>
                        
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
                                        className={index == counter ? `current-symbol text-[2rem] lg:text-[1.5rem]` : "text-[2rem] lg:text-[1.5rem]"}
                                    >
                                        <div className="symbol-cursor" style={{backgroundColor: theme.accent}}></div>
                                        {symbol}
                                    </span>)
                                )}
                            </div>
                        </div>
                    </div>
                    

                    <div 
                        className="opacity-40 hover:opacity-100 hover:cursor-pointer transition-opacity duration-200 ease-in-out mt-30 text-center flex flex-col justify-center items-center hover:[&>p]:opacity-0 hover:[&>p]:translate-y-1"
                        onClick={restart}
                    >
                        <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M36.364 20.636C31.6777 15.9497 24.0797 15.9497 19.3934 20.636C14.7071 25.3223 14.7071 32.9203 19.3934 37.6066C24.0797 42.2929 31.6777 42.2929 36.364 37.6066" stroke={theme.text} stroke-width="4" stroke-linecap="round"/>
                            <path d="M37.412 15.6787L30.9082 22.2251C30.2755 22.8621 30.7375 23.9455 31.6352 23.9298L38.2517 23.8138C38.8039 23.8041 39.2437 23.3486 39.234 22.7964L39.1213 16.366C39.1058 15.4821 38.0351 15.0516 37.412 15.6787Z" fill={theme.text}/>
                        </svg>
                        <p className="text-[0.8rem] font-bold translate-x-0.5 transition-all duration-200 ease-in-out" style={{color: theme.text}}>Ctrl + Enter</p>
                    </div>
                </div>
            </div>
        </main>
        </div>
    )
}