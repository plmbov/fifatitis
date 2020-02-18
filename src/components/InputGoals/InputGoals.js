import React from 'react'
import classes from './InputGoals.module.css'
import Arrow from '../UI/Arrow/Arrow'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import fadeTransition from '../../transitions/fade.module.css'

const InputGoals = (props) => {
    return (
        <div className={classes.InputGoalsContainer}>
            <p>{props.playerName}</p>
            <div className={classes.TopArrow} onClick={props.increase}>
                <Arrow />
            </div>
            <div className={classes.GoalsContainer}>
                <TransitionGroup>
                    <CSSTransition
                        key={props.goals}
                        timeout={400}
                        classNames={fadeTransition}
                    >
                        <div className={classes.Goals}>
                            <p>{props.goals}</p>
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </div>
            <div className={classes.BottomArrow} onClick={props.decrease}>
                <Arrow />
            </div>
        </div >
    )
}

export default InputGoals
