import React, { Component } from 'react'
import axios from '../../axiosInstance'
import classes from './RandomTeams.module.css'
import Button from '../UI/Button/Button'
import Images from '../Images/Images'
import PopUp from '../UI/PopUp/PopUp'
import Loader from '../UI/Loader/Loader'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import fadeTransition from '../../transitions/fade.module.css'

export class RandomTeams extends Component {

    state = {
        teams: null,
        loading: false,
        bojoTeam: '?',
        maciekTeam: '?',
        preventRepeatig: true,
        popUpShown: false
    }

    bojoTeam = null
    maciekTeam = null

    componentDidMount() {
        this.setState({ loading: true })
        axios.get('/teams.json')
            .then(res => {
                const fetchedTeams = []
                for (let key in res.data) {
                    fetchedTeams.push({
                        ...res.data[key],
                        id: key
                    })
                }
                this.setState({ loading: false, teams: fetchedTeams })
            })
            .catch(err => {
                this.setState({ loading: false })
            })
    }

    drawTeams = () => {
        let teams = this.state.teams
        if (teams.length <= 1) {
            this.setState({ popUpShown: true })
            axios.get('/teams.json')
                .then(res => {
                    const fetchedTeams = []
                    for (let key in res.data) {
                        fetchedTeams.push({
                            ...res.data[key],
                            id: key
                        })
                    }
                    this.setState({ loading: false, teams: fetchedTeams })
                })
                .catch(err => {
                    this.setState({ loading: false })
                })
        } else {
            this.setState({ loading: true })
            const bojoTeam = this.state.teams[Math.floor(Math.random() * this.state.teams.length)].id
            let maciekTeam = this.state.teams[Math.floor(Math.random() * this.state.teams.length)].id
            while (bojoTeam === maciekTeam) {
                maciekTeam = this.state.teams[Math.floor(Math.random() * this.state.teams.length)].id
            }

            let filteredTeams;

            if (this.state.preventRepeatig) {
                filteredTeams = teams.filter(team => team.id !== bojoTeam)
                filteredTeams = filteredTeams.filter(team => team.id !== maciekTeam)
                this.setState({ bojoTeam: bojoTeam, maciekTeam: maciekTeam, teams: filteredTeams })
            } else {
                this.setState({ bojoTeam: bojoTeam, maciekTeam: maciekTeam, teams: teams })
            }
            this.setState({ loading: false })
        }
    }

    render() {
        let popUp = null


        let bojoTeamRender = <Loader />
        let maciekTeamRender = <Loader />

        if (!this.state.loading) {
            bojoTeamRender = (
                <div className={classes.TeamRenderBojo}>
                    <img src={Images[this.state.bojoTeam]} alt='team-logo' />
                    <p>{this.state.bojoTeam}</p>
                </div>
            )

            maciekTeamRender = (
                <div className={classes.TeamRenderMaciek}>
                    <img src={Images[this.state.maciekTeam]} alt='team-logo' />
                    <p>{this.state.maciekTeam}</p>
                </div>
            )
        }

        if (this.state.popUpShown) {
            popUp = <PopUp
                isShown={this.state.popUpShown}
                closePopUp={() => this.setState({ popUpShown: !this.state.popUpShown })}
            >
                <div>
                    <p>There are no more available teams to draw.</p>
                    <p>The list of teams has been reset.</p>
                    <Button
                        style={{ 'transform': 'scale(0.7)', 'width': '250px', 'margin': '0 auto' }}
                        clicked={() => this.setState({ popUpShown: !this.state.popUpShown })}>
                        OK</Button>
                </div>
            </PopUp >
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
                <div className={classes.LogosAndNames}>
                    <div className={classes.PlayerName}>
                        <p>BOJO'S TEAM</p>
                        {bojoTeamRender}
                    </div>
                    <div className={classes.PlayerName}>
                        <p>MACIEK'S TEAM</p>
                        {maciekTeamRender}
                    </div>
                </div>
                <div className={classes.Checkbox}>
                    <input type='checkbox' id='preventCheckbox' defaultChecked onChange={() => this.setState({ preventRepeatig: !this.state.preventRepeatig })} />
                    <label htmlFor='preventCheckbox'>Prevent repeating teams</label>
                </div>
                <div className={classes.Button}>
                    <Button clicked={this.drawTeams}>LAUNCH</Button>
                </div>
            </div>
        )
    }
}

export default RandomTeams
