import { useSelector } from "react-redux";
import { getUserBalance } from "./accountSlice";

    function formatCurrency(value) {
        return new Intl.NumberFormat("en", {
            style: "currency",
            currency: "USD",
        }).format(Number(value));
    }

function BalanceDisplay() {
    const balance = useSelector(getUserBalance)

    
    return <div className="absolute top-20 right-5 bg-[#f7f7f7] py-3 px-5 text-indigo-900 text-center font-bold">{formatCurrency(balance)}</div>;
}

export default BalanceDisplay;
