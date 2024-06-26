import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = {
    counter: 0,
    showCounter: true,
}

const counterSlice = createSlice({
    name: 'counter',
    initialState: initialCounterState,
    reducers: {
        increment(state) {
            state.counter++;
        },
        decrement(state) {
            state.counter--;
        },
        increase(state, action) {
            state.counter += action.payload;
        },
        toggle(state) {
            state.showCounter = !state.showCounter;
        }
    }
})

// const counterReducer = (state = initialState, action) => {
//     if (action.type === 'increment')
//         return {
//             ...state,
//             counter: state.counter + 1,
//         }
//     if (action.type === 'decrement')
//         return {
//             ...state,
//             counter: state.counter - 1,
//         }
//     if (action.type === 'increase')
//         return {
//             ...state,
//             counter: state.counter + action.amount,
//         }
//     if (action.type === 'toggle')
//         return {
//             ...state,
//             showCounter: !state.showCounter
//         }
//     return state
// }

export const counterActions = counterSlice.actions;

export default counterSlice.reducer