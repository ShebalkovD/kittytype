let INITIAL_TEXT = 'взапуски импонировать город насидеть котики непреклонный собачки перевесить профинтить следуемый'
const textArray = INITIAL_TEXT.split('')


export default function Type() {
    return(
        <>
            <div className="text-line">
                <div className="wrapper">
                    {textArray.map((symbol, index) => 
                        (<span key={index}>{symbol}</span>)
                    )}
                </div>
            </div>
        </>
    )
}