import React from 'react'

function AbilityList(props) {
    const abilities= props.ability
    return (
        abilities.map(ability =>(
            <div>{ability}</div>
        ))
    )
}

export default AbilityList
