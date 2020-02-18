import React, { Component } from 'react';
import { connect } from 'react-redux'
import Panel from './containers/Panel/Panel';
import classes from './App.module.css'
import RandomTeams from './components/RandomTeams/RandomTeams';
import AddGameScore from './components/AddGameScore/AddGameScore';
import BrowseStatistics from './components/BrowseStatistics/BrowseStatistics';
import { OrderFood } from './components/OrderFood/OrderFood';
import Login from './components/Login/Login';
import * as actions from './store/actions'

class App extends Component {

  componentDidMount() {
    this.props.onTryReauth()
  }

  render() {
    return (
      <div className={classes.App}>
        <div className={classes.Container}>
          <h1>FIFATITIS</h1>
          <Login />
          <div className={classes.Panels}>
            <Panel content={<RandomTeams />} heightClass='full'>CHOOSE RANDOM TEAMS</Panel>
            <Panel content={<AddGameScore user={this.props.user} />} heightClass='full'>ADD A NEW GAME SCORE</Panel>
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

const mapStateToProps = state => {
  return {
    user: state.tokenId,
    refreshToken: state.refreshToken
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: () => dispatch(actions.auth()),
    onTryReauth: () => dispatch(actions.tryReauthenticate()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
