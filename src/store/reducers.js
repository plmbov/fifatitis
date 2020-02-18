const initialState = {
    resultAdded: false,
    tokenId: null,
    userId: null,
    refreshToken: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'RESULT_ADDED':
            return {
                ...state,
                resultAdded: true
            }
        case 'STATS_UPDATED':
            return {
                ...state,
                resultAdded: false
            }
        case 'AUTH_SUCCESS':
            return {
                ...state,
                tokenId: action.tokenId,
                userId: action.userId,
                refreshToken: action.refreshToken
            }
        case 'UPDATE_TOKEN':
            return {
                ...state,
                tokenId: action.tokenId
            }
        case 'TRY_REAUTH':
            return {
                ...state,
                tokenId: action.tokenId,
                userId: action.userId,
                refreshToken: action.refreshToken
            }
        case 'REMOVE_CREDENTIALS':
            return {
                ...state,
                tokenId: null,
                userId: null,
                refreshToken: null
            }
        default:
            return state
    }
}

export default reducer