import React from 'react'
import classes from './Backdrop.module.css'

const Backdrop = (props) => {
    return (
        props.isShown ? <div className={classes.Backdrop} onClick={props.closePopUp}></div> : null
    )
}

export default Backdrop
