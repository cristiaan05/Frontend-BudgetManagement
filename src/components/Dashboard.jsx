import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getAccountsByUser } from "../store/accountSlice";
import { GrTransaction, } from 'react-icons/gr';
import { FaMoneyBillAlt } from "react-icons/fa";
import { SiAddthis } from "react-icons/si";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
    const dispatch = useDispatch();
    const { accounts } = useSelector(state => state.accounts)
    const navigate = useNavigate();
    const redirect = () => {
        navigate('/dashboard/addBankAccount')
    }

    useEffect(() => {
        dispatch(getAccountsByUser())
    }, [dispatch]);

    //console.log(accounts)
    // accounts && accounts.map((account) => {
    //     console.log(account.id);
    //     return account.id
    // })
    return (
        //     <ul>
        //     {accounts && accounts.map((item) => (
        //       <li key={item.name}>{item.name}</li>
        //     ))}
        //   </ul>
        <div className="relative">
            <div className="flex justify-center">
                <table className="w-full divide-y divide-gray-200 md:w-2/3 lg:w-4/5 my-16">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Type</th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Currency</th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Add Transaction</th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Add Exp/Inc</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {accounts && accounts.map((account) => (
                            <tr key={account.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{account.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{account.account_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{account.balance}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{account.currency}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {/* <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
                                        <GrTransaction className="h-6 w-6 text-white-600" aria-hidden="true" color="white" />
                                    </button> */}
                                    <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
                                        <GrTransaction className="h-6 w-6 text-white" aria-hidden="true" />
                                    </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
                                        <FaMoneyBillAlt className="h-6 w-6 text-white" aria-hidden="true" />
                                    </button>
                                </td>

                            </tr>
                        ))}
                        {/* <tr>
                            <td className="px-6 py-4 whitespace-nowrap">John Smith</td>
                            <td className="px-6 py-4 whitespace-nowrap">CEO</td>
                            <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span></td>
                            <td className="px-6 py-4 whitespace-nowrap">Admin</td>
                            <td className="px-6 py-4 whitespace-nowrap">johnsmith@example.com</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">Jane Doe</td>
                            <td className="px-6 py-4 whitespace-nowrap">CTO</td>
                            <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Inactive</span></td>
                            <td className="px-6 py-4 whitespace-nowrap">User</td>
                            <td className="px-6 py-4 whitespace-nowrap">janedoe@example.com</td>
                        </tr> */}
                    </tbody>
                </table>
            </div >
            <div>
                <button onClick={redirect} className="absolute top-0 right-20 mr-20 mt-6 bg-green-500 text-white font-bold py-2 px-4 rounded inline-block text-sm hover:bg-green-400">
                    <SiAddthis className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
                <span className="absolute top-1 right-40 mr-20 mt-6 text-sm ml-2 text-lg font-medium inline-block">Add Account</span>
            </div>

        </div>

    )
}

export default Dashboard;
