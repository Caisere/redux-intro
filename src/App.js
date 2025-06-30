import CreateCustomer from "./features/customers/CreateCustomer";
import Customer from "./features/customers/Customer";
import AccountOperations from "./features/accounts/AccountOperations";
import BalanceDisplay from "./features/accounts/BalanceDisplay";
import { useSelector } from "react-redux";
import { getUserAccountName } from "./features/customers/customerSlice";
import Header from "./ui/header";


// store.dispatch({type: 'account/deposit', payload: 10000})
// console.log(store.getState())

function App() {
    const customerFullName = useSelector(getUserAccountName)

    return (
        <div className="grid grid-rows-[auto_1fr]">
            <Header />
            <main className="flex flex-col items-center justify-center mt-24">
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
            </main>
        </div>
    );
}

export default App;
