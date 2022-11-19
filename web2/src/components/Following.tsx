import React from 'react'

//style pprops
interface StylesProps{
    style:React.CSSProperties
}
const Following =(props:StylesProps)=>{
    return(
        <div style={props.style}>
            200 following
        </div>
    )
}
export default Following