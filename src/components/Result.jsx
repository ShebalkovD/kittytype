function Result({theme, counter, mistakeCounter, restart}) {
    return (
        <div className="result w-[20%] mx-auto p-8 rounded-2xl relative top-[30vh]" style={{backgroundColor: theme.header, color: theme.text}}>
            <p>Скорость печати: <span style={{color: theme.accent}}>{counter * 2}</span> с/м</p>
            <p>Ошибки: <span style={{color: theme.accent}}> {mistakeCounter}</span></p>
            <button onClick={restart} style={{backgroundColor: theme.accent}}>Заново</button>
        </div>
    )
}

export default Result