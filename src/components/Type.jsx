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
            setCatImg(catConfig.default)
        }
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
            </div>
            
        </main>
        </div>
        
    )
}