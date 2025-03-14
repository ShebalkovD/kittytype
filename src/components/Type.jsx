import {useState, useRef, useEffect} from 'react'

export default function Type() {
    let INITIAL_TEXT = 'запуск импонировать город насидеть котики непреклонный собачки перевесить профинтить следуемый'
    const textArray = INITIAL_TEXT.split('')

    const textlineRef =  useRef(null)
    const [counter, setCounter] = useState(0)
    const [shift, setShift] = useState(0)

    let currentSymbol = textArray[counter]
    const handleKeyDown = (event) => {
        if (event.key == currentSymbol) {
            setShift(prev => prev + textlineRef.current.childNodes[counter].offsetWidth)
            // textlineRef.current.childNodes[counter].className = ""
            setCounter(prev => prev + 1)
            // textlineRef.current.childNodes[counter].className = "current-symbol"
            currentSymbol = textArray[counter]
        }else {
            console.log('неверно')
        }
    }

    
    return(
        <div 
            className="container flex items-center justify-center min-h-[100vh]"
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            <div className="text-line relative bg-white w-[80%] h-12 overflow-hidden">
                <div 
                    className={`wrapper absolute top-3 w-fit whitespace-nowrap`}
                    ref={textlineRef}
                    style={{left: `calc(50% - ${shift}px)`}}
                >
                    {textArray.map((symbol, index) => 
                        (<span 
                            key={index} 
                            style={{opacity: index >= counter ? 0.8 : 1, position: 'relative'}}
                            className={index == counter ? "current-symbol" : ""}
                        >
                            {symbol}
                        </span>)
                    )}
                </div>
            </div>
        </div>
    )
}