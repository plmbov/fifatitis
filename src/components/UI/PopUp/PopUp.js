import React, { Component } from 'react'
import classes from './PopUp.module.css'
import Backdrop from '../Backdrop/Backdrop'

class PopUp extends Component {

    render() {
        return (
            <>
                <Backdrop isShown={this.props.isShown} closePopUp={this.props.closePopUp} />
                <div
                    className={classes.Container}
                    style={{
                        display: this.props.isShown ? 'block' : 'none',
                        visibility: this.props.isShown ? 'visible' : 'hidden'
                    }}
                >
                    {this.props.children}
                </div>
            </>
        )

    }

}

export default PopUp
