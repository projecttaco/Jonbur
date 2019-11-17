import { put, takeEvery } from 'redux-saga/effects'
import { generateStore } from 'drizzle'
import drizzleOptions from './drizzleOptions'

// actions
const TODOS_FETCH = 'MY_APP/TODOS_FETCH'
const TODOS_RECEIVED = 'MY_APP/TODOS_RECEIVED'

const initialState = {
    test: true,
    amount: 100,
}

const update = (state, ...args) => {
    return Object.assign({}, state, ...args);
}
// reducers
const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_AMOUNT':
            // return Object.assign({}, state, { amount: action.value });
            return update(state, { amount: action.value });
        default:
            return state;
    }
}

// fetch data from service using sagas
function* fetchTodos() {
    //  const todos = yield fetch('https://jsonplaceholder.typicode.com/todos')
    //  .then(response => response.json())
    const todos = {}
    yield put({ type: TODOS_RECEIVED, todos })
}

// Combine all your redux concerns

// app root saga
function* appRootSaga() {
    yield takeEvery(TODOS_FETCH, fetchTodos)
}

// app Reducers and Sagas
const appReducers = { input: appReducer }
const appSagas = [appRootSaga]

const store = generateStore({
    drizzleOptions,
    appReducers,
    appSagas
})

export default store