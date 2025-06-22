import RestartButton from "./RestartButton.jsx"

function TypeLayout({children, theme, time, catImg, gameStarted, restart}) {
    return (
        <div className="container flex flex-col items-center justify-start min-h-full">
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
                {children}
            </div>
            <RestartButton gameStarted={gameStarted} restart={restart} theme={theme} />
        </div>
    )
}

export default TypeLayout