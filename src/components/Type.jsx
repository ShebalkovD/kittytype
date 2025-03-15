import {useState, useRef, useEffect} from 'react'
import themes from '../assets/theme.json'
import cats from '../assets/cat.js'


export default function Type() {
    let INITIAL_TEXT = 'запуск импонировать город насидеть котики непреклонный собачки перевесить профинтить следуемый'
    const textArray = INITIAL_TEXT.split('')

    const textlineRef =  useRef(null)
    const [counter, setCounter] = useState(0)
    const [shift, setShift] = useState(0)
    const [theme, setTheme] = useState('light')
    const [themeConfig, setThemeConfig] = useState(themes[0])
    const [catConfig, setCatConfig] = useState(cats.orange)
    const [catImg, setCatImg] = useState(catConfig.default)
    let currentSymbol = textArray[counter]

    const handleKeyDown = (event) => {
        if (event.key == currentSymbol) {
            setShift(prev => prev + textlineRef.current.childNodes[counter].offsetWidth)
            setCounter(prev => prev + 1)
            currentSymbol = textArray[counter]
            setCatImg(catConfig.left)
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
            style={{backgroundColor: themeConfig.header}}
        >
            <div className="container h-full flex items-center justify-between">
                <h1 className="logo text-4xl font-bold" style={{color: themeConfig.text}}>
                    KITTY
                    <span style={{color: themeConfig.accent}}>type</span>
                </h1>
            </div>
        </header>
        <main 
            className="container flex items-center justify-center min-h-[calc(100vh-6rem)]"
        >

            <div className="flex flex-col justify-center items-center w-[100%]">
                <img 
                    className="block w-12"
                    src={catImg} 
                />

                <div className="text-line relative w-[100%] h-16 lg:h-12 overflow-hidden rounded-full" style={{backgroundColor: themeConfig.header}}>
                    <div 
                        className={`wrapper absolute top-2 w-fit whitespace-nowrap transition-transform duration-50 ease-linear`}
                        ref={textlineRef}
                        style={{transform: `translateX(calc(-${shift}px))`, left: '50%'}}
                    >
                        {textArray.map((symbol, index) => 
                            (<span 
                                key={index} 
                                style={{opacity: index >= counter ? 0.8 : 1, position: 'relative', color: themeConfig.text, overflow: 'visible'}}
                                className={index == counter ? `current-symbol text-[2rem] lg:text-[1.5rem]` : "text-[2rem] lg:text-[1.5rem]"}
                            >
                                <div className="symbol-cursor" style={{backgroundColor: themeConfig.accent}}></div>
                                {symbol}
                            </span>)
                        )}
                    </div>
                </div>

                <div 
                    className="opacity-40 hover:opacity-100 hover:cursor-pointer transition-opacity duration-200 ease-in-out mt-30 text-center flex flex-col justify-center items-center hover:[&>p]:opacity-0 hover:[&>p]:translate-y-1"
                    onClick={restart}
                >
                    <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M36.364 20.636C31.6777 15.9497 24.0797 15.9497 19.3934 20.636C14.7071 25.3223 14.7071 32.9203 19.3934 37.6066C24.0797 42.2929 31.6777 42.2929 36.364 37.6066" stroke={themeConfig.text} stroke-width="4" stroke-linecap="round"/>
                        <path d="M37.412 15.6787L30.9082 22.2251C30.2755 22.8621 30.7375 23.9455 31.6352 23.9298L38.2517 23.8138C38.8039 23.8041 39.2437 23.3486 39.234 22.7964L39.1213 16.366C39.1058 15.4821 38.0351 15.0516 37.412 15.6787Z" fill={themeConfig.text}/>
                    </svg>
                    <p className="text-[0.8rem] font-bold translate-x-0.5 transition-all duration-200 ease-in-out">Ctrl + Enter</p>
                </div>
            </div>
            
        </main>
        </div>
        
    )
}