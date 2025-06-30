import { useState } from "react";
import { useDispatch } from "react-redux";
import { customerCreation } from "./customerSlice";
import Button from "../../ui/button";

function Customer() {
    const [fullName, setFullName] = useState("");
    const [nationalId, setNationalId] = useState("");

    const dispatch = useDispatch();

    function handleClick() {
        if (!fullName && !nationalId) return;
        dispatch(customerCreation(fullName, nationalId))
    }

    return (
        <div className="flex flex-col gap-4 border p-6 w-[70%] md:w-[25%] rounded-xl">
            <h2 className="text-green-500 text-center text-indigo-700 font-semibold uppercase mb-5 text-xl">Create Account</h2>
            <div className="flex flex-col gap-4"> 
                <div className="flex flex-col gap-3">
                    <label htmlFor="fullname" className="uppercase text-base">full name</label>
                    <input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full py-2 px-3 bg-stone-100 outline-none border-none rounded-sm"
                        id="fullname"
                        placeholder="Fullname"
                    />
                    {/* {fullName === '' && <p className="text-red-300 text-sm">Full Name is required</p>} */}
                </div>
                <div className="flex flex-col gap-3">
                    <label htmlFor="national" className="uppercase text-base">National ID</label>
                    <input
                        value={nationalId}
                        onChange={(e) => setNationalId(e.target.value)}
                        id="national"
                        className="w-full py-2 px-3 bg-stone-100 outline-none border-none rounded-sm"
                        placeholder="National ID"
                    />
                </div>
                <Button onClick={handleClick}>Sign up</Button>
            </div>
        </div>
    );
}

export default Customer;
