import React,{useEffect} from "react";
import { useDispatch } from 'react-redux'
import { getAccountsByUser } from "../store/accountSlice";

const Dashboard = () => {
    const dispatch = useDispatch();
    //const {accounts}=useSelector(state=>state.accounts)

    useEffect(()=>{
        dispatch(getAccountsByUser())
        
    },[dispatch]);


    return (
        <div className="relative">
            <div className="flex justify-center">
                <table className="w-full divide-y divide-gray-200 md:w-2/3 lg:w-4/5 my-16">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
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
                        </tr>

                    </tbody>
                </table>
            </div >
            <button className="absolute top-0 right-20 mr-20 mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded">
                Button
            </button>
        </div>

    )
}

export default Dashboard;
