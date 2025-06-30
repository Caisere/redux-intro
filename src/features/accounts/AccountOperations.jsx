import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposit, withdraw, loan, payLoan, getUserAccount } from "./accountSlice";
import Button from "../../ui/button";

function AccountOperations() {
    const [depositAmount, setDepositAmount] = useState("");
    const [withdrawalAmount, setWithdrawalAmount] = useState("");
    const [loanAmount, setLoanAmount] = useState("");
    const [loanPurpose, setLoanPurpose] = useState("");
    const [currency, setCurrency] = useState("USD");
    
    const dispatch = useDispatch();
    const account = useSelector(getUserAccount)


    // getting necessary variable out of the account
    const {loan: currentLoan, loanPurpose: currentLoanPurpose, isLoading} = account


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
        <div className="px-4 flex flex-col gap-3 md:gap-7">
            <h2 className="font-semibold md:text-xl">Your account operations</h2>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="deposit">Deposit</label>
                    <div className="space-x-1 w-full">
                        <input
                            type="text"
                            value={depositAmount}
                            id="deposit"
                            onChange={(e) => setDepositAmount(+e.target.value)}
                            className="py-2 px-3 bg-stone-100 outline-none border-none rounded-sm"
                        />
                        <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className="py-2 px-3 bg-stone-100 outline-none border-none rounded-sm"
                        >
                            <option value="USD">US Dollar</option>
                            <option value="EUR">Euro</option>
                            <option value="GBP">British Pound</option>
                        </select>
                    </div>
                    <Button disabled={isLoading} onClick={handleDeposit}>{isLoading ? 'Converting...' :`Deposit ${depositAmount}`}</Button>
                </div>
                {/* {error && <p>{conversionError}</p>} */}
                <div className="flex flex-col">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="withdraw">Withdraw</label>
                        <input
                            type="text"
                            value={withdrawalAmount}
                            onChange={(e) => setWithdrawalAmount(+e.target.value)}
                            id="withdraw"
                            className="flex-1 py-2 px-3 bg-stone-100 outline-none border-none rounded-sm"
                        />
                    </div>
                    <Button onClick={handleWithdrawal}>Withdraw {withdrawalAmount}</Button>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="loan">Request loan</label>
                    <div className="flex flex-col gap-2">
                        <input
                            type="text"
                            disabled={currentLoan > 0}
                            value={loanAmount}
                            id="loan"
                            onChange={(e) => setLoanAmount(+e.target.value)}
                            placeholder="Loan amount"
                            className="py-2 px-3 bg-stone-100 outline-none border-none rounded-sm"
                        />
                        <input
                            value={loanPurpose}
                            disabled={currentLoan > 0}
                            onChange={(e) => setLoanPurpose(e.target.value)}
                            placeholder="Loan purpose"
                            className="py-2 px-3 bg-stone-100 outline-none border-none rounded-sm"
                        />
                    </div>
                    <Button disabled={currentLoan > 0} onClick={handleRequestLoan}>Request Loan</Button>
                </div>

                {currentLoan > 0 &&
                    <div className="flex flex-col gap-2">
                        <span className="space-x-2 ">Pay back <span className="text-indigo-500">${currentLoan} {currentLoanPurpose}</span></span>
                        <Button onClick={handlePayLoan}>Pay Loan</Button>
                    </div>
                }
            </div>
        </div>
    );
}

export default AccountOperations;
