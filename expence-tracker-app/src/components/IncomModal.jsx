import React from 'react'
import { useState } from 'react';

function IncomeModal({ isIncomeModalOpen, handleIncomeModalClose, handleIncome }) {
    const [amount, setAmount] = useState(0);
    if (isIncomeModalOpen == false) {
        return null;
    }
    //send income to app
    const putIncome = () => {
        handleIncome(amount);
        setAmount(0);
    }
    return (
        <div className="mdl-overlay" >
            <div className="mdl-container" onClick={(e) => e.stopPropagation()}>
                <div className="mdl-header">
                    <button onClick={handleIncomeModalClose} className="close-button">X</button>
                </div>
                <div className="mdl-body">
                    <h5>Add Income</h5>
                    <div className='form-group d-flex gap-2'>
                        <input type="text" onChange={(e) => setAmount(e.target.value)} className='form-control' placeholder="Enter Income" />
                        <button className="btn btn-primary btn-sm" onClick={putIncome}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IncomeModal