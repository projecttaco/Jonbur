import { put, takeEvery } from 'redux-saga/effects'
import { generateStore } from 'drizzle'
import drizzleOptions from './drizzleOptions'
import moment from 'moment'

// actions
const TODOS_FETCH = 'MY_APP/TODOS_FETCH'
const TODOS_RECEIVED = 'MY_APP/TODOS_RECEIVED'

const initialState = {
    amount: 0,
    showConfirmScreen: false,
    current: 0,
    receipt: '0x0',
    date: moment(),
    time: moment(),
    year: moment().year(),
    month: moment().month(),
    day: moment().date(),
    hour: moment().hour(),
    minute: moment().minute(),
    second: moment().second(),
    withdrawDate: moment(),
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
        case 'UPDATE_DATE':
            var year = action.date.year();
            var month = action.date.month();
            var day = action.date.date();
            var withdrawDate = moment().year(year).month(month).date(day).hour(state.hour).minute(state.minute).second(state.second);
            // withdrawDate = withdrawDate.unix();
            return update(state, { date: action.date, year: year, month: month, day: day, withdrawDate: withdrawDate });
        case 'UPDATE_TIME':
            var hour = action.time.hour();
            var minute = action.time.minute();
            var second = action.time.second();
            withdrawDate = moment().year(state.year).month(state.month).date(state.day).hour(hour).minute(minute).second(second);
            // withdrawDate = withdrawDate.unix();
            return update(state, { time: action.time, hour: hour, minute: minute, second: second, withdrawDate: withdrawDate });
        case 'SHOW_CONFIRM_SCREEN':
            return update(state, { showConfirmScreen: true });
        case 'RESET_DEPOSIT':
            return update(state, { amount: 0, inputError: false, showConfirmScreen: false, current: 0 });
        case 'UPDATE_STEP':
            return update(state, { current: action.value });
        case 'SAVE_RECEIPT':
            return update(state, { receipt: action.value });
        case 'SHOW_MODAL':
            return update(state, { modal: true });
        case 'HIDE_MODAL':
            return update(state, { modal: false });
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