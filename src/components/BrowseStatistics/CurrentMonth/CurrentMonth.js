import React from 'react'
import classes from './CurrentMonth.module.css'
import Allison from '../../../assets/alisson.png'
import Ozil from '../../../assets/ozil.png'

const currentMonth = (props) => {

    let bojoWins = 0
    let maciekWins = 0
    let bojoGoals = 0
    let maciekGoals = 0

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
    }

    return (
        <div className={classes.Container}>
            <p>Current Month:</p>
            <div className={classes.Players}>
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
            </div>
        </div>
    )
}

export default currentMonth
