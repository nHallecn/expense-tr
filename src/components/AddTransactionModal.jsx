import React from 'react'
import { todayString } from '../utils/helper'

const AddTransactionModal = () => {

  const EMPTY_FORM = {
    description: "",
    amount:'',
    type:'expenses',
    category:'Food & Drinks',
    date: todayString()
  }

  return (
    <div>
        <div>
          <div>
            <h2>Add Transaction</h2>
            <button>X</button>
          </div>

          <div>
            {
              ['Expenses', 'Income'].map((t)=>(
                <button key={t}>{t}</button>
              ))
            }
          </div>

          <div>
            <label for='description'>Description</label>
            <input 
              type='text'
              placeholder='e.g. Grocery Shopping'
            />
          </div>

          <div>
            <label for='amount'>Amount</label>
            <input 
              type='number'
              placeholder='0.0'
            />
          </div>

          <div>
            <label for='category'>Category</label>
            <select>
              
            </select>
          </div>

          <div>
            <label for='date'>Date</label>
            <input 
              type='date'
            />
          </div>
        </div>
    </div>
  )
}

export default AddTransactionModal