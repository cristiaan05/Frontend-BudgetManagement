import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTransactionsByFilters } from '../store/transactionSlice';
import { SiAddthis } from "react-icons/si";
import { BiSearchAlt } from "react-icons/bi";

const data = [
    { id: 1, name: 'John', category: 'A', date: '2022-01-01' },
    { id: 2, name: 'Jane', category: 'B', date: '2022-01-02' },
    { id: 3, name: 'Bob', category: 'A', date: '2022-01-03' },
    { id: 4, name: 'Alice', category: 'C', date: '2022-01-04' },
];

const categories = [
    "Rent or mortgage",
    "Utilities",
    "Insurance",
    "Food and groceries",
    "Transportation",
    "Entertainment",
    "Clothing and personal care",
    "Education",
    "Gifts and donations",
    "Travel and vacations",
    "Debt repayment",
    "Taxes",
    "Miscellaneous",
    "Salary or wages",
    //INCOMES CATEGORies
    "Freelance or self - employment income",
    "Investment income(stocks, mutual funds, real estate)",
    "Rental income",
    "Pension or retirement income",
    "Social Security or other government benefits",
    "Child support or alimony",
    "Interest income(savings accounts, CDs)",
    "Bonus or commission income",
    "Tips or gratuities",
    "transfer",
];

const Transactions = () => {

    const [idBankAccount, setIdBankAccount] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [category, setCategory] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [filteredData, setFilteredData] = useState(data);

    const dispatch = useDispatch();
    const { transactions } = useSelector(state => state.transactions)
    const navigate = useNavigate();
    const redirect = () => {
        navigate('/transactions/AddTransactions')
    }
    const redirectTransfer = () => {
        navigate('/transactions/AddTransfer')
    }

    //console.log(transactions)
    function cargar() {
        dispatch(getTransactionsByFilters({ id_bank_account: idBankAccount, category: category, startDate: startDate, endDate: endDate }))
    }

    useEffect(() => {
        cargar();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleFilter = () => {
        cargar();
        // let filtered = transactions;
        // console.log(filtered)
        // if (startDate && endDate) {
        //     filtered = filtered.filter(
        //         (d) => d.date >= startDate && d.date <= endDate
        //     );
        //     console.log(filtered)
        // }

        // // if (category) {
        // //     filtered = filtered.filter((d) => d.category === category);
        // // }

        setFilteredData(transactions);
    };

    return (
        <>
            <div className="relative">
                <div className="flex flex-col md:flex-row justify-center mb-4">
                    <div className="w-full md:w-1/4 md:mr-2 mb-2 md:mb-0">
                        <label className="block mb-1 font-bold" htmlFor="id_bank_account">
                            Id Account
                        </label>
                        <input
                            className="w-full px-3 py-2 border border-gray-400 rounded shadow appearance-none"
                            type="text"
                            id="id_bank_account"
                            value={idBankAccount}
                            onChange={(e) => setIdBankAccount(e.target.value)}
                        />
                    </div>
                    <div className="w-full md:w-1/4 md:mr-2 mb-2 md:mb-0">
                        <label className="block mb-1 font-bold" htmlFor="start-date">
                            Start Date
                        </label>
                        <input
                            className="w-full px-3 py-2 border border-gray-400 rounded shadow appearance-none"
                            type="date"
                            id="start-date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className="w-full md:w-1/4 md:ml-2 mb-2 md:mb-0">
                        <label className="block mb-1 font-bold" htmlFor="end-date">
                            End Date
                        </label>
                        <input
                            className="w-full px-3 py-2 border border-gray-400 rounded shadow appearance-none"
                            type="date"
                            id="end-date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                    <div className="w-full md:w-1/4 md:ml-2 mb-2 md:mb-0">
                        <label className="block mb-1 font-bold" htmlFor="category">
                            Category
                        </label>
                        <select
                            className="w-full px-3 py-2 border border-gray-400 rounded shadow appearance-none"
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Set Category</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        className="w-full md:w-auto bg-blue-500 text-white font-bold py-2 px-4 rounded inline-block text-sm hover:bg-blue-400 mt-4 md:mt-0 md:ml-4"
                        onClick={handleFilter}
                    >
                        <BiSearchAlt className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                </div>

            </div>


            <div className="relative">
                <div className="flex justify-center">
                    <div className="w-full md:w-2/3 lg:w-4/5 my-4">
                        <div className="flex justify-start my-6">
                            <div>
                                <button onClick={redirect} className="mr-4 bg-green-500 text-white font-bold py-2 px-4 rounded inline-block text-sm hover:bg-green-400">
                                    <SiAddthis className="h-6 w-6 text-white" aria-hidden="true" />
                                </button>
                                <span className="text-sm font-medium">Add Transaction</span>
                            </div>
                            <div className='ml-4'>
                                <button onClick={redirectTransfer} className="mr-4 bg-purple-500 text-white font-bold py-2 px-4 rounded inline-block text-sm hover:bg-purple-400">
                                    <SiAddthis className="h-6 w-6 text-white" aria-hidden="true" />
                                </button>
                                <span className="text-sm font-medium">Transfer</span>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID BANK</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {transactions &&
                                        transactions.map((account) => (
                                            <tr key={account.id}>
                                                <td className="px-6 py-4 whitespace-pre-line">{account.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{account.amount}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{account.category}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{account.type}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{new Date(account.date).toISOString().substring(0, 10)}</td>
                                                <td className="px-6 py-4 whitespace-pre-line">{account.id_bank_account}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>


        </>

    )
}

export default Transactions;
