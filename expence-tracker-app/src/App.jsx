import { useEffect, useState } from 'react'
import './App.css'
import IncomeModal from './components/IncomModal'
import ExpenseModal from './components/ExpenseModal';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [income, setIncome] = useState(() => {
    const storedIncome = JSON.parse(localStorage.getItem("income"));
    return (storedIncome) ? storedIncome : 0;
  })
  const [expenses, setExpenses] = useState(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses"));
    return (storedExpenses) ? storedExpenses : [];
  })


  const [balance, setBalance] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false)
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const deleteNotify = () => toast.success("Successfully deleted!", {
    transition: Flip,
    autoClose: 500,
    pauseOnHover: true,
  })

  //open income model function
  const openIncomeModals = () => {
    setIsIncomeModalOpen(true)
  }
  //close income model function
  const handleIncomeModalClose = () => {
    setIsIncomeModalOpen(false)
  }
  //open expense Modal
  const openExpnseModal = () => {
    setIsExpenseModalOpen(true)
  }
  //close expense Modal
  const closeExpenseModal = () => {
    setIsExpenseModalOpen(false)
  }

  //add income
  const handleIncome = (amount) => {
    setIncome(income + +amount);
    handleIncomeModalClose();

  }

  //add expnse function
  const addExpense = (expense) => {
    const newExp = [...expenses, expense]
    setExpenses(newExp)

  }
  //useEffect
  useEffect(() => {
    let totalExpense = 0;
    expenses.forEach((exp) => {
      totalExpense += +exp.expense
    });
    setBalance(income - totalExpense)
    setTotalExpense(totalExpense);

    //save in local storage
    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("income", JSON.stringify(income));

  }, [expenses, income])

  const delItem = (index) => {
    if (window.confirm("Do you want to delete?")) {     //for delete use confirm method
      const newItems = expenses.filter((exp, i) => i != index);
      setExpenses(newItems);
      deleteNotify();
    }
  }

  console.log(expenses);
  return (
    <>
      <div className='container'>
        <div className='bg-dark text-white p-3'>
          <h1 className='text-center mb-5'>Expense Tracker</h1>
          <div className='row'>
            <div className='col-md-4 text-center'>
              <h3>Amount In</h3>
              <h5 className='text-success'>${income}</h5>
              <button className='btn btn-success' onClick={openIncomeModals}>Add Income</button>

              <IncomeModal handleIncome={handleIncome} isIncomeModalOpen={isIncomeModalOpen} IsIncomeModalOpen={isIncomeModalOpen} />

            </div>
            <div className='col-md-4 text-center'>
              <h3>Expenses</h3>
              <h5 className='text-warning'>${totalExpense}</h5>
            </div>

            <div className='col-md-4 text-center'>
              <h3>Balance</h3>
              <h5 className='text-danger'>${balance}</h5>
              <button className='btn btn-danger' onClick={openExpnseModal}>Add Expense</button>
              <ExpenseModal addExpense={addExpense} isExpenseModalOpen={isExpenseModalOpen} setIsExpenseModalOpen={setIsExpenseModalOpen} closeExpenseModal={closeExpenseModal} />
            </div>
          </div>
        </div>
        <div className='p-3 bg-white'>
          <table className='table'>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                expenses.map((exp, i) => {
                  return (
                    <tr key={i}>
                      <td>{exp.date}</td>
                      <td>{exp.detail}</td>
                      <td>{exp.category}</td>
                      <td>${exp.expense}</td>
                      <td>
                        <button className="btn btn-sm btn-danger" onClick={() => { delItem(i) }} >Delete</button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
export default App




