export default function HeaderModal({list, theme, handleClick}) {


    const elements = []
    for (let element in list) {
        let newObj = {}
        for (let value in list[element]) {
            newObj[value] = list[element][value]
        }
        elements.push(newObj)
    }

    return(
        <ul style={{'--header-color': theme.header}} className="header-modal bg-[var(--header-color)] absolute top-24 left-0 w-full rounded-[100rem] p-1 flex flex-col justify-center items-center gap-1">
            {elements.map(element => (
                <li onClick={() => handleClick(list[element.name])} key={element.name} style={{'--background-color': element.background, '--text-color': theme.text, '--accent-color': theme.accent}} className="header-modal-element bg-[var(--background-color)] border-[var(--text-color)] border-2 w-[2.8rem] h-[2.8rem] rounded-[100rem] hover:border-[var(--accent-color)] transition-all duration-100 ease-in-out hover:cursor-pointer">
                </li>
            ))}
        </ul>
    )
}