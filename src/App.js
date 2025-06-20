import CreateCustomer from "./features/customers/CreateCustomer";
import Customer from "./features/customers/Customer";
import AccountOperations from "./features/accounts/AccountOperations";
import BalanceDisplay from "./features/accounts/BalanceDisplay";
import { useSelector } from "react-redux";


// store.dispatch({type: 'account/deposit', payload: 10000})
// console.log(store.getState())

function App() {
    const customerFullName = useSelector(store => store.customer.fullName)

    return (
        <div>
            <h1>🏦 The React-Redux Bank ⚛️</h1>
            {customerFullName === '' 
                ? 
                <CreateCustomer />
                :
                <>  
                    <Customer />
                    <AccountOperations />
                    <BalanceDisplay />
                </>
            }
        </div>
    );
}

export default App;
