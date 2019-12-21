import React, { Component } from 'react';
import Panel from './containers/Panel/Panel';
import classes from './App.module.css'
import RandomTeams from './components/RandomTeams/RandomTeams';
import AddGameScore from './components/AddGameScore/AddGameScore';
import BrowseStatistics from './components/BrowseStatistics/BrowseStatistics';
import { OrderFood } from './components/OrderFood/OrderFood';
import Login from './components/Login/Login';
import fire from './firebase'
import Button from './components/UI/Button/Button';

class App extends Component {

  state = {
    user: null,
    logo: false
  }

  componentDidMount() {
    this.authListener()
  }

  authListener() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user })
      } else {
        this.setState({ user: null })
      }
    })
  }

  render() {
    let userMenu = <Login />

    if (this.state.user) {
      userMenu = (
        <>
          <p>Welcome user!</p>
          <Button clicked={() => fire.auth().signOut()}>LOG OUT</Button>
        </>
      )
    }

    return (
      <div className={classes.App}>
        <div className={classes.BackgroundColor} />
        <div className={classes.Container}>
          <h1>FIFATITIS</h1>
          {userMenu}
          <div className={classes.Panels}>
            <Panel content={<RandomTeams />} heightClass='full'>CHOOSE RANDOM TEAMS</Panel>
            <Panel content={<AddGameScore user={this.state.user} />} heightClass='full'>ADD A NEW GAME SCORE</Panel>
            <div className={classes.Subcontainer}>
              <Panel content={<BrowseStatistics />} heightClass='half'>STATISTICS</Panel>
              <Panel content={<OrderFood />} heightClass='half'>ORDER FOOD</Panel>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default App;
