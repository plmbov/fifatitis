import axios from 'axios'

export const resultAdded = () => {
    return {
        type: 'RESULT_ADDED'
    }
}

export const statsUpdated = () => {
    return {
        type: 'STATS_UPDATED'
    }
}

export const authSuccess = (tokenId, userId, refreshToken) => {
    return {
        type: 'AUTH_SUCCESS',
        tokenId: tokenId,
        userId: userId,
        refreshToken: refreshToken
    }
}

export const auth = (email, password) => {
    const authData = {
        email: email,
        password: password,
        returnSecureToken: true
    }

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBlTJcgHg_eRSDL8pEG4-Yn-YFKBM4PZNw'

    return dispatch => {
        axios.post(url, authData)
            .then(res => {
                sessionStorage.setItem('token', res.data.idToken)
                sessionStorage.setItem('userId', res.data.localId)
                sessionStorage.setItem('refreshToken', res.data.refreshToken)
                dispatch(authSuccess(res.data.idToken, res.data.localId, res.data.refreshToken))
            })
            .catch(err => {
                alert('Wrong e-mail or password!')
            }
            )
    }
}

export const updateToken = (tokenId) => {
    return {
        type: 'UPDATE_TOKEN',
        tokenId: tokenId
    }
}

export const refreshToken = (refreshToken) => {
    const authData = {
        grant_type: 'refresh_token',
        refreshToken: refreshToken
    }

    let url = 'https://securetoken.googleapis.com/v1/token?key=AIzaSyBlTJcgHg_eRSDL8pEG4-Yn-YFKBM4PZNw'

    return dispatch => {
        axios.post(url, authData)
            .then(res => {
                dispatch(updateToken(res.data.id_token))
            })
            .catch(err => {
                console.log(err)
            }
            )
    }
}

export const tryReauthenticate = () => {

    const tokenId = sessionStorage.getItem('token')
    const userId = sessionStorage.getItem('userId')
    const refreshToken = sessionStorage.getItem('refreshToken')

    return {
        type: 'TRY_REAUTH',
        tokenId,
        userId,
        refreshToken
    }
}

export const removeCredentials = () => {

    sessionStorage.removeItem('token')
    sessionStorage.removeItem('userId')
    sessionStorage.removeItem('refreshToken')

    return {
        type: 'REMOVE_CREDENTIALS',
    }
}