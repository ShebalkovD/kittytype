function RestartButton({gameStarted, restart, theme}) {
    if (gameStarted) {
        return (
            <div 
                className="restart mt-[10vh] hover:cursor-pointer text-center flex flex-col justify-center items-center hover:[&>svg]:opacity-100 hover:[&>p]:opacity-0 hover:[&>p]:translate-y-1"
                onClick={restart}
            >
                <svg className="opacity-10 transition-opacity duration-200 ease-in-out" width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M36.364 20.636C31.6777 15.9497 24.0797 15.9497 19.3934 20.636C14.7071 25.3223 14.7071 32.9203 19.3934 37.6066C24.0797 42.2929 31.6777 42.2929 36.364 37.6066" stroke={theme.text} strokeWidth="4" strokeLinecap="round"/>
                    <path d="M37.412 15.6787L30.9082 22.2251C30.2755 22.8621 30.7375 23.9455 31.6352 23.9298L38.2517 23.8138C38.8039 23.8041 39.2437 23.3486 39.234 22.7964L39.1213 16.366C39.1058 15.4821 38.0351 15.0516 37.412 15.6787Z" fill={theme.text}/>
                </svg>
                <p className="opacity-10 text-[0.8rem] font-bold translate-x-0.5 transition-all duration-200 ease-in-out" style={{color: theme.text}}>Ctrl + Enter</p>
            </div>
        )
    }
    else {
        return (
            <p className="mt-[1vh] opacity-20 text-[1rem] font-normal translate-x-0.5 transition-all duration-200 ease-in-out" style={{color: theme.text}}>Начните печатать, чтобы запустить тренажер</p>
        )
    }
}

export default RestartButton