import React, { Component } from 'react'
import fire from '../../firebase'
import './Login.module.css'

class Login extends Component {

    login(event) {
        event.preventDefault()
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value

        fire.auth().signInWithEmailAndPassword(email, password)
            .then(user => {
                console.log('Logged in!')
            })
            .catch(err => {
                console.log(err.toString())
            })
    }

    // signUp() {
    //     const email = document.getElementById('email').value
    //     const password = document.getElementById('password').value

    //     fire.auth().createUserWithEmailAndPassword(email, password)
    //         .then(user => {
    //             console.log('Signed up!')
    //         })
    //         .catch(err => {
    //             console.log(err.toString())
    //         })
    // }

    signUp() {
        alert('Creating new accounts is temporarily blocked.')
    }

    render() {
        return (
            <div>
                <form onSubmit={this.login}>
                    <input id='email' type='email' placeholder='E-mail'></input>
                    <input id='password' type='password' placeholder='Password'></input>
                    <button type='submit'>SIGN IN</button>
                    <button onClick={this.signUp}>SIGN UP</button>
                </form>
                {/* <Button
                    clicked={this.login}
                    style={this.buttonStyle}
                >LOG IN</Button>
                <Button
                    clicked={this.signUp}
                    style={this.buttonStyle}
                >SIGN UP</Button> */}
            </div>
        )
    }
}

export default Login
