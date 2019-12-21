import React, { Component } from 'react'
import classes from './BrowseStatistics.module.css'
import axios from '../../axiosInstance'
import { render } from 'react-dom';
import Loader from '../UI/Loader/Loader';

class BrowseStatistics extends Component {

    state = {
        stats: null
    }

    componentDidMount() {
        const d = new Date()

        const currentDateFormatted = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
            d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);

        const currentYear = currentDateFormatted.slice(6, 10)
        const currentMonth = currentDateFormatted.slice(3, 5)

        axios.get(`results/${currentYear}/${currentMonth}.json`)
            .then(res => {
                const stats = []
                for (let key in res.data) {
                    stats.push({
                        ...res.data[key]
                    })
                }
                this.setState({ stats: stats })
            }
            )
    }



    render() {
        return (
            <div className={classes.Container}>
                Placeholder
            </div>
        )
    }

}

export default BrowseStatistics
