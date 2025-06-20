import { forwardRef } from "react"

const Textline = forwardRef(function Textline({theme, shift, counter, textArray, mistake}, ref) {
    return (
    <div className="text-line-wrapper relative w-full h-fit">
        <div className="text-line-start lg:w-10 w-20 h-full absolute top-0 left-0 z-20 rounded-[100%]" style={{background: `linear-gradient(90deg, ${theme.header} 50%,  rgba(0,0,0,0) 100%)`}}></div>
        <div className="text-line-end lg:w-10 w-20 h-full absolute top-0 right-0 z-20 rounded-[100%]" style={{background: `linear-gradient(90deg, rgba(0,0,0,0) 0%, ${theme.header} 50%)`}}></div>

        <div
            className="text-line relative w-full h-16 lg:h-12 overflow-hidden rounded-full z-5"
            style={{backgroundColor: theme.header, border: `2px solid ${theme.header}`}}
        >

            <div 
                className={`wrapper absolute top-1 w-fit whitespace-nowrap transition-transform duration-50 ease-linear z-10`}
                ref={ref}
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
    )
})

export default Textline