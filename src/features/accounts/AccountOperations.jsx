import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposit, withdraw, loan, payLoan } from "./accountSlice";

function AccountOperations() {
    const [depositAmount, setDepositAmount] = useState("");
    const [withdrawalAmount, setWithdrawalAmount] = useState("");
    const [loanAmount, setLoanAmount] = useState("");
    const [loanPurpose, setLoanPurpose] = useState("");
    const [currency, setCurrency] = useState("USD");
    
    const dispatch = useDispatch();
    const account = useSelector(store => store.account)

    // destructuring necessary variable out of the account
    const {loan: currentLoan, loanPurpose: currentLoanPurpose, isLoading} = account

    // if (error) 
    //  conversionError, error;
    //     console.log(conversionError)
    // }


    function handleDeposit() {
        if(!depositAmount) return
        dispatch(deposit(depositAmount, currency))
        setDepositAmount('')
        setCurrency('USD')
    }

    function handleWithdrawal() {
        if (!withdrawalAmount) return;
        dispatch(withdraw(withdrawalAmount))
        setWithdrawalAmount('')
    }

    function handleRequestLoan() {
        if (!loanAmount && !loanPurpose) return;
        dispatch(loan(loanAmount, loanPurpose))
        setLoanAmount('')
        setLoanPurpose('') 
    }

    function handlePayLoan() {
        // if (!loanAmount) return;
        dispatch(payLoan())
    }

    return (
        <div>
            <h2>Your account operations</h2>
            <div className="inputs">
                <div>
                    <label>Deposit</label>
                    <input
                        type="text"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(+e.target.value)}
                    />
                    <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                    >
                        <option value="USD">US Dollar</option>
                        <option value="EUR">Euro</option>
                        <option value="GBP">British Pound</option>
                    </select>

                    <button disabled={isLoading} onClick={handleDeposit}>{isLoading ? 'Converting...' :`Deposit ${depositAmount}`}</button>
                </div>
                {/* {error && <p>{conversionError}</p>} */}
                <div>
                    <label>Withdraw</label>
                    <input
                        type="text"
                        value={withdrawalAmount}
                        onChange={(e) => setWithdrawalAmount(+e.target.value)}
                    />
                    <button onClick={handleWithdrawal}>
                        Withdraw {withdrawalAmount}
                    </button>
                </div>

                <div>
                    <label>Request loan</label>
                    <input
                        type="text"
                        disabled={currentLoan > 0}
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(+e.target.value)}
                        placeholder="Loan amount"
                    />
                    <input
                        value={loanPurpose}
                        disabled={currentLoan > 0}
                        onChange={(e) => setLoanPurpose(e.target.value)}
                        placeholder="Loan purpose"
                    />
                    <button disabled={currentLoan > 0} onClick={handleRequestLoan}>Request loan</button>
                </div>

                {currentLoan > 0 &&
                    <div>
                    <span>Pay back ${currentLoan}{currentLoanPurpose}</span>
                    <button onClick={handlePayLoan}>Pay loan</button>
                </div>}
            </div>
        </div>
    );
}

export default AccountOperations;
