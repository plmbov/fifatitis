import React from 'react'
import classes from './Panel.module.css'

const Panel = (props) => {

    let contentClasses = ''
    if (props.heightClass === 'full') {
        contentClasses = classes.Content
    } else if (props.heightClass === 'half') {
        contentClasses = classes.halfHeightContent
    }

    return (
        <div className={classes.Container}>
            <div className={contentClasses}>
                <h2>{props.children}</h2>
                {props.content}
            </div>
        </div>
    )
}

export default Panel
