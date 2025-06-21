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
        </div>
    )
}

export default TypeLayout