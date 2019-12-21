import React from 'react'
import classes from './Loader.module.css'

const Loader = () => {
    return (
        <div>
            <div className={classes.ldsring}><div></div><div></div><div></div><div></div></div>
            <p>Loading...</p>
        </div>
    )
}

export default Loader
