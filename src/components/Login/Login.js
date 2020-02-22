import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import './Login.module.css'
import classes from './Login.module.css'

class Login extends Component {

    state = {
        email: '',
        password: ''
    }

    signUp(event) {
        event.preventDefault()
        alert('Creating new accounts is temporarily blocked.')
    }

    inputHandler = (inputId, event) => {
        event.preventDefault()
        this.setState({ [inputId]: event.target.value })
    }

    submitHander = (event) => {
        event.preventDefault()
        this.props.onAuth(this.state.email, this.state.password)
    }

    render() {
        let loginMenu = (
            <div className={classes.Container}>
                <form onSubmit={this.submitHander}>
                    <input id='email' type='email' placeholder='E-mail' onChange={(event) => this.inputHandler('email', event)}></input>
                    <input id='password' type='password' placeholder='Password' onChange={(event) => this.inputHandler('password', event)}></input>
                    <button type='submit'>SIGN IN</button>
                    <button onClick={this.signUp}>SIGN UP</button>
                </form>
            </div>
        )

        if (this.props.userLogged) {
            loginMenu = (
                <div className={classes.Container}>
                    <div className={classes.userLogged}>
                        <p>Enjoy using the app!</p>
                        <button onClick={this.props.onRemoveCredentials}>LOG OUT</button>
                    </div>
                </div>
            )
        }

        return (
            <>
                {loginMenu}
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        userLogged: state.tokenId !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password)),
        onRemoveCredentials: () => dispatch(actions.removeCredentials())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
