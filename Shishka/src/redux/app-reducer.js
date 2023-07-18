// import { setAuthUserToState } from './auth-reducer/

const INITIALIZE_SUCCESS = "shishka/app/INITIALIZE_SUCCESS";

let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case INITIALIZE_SUCCESS:
            return {
                ...state,
                initialized: true
            }

        default:
            return state;
    }
}

export const initializedSuccess = () => {

    return {
        type: INITIALIZE_SUCCESS,
    }

}

export const initializeApp = () => async (dispatch) => {

    // let promise = dispatch(setAuthUserToState());
    // let promiseAll = await Promise.all([promise])
    // dispatch(initializedSuccess())

}

export default appReducer;