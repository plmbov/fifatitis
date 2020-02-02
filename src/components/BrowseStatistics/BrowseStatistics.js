import React, { Component } from 'react'
import classes from './BrowseStatistics.module.css'
import axios from '../../axiosInstance'
import Loader from '../UI/Loader/Loader';
import CurrentMonth from './CurrentMonth/CurrentMonth'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import fadeTransition from '../../transitions/fade.module.css'

class BrowseStatistics extends Component {

    state = {
        stats: null,
        lastMonthStats: null,
        lastMonthShown: false
    }

    componentDidMount() {
        //        setInterval(() => this.setState({ lastMonthShown: !this.state.lastMonthShown }), 7000);
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

export default BrowseStatistics
