import React from 'react'
import classes from './Arrow.module.css'

const Arrow = (props) => {
    return (
        <>
            <span href="#" className={classes.arrow} style={props.style}></span>
        </>
    )
}

export default Arrow
