import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // transactions: [],
    transactions: JSON.parse(localStorage.getItem('expenses')) || [],
};

const expensesSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        addTransaction: (state, action) => {
            state.transactions.push(action.payload);
            localStorage.setItem('expenses', JSON.stringify(state.transactions));
        },
        removeTransaction: (state, action) => {
            state.transactions = state.transactions.filter(transaction => transaction.id !== action.payload);
            localStorage.setItem('expenses', JSON.stringify(state.transactions));
        },
    },
});

export const { addTransaction, removeTransaction } = expensesSlice.actions;
export default expensesSlice.reducer;
