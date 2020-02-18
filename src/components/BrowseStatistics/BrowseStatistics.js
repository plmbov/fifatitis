import React, { Component } from 'react'
import classes from './BrowseStatistics.module.css'
import axios from '../../axiosInstance'
import { connect } from 'react-redux'
import CurrentMonth from './CurrentMonth/CurrentMonth'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import fadeTransition from '../../transitions/fade.module.css'
import * as actions from '../../store/actions'

class BrowseStatistics extends Component {

    state = {
        stats: null,
        lastMonthStats: null,
        lastMonthShown: false
    }

    componentDidMount() {
        this.fetchUpToDateStats()
    }

    fetchUpToDateStats() {
        const d = new Date()

        const currentDateFormatted = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
            d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);

        const currentYear = currentDateFormatted.slice(6, 10)
        const currentMonth = currentDateFormatted.slice(3, 5)
        const lastMonth = currentMonth - 1

        axios.get(`results/${currentYear}/${currentMonth}.json`)
            .then(res => {
                const stats = this.mapObjectToCollection(res.data);
                this.setState({ stats })
            }
            )

        axios.get(`results/${currentYear}/${lastMonth}.json`)
            .then(res => {
                const lastMonthStats = this.mapObjectToCollection(res.data);
                this.setState({ lastMonthStats })
            }
            )
        this.props.onStatsUpdated()
    }

    mapObjectToCollection(object) {
        const collection = []
        for (let key in object) {
            collection.push({
                ...object[key]
            })
        }
        return collection;
    }

    render() {
        if (this.props.resultAdded) {
            this.fetchUpToDateStats()
        }

        return (
            <div className={classes.Container}>
                <TransitionGroup>
                    <CSSTransition
                        key={this.state.statsShown}
                        timeout={400}
                        classNames={fadeTransition}
                    >
                        <CurrentMonth
                            data={this.state}
                        />
                    </CSSTransition>
                </TransitionGroup>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        resultAdded: state.resultAdded
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onStatsUpdated: () => dispatch(actions.statsUpdated())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseStatistics)
