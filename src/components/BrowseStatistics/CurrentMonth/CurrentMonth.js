import React from 'react'
import classes from './CurrentMonth.module.css'
import Allison from '../../../assets/alisson.png'
import AllisonKing from '../../../assets/alisson-king.png'
import Ozil from '../../../assets/ozil.png'
import OzilKing from '../../../assets/ozil-king.png'

const currentMonth = (props) => {

    // const allison = (
    //     if(props.statsShown == 'Last Month' && props.)
    // )

    let bojoWins = 0
    let maciekWins = 0
    let bojoGoals = 0
    let maciekGoals = 0
    let winner = null
    console.log(props.data.stats)
    if (props.data.stats) {
        props.data.stats.map(game => {
            if (game.winner === 'Bojo') {
                bojoWins++
            }
            if (game.winner === 'Maciek') {
                maciekWins++
            }
            bojoGoals = bojoGoals + game.Bojo
            maciekGoals = maciekGoals + game.Maciek
        })
        if (bojoWins > maciekWins) {
            winner = 'Bojo'
        } else if (bojoWins > maciekWins) {
            winner = 'Maciek'
        }
    }


    console.log(props.data.stats)

    return (
        <div className={classes.Container}>
            <div className={classes.Bojo}>
                <div className={classes.NameAndPhoto}>
                    <img src={Allison} alt='Allison' />
                    <p className={classes.Name}>BOJO</p>
                </div>
                <div className={classes.Stats}>
                    <p>WINS</p>
                    <p>{bojoWins}</p>
                    <br />
                    <p>GOALS</p>
                    <p>{bojoGoals}</p>
                </div>
            </div>
            <div className={classes.Maciek}>
                <div className={classes.Stats}>
                    <p>WINS</p>
                    <p>{maciekWins}</p>
                    <br />
                    <p>GOALS</p>
                    <p>{maciekGoals}</p>
                </div>
                <div className={classes.NameAndPhoto}>
                    <img src={Ozil} alt='Ozil' />
                    <p className={classes.Name}>MACIEK</p>
                </div>
            </div>
            <p>{winner}</p>
        </div>
    )
}

export default currentMonth
