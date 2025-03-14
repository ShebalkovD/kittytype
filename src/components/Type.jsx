import {useState} from 'react'

export default function Type() {
    let INITIAL_TEXT = 'запуск импонировать город насидеть котики непреклонный собачки перевесить профинтить следуемый'
    const textArray = INITIAL_TEXT.split('')

    const [counter, setCounter] = useState(0)
    const [shift, setShift] = useState(0)
    let currentSymbol = textArray[counter]
    const handleKeyDown = (event) => {
        if (event.key == currentSymbol) {
            console.log('верно')
            setCounter(prev => prev + 1)
            currentSymbol = textArray[counter]
        }else {
            console.log('неверно')
        }
    }
    
    return(
        <div className="container flex items-center justify-center min-h-[100vh]" onKeyUp={handleKeyDown} tabIndex={0}>
            <p>{counter}</p>
            <div className="text-line relative bg-white w-[80%] h-12">
                <div 
                    className={`wrapper absolute top-3`}
                    style={{left: 10 - shift}}
                >
                    {textArray.map((symbol, index) => 
                        (<span key={index}>{symbol}</span>)
                    )}
                </div>
            </div>
        </div>
    )
}