import { put, takeEvery } from 'redux-saga/effects'
import { generateStore } from 'drizzle'
import drizzleOptions from './drizzleOptions'

// actions
const TODOS_FETCH = 'MY_APP/TODOS_FETCH'
const TODOS_RECEIVED = 'MY_APP/TODOS_RECEIVED'

const initialState = {
    amount: 0,
    showConfirmScreen: false,
    current: 0,
    receipt: '0x0',
}

const update = (state, ...args) => {
    return Object.assign({}, state, ...args);
}
// reducers
const depositReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_AMOUNT':
            // return Object.assign({}, state, { amount: action.value });
            var amount;
            var inputError = false;
            try {
                amount = parseFloat(action.value);
            } catch {
                amount = 0;
                inputError = true;
            }
            return update(state, { amount: amount, inputError });
        case 'SHOW_CONFIRM_SCREEN':
            return update(state, { showConfirmScreen: true });
        case 'RESET_DEPOSIT':
            return update(state, { amount: 0, inputError: false, showConfirmScreen: false, current: 0 });
        case 'UPDATE_STEP':
            return update(state, { current: action.value });
        case 'SAVE_RECEIPT':
            return update(state, { receipt: action.value });
        default:
            return state;
    }
}

const menuReducer = (state = { current: "2" }, action) => {
    switch (action.type) {
        case 'GOTO':
            return update(state, { current: action.value });
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
const appReducers = { deposit: depositReducer, menu: menuReducer }
const appSagas = [appRootSaga]

const store = generateStore({
    drizzleOptions,
    appReducers,
    appSagas
})

export default store