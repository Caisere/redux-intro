import { useSelector } from "react-redux";
import { getUserAccountName } from "./customerSlice";


function Customer() {
    const fullName = useSelector(getUserAccountName)


    return <h2 className="absolute top-20 left-3 text-sm p-2 rounded-none md:top-20 md:left-5 border md:p-3 rounded-xl ">👋 Welcome, <span className="text-indigo-700 font-semibold">{fullName}</span></h2>;
}

export default Customer;
