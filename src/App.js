import React, { useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction, removeTransaction } from './redux/expensesSlice';
import { FaMinus, FaPlus, FaRegTrashAlt } from "react-icons/fa";


const App = () => {

  const dispatch = useDispatch();
  const transactions = useSelector(state => state.expenses.transactions);
  console.log(transactions)

  const [newTransaction, setNewTransaction] = useState({
    type: 'expense',
    category: '',
    amount: '',
    date: '',
  });

  const handleAddTransaction = () => {
    if (newTransaction.category && newTransaction.amount && newTransaction.date) {
      const transactionObject = {
        id: new Date().getTime(),
        type: newTransaction.type,
        category: newTransaction.category,
        amount: parseFloat(newTransaction.amount),
        date: newTransaction.date,
      };

      dispatch(addTransaction(transactionObject));
      setNewTransaction({
        type: 'expense',
        category: '',
        amount: '',
        date: '',
      });
    }
  };

  const handleRemoveTransaction = id => {
    dispatch(removeTransaction(id));
  };

  const calculateBalance = () => {
    return transactions.reduce((balance, transaction) => {
      return transaction.type === 'expense'
        ? balance - transaction.amount
        : balance + transaction.amount;
    }, 0);
  };

  const incomeAmount = () => {
    return transactions.reduce((totalIncome, transaction) => {
      return transaction.type === 'income' ? totalIncome + transaction.amount : totalIncome;
    }, 0);
  };

  const expenseAmount = () => {
    return transactions.reduce((totalExpense, transaction) => {
      return transaction.type === 'expense' ? totalExpense + transaction.amount : totalExpense;
    }, 0);
  };


  return (
    <>
      <section className='pt-5'>
        <div className='container'>
          <div className='row'>

            <div className='col-lg-3'>
              <div className='ex-border text-center'>
                <div className='bold-border-left'></div>
                <h3>Income</h3>
                <ul>
                  <li>₹ {incomeAmount()}</li>
                  {transactions.map(transaction => (
                    <li key={transaction.id} className='trans-list'>
                      <span className='me-2 text-success'>{transaction.type === 'income' ? transaction.category : ''}</span>
                      <span>{transaction.type === 'income' ? transaction.amount : ''}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className='col-lg-6'>
              <div className='ex-border-center text-center pb-4'>
                <div className='bold-border-center'></div>
                <h1>Expense Tracker</h1>
                <h5>Balance</h5>
                <p>₹ {calculateBalance()}</p>

                <div>
                  <ul>
                    {transactions.map(transaction => (
                      <li key={transaction.id}>
                        <span>{transaction.type === 'expense' ? <FaMinus className='text-danger' /> : <FaPlus className='text-success' />}</span>
                        <span>{transaction.amount}</span>
                        <span>{transaction.category}</span>
                        <span>{transaction.date}</span>
                        <button onClick={() => handleRemoveTransaction(transaction.id)}><FaRegTrashAlt /></button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className='ex-form'>
                  <select
                    value={newTransaction.type}
                    onChange={e => setNewTransaction({ ...newTransaction, type: e.target.value })}
                  >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                </div>
                <div className='ex-form'>
                  <input
                    type="text"
                    placeholder='Category'
                    value={newTransaction.category}
                    onChange={e => setNewTransaction({ ...newTransaction, category: e.target.value })}
                  />
                </div>
                <div className='ex-form'>
                  <input
                    type="number"
                    placeholder='Amount'
                    value={newTransaction.amount}
                    onChange={e => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                  />
                </div>
                <div className='ex-form'>
                  <input
                    type="date"
                    placeholder='Date'
                    value={newTransaction.date}
                    onChange={e => setNewTransaction({ ...newTransaction, date: e.target.value })}
                  />
                </div>
                <div>
                  <button onClick={handleAddTransaction} className='add-btn'>Add Transaction</button>
                </div>
              </div>
            </div>

            <div className='col-lg-3'>
              <div className='ex-border ex-right text-center'>
                <div className='bold-border-right'></div>
                <h3>Expense</h3>
                <ul>
                  <li>₹ {expenseAmount()}</li>
                  {transactions.map(transaction => (
                    <li key={transaction.id} className='trans-list'>
                      <span className='me-2 text-danger'>{transaction.type === 'expense' ? transaction.category : ''}</span>
                      <span>{transaction.type === 'expense' ? transaction.amount : ''}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default App;
