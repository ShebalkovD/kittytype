import {useState} from 'react'

export default function Type() {
    let INITIAL_TEXT = 'запуск импонировать город насидеть котики непреклонный собачки перевесить профинтить следуемый'
    const textArray = INITIAL_TEXT.split('')

    const [counter, setCounter] = useState(0)
    const handleKeyDown = (event) => {
        console.log('нажатие');
    }
    
    return(
        <div className="container flex items-center justify-center min-h-[100vh]" onKeyUp={handleKeyDown} tabIndex={0}>
            <p>{counter}</p>
            <div className="text-line bg-white p-4">
                <div 
                    className="wrapper"
                >
                    {textArray.map((symbol, index) => 
                        (<span key={index}>{symbol}</span>)
                    )}
                </div>
            </div>
        </div>
    )
}