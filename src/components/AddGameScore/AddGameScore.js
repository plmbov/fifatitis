import React, { Component } from 'react'
import classes from './AddGameScore.module.css'
import Button from '../UI/Button/Button'
import InputGoals from '../InputGoals/InputGoals'
import axios from '../../axiosInstance'
import { connect } from 'react-redux'
import PopUp from '../UI/PopUp/PopUp'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import fadeTransition from '../../transitions/fade.module.css'
import * as actions from '../../store/actions'

export class AddGameScore extends Component {

    state = {
        Bojo: 0,
        Maciek: 0,
        winner: null,
        popUpShown: false,
        resultSubmitted: false
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.Bojo !== this.state.Bojo || prevState.Maciek !== this.state.Maciek) {
            if (this.state.Bojo > this.state.Maciek) {
                this.setState({ winner: 'Bojo' })
            } else if (this.state.Bojo < this.state.Maciek) {
                this.setState({ winner: 'Maciek' })
            } else {
                this.setState({ winner: null })
            }
        }
    }


    submitResult = () => {

        if (this.props.user) {
            if (this.state.winner == null) {
                this.setState({ popUpShown: true })
            } else {
                this.sendToServer()
            }
        } else {
            this.setState({ popUpShown: true })
        }

    }

    sendToServer = () => {

        const d = new Date()

        const currentDateFormatted = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
            d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);

        const result = {
            Bojo: this.state.Bojo,
            Maciek: this.state.Maciek,
            winner: this.state.winner,
            dateAndTime: currentDateFormatted
        }

        const currentYear = result.dateAndTime.slice(6, 10)
        let currentMonth = result.dateAndTime.slice(3, 5)

        // Games played after midnight on the last day of the month count to the ending month
        if (parseInt(currentDateFormatted.slice(0, 2)) === 1 && parseInt(currentDateFormatted.slice(11, 13)) < 6) {
            currentMonth = "0" + (parseInt(result.dateAndTime.slice(3, 5)) - 1).toString()
        }


        axios.post(`results/${currentYear}/${currentMonth}.json?auth=` + this.props.tokenId, result)
            .then(this.setState({ Bojo: 0, Maciek: 0, winner: null, popUpShown: true, resultSubmitted: true }))
            .catch(error => {
                alert('Log in to add a new game score!')
                this.props.onRemoveCredentials()
            }
            )
        this.props.onRefreshToken(this.props.refreshToken)
    }

    increaseScoredGoals = (playerName) => {
        this.setState({ [playerName]: this.state[playerName] + 1 })
    }

    decreaseScoredGoals = (playerName) => {
        if (this.state[playerName] > 0) {
            this.setState({ [playerName]: this.state[playerName] - 1 })
        }
    }

    closePopUp = () => {
        this.props.onResultAdded()
        this.setState({ popUpShown: false, resultSubmitted: false })
    }

    wonInPenalties = (penaltiesWinner) => {
        this.setState({ winner: penaltiesWinner, resultSubmitted: true },
            () => {
                this.sendToServer()
            })
    }

    render() {

        let popUp = null

        if (!this.props.user) {
            popUp = <PopUp isShown={this.state.popUpShown} closePopUp={this.closePopUp}>
                <p>Sorry, only authenticated users can add new game scores.</p>
                <div style={{ 'margin': '10px auto 0 auto', 'display': 'flex', 'justifyContent': 'center' }}>
                    <Button clicked={this.closePopUp}
                        style={{ 'transform': 'scale(0.7)', 'width': '250px' }}
                    >OK</Button>
                </div>
            </PopUp>
        }
        if (this.state.popUpShown && !this.state.resultSubmitted && this.props.user) {
            popUp = <PopUp isShown={this.state.popUpShown} closePopUp={this.closePopUp}>
                Who won in penalties?
                <div style={{ 'margin': '10px 0 15px 0' }}>
                    <Button clicked={() => this.wonInPenalties('Bojo')}>BOJO</Button>
                </div>
                <Button clicked={() => this.wonInPenalties('Maciek')}>MACIEK</Button>
                <div style={{ 'margin': '10px auto 0 auto', 'display': 'flex', 'justifyContent': 'center' }}>
                    <Button clicked={this.closePopUp}
                        style={{ 'transform': 'scale(0.7)', 'width': '250px' }}
                    >CANCEL</Button>
                </div>
            </PopUp>
        }
        if (this.state.popUpShown && this.state.resultSubmitted && this.props.user) {
            popUp = <PopUp isShown={this.state.popUpShown} closePopUp={this.closePopUp}>
                <p>The result has been successfully submitted!</p>
                <div style={{ 'margin': '10px auto 0 auto', 'display': 'flex', 'justifyContent': 'center' }}>
                    <Button clicked={this.closePopUp}
                        style={{ 'transform': 'scale(0.7)', 'width': '250px' }}
                    >OK</Button>
                </div>
            </PopUp>
        }


        return (
            <div className={classes.Container}>
                <TransitionGroup>
                    <CSSTransition
                        key={this.state.popUpShown}
                        timeout={200}
                        classNames={fadeTransition}
                    >
                        <div className={classes.PopUp}>
                            {popUp}
                        </div>
                    </CSSTransition>
                </TransitionGroup>
                <div className={classes.NamesAndGoals}>
                    <div className={classes.PlayerName}>
                        <InputGoals
                            playerName='BOJO'
                            goals={this.state.Bojo}
                            increase={() => this.increaseScoredGoals('Bojo')}
                            decrease={() => this.decreaseScoredGoals('Bojo')}
                        />
                    </div>
                    <div className={classes.PlayerName}>
                        <InputGoals
                            playerName='MACIEK'
                            goals={this.state.Maciek}
                            increase={() => this.increaseScoredGoals('Maciek')}
                            decrease={() => this.decreaseScoredGoals('Maciek')}
                        />
                    </div>
                </div>
                <div className={classes.Button}>
                    <Button clicked={this.submitResult} >SUBMIT RESULT</Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        tokenId: state.tokenId,
        refreshToken: state.refreshToken
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onResultAdded: () => dispatch(actions.resultAdded()),
        onRefreshToken: (refreshToken) => dispatch(actions.refreshToken(refreshToken)),
        onRemoveCredentials: () => dispatch(actions.removeCredentials())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGameScore)
