import React, { Component } from 'react'
import classes from './OrderFood.module.css'
import Arrow from '../UI/Arrow/Arrow'
import Button from '../UI/Button/Button'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import fadeTransition from '../../transitions/fade.module.css'

export class OrderFood extends Component {

    state = {
        restaurantIndex: 0
    }

    restaurants = [
        {
            name: 'Pizza Winchester',
            link: 'https://www.pyszne.pl/pizza-winchester'
        },
        {
            name: 'EFES Kebab',
            link: 'https://www.pyszne.pl/efes-kebab-grill-salads'
        },
        {
            name: 'Wok Open Kitchen',
            link: 'https://www.pyszne.pl/wok-open-kitchen-meiselsa'
        },
        {
            name: 'Something else...',
            link: 'https://www.pyszne.pl/'
        },
    ]

    decreaseRestaurantIndex = () => {
        if (this.state.restaurantIndex > 0) {
            this.setState({ restaurantIndex: this.state.restaurantIndex - 1 })
        }
    }

    increaseRestaurantIndex = () => {
        if (this.state.restaurantIndex < this.restaurants.length - 1) {
            this.setState({ restaurantIndex: this.state.restaurantIndex + 1 })
        }
    }

    render() {
        return (
            <div className={classes.Container}>
                <div className={classes.LeftArrow} onClick={this.decreaseRestaurantIndex}>
                    <Arrow />
                </div>
                <TransitionGroup>
                    <CSSTransition
                        key={this.state.restaurantIndex}
                        timeout={400}
                        classNames={fadeTransition}
                    >
                        <div className={classes.RestaurantName}>
                            <h3>{this.restaurants[this.state.restaurantIndex].name}</h3>
                        </div>
                    </CSSTransition>
                </TransitionGroup>

                <div className={classes.RightArrow} onClick={this.increaseRestaurantIndex}>
                    <Arrow />
                </div>
                <div className={classes.Button}>
                    <Button clicked={() => window.open(this.restaurants[this.state.restaurantIndex].link, '_blank')}>GO TO ORDER</Button>
                </div>
            </div>
        )
    }
}

export default OrderFood;