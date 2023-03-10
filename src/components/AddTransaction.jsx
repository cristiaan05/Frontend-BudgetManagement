import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { MdOutlinePayment } from 'react-icons/md'
import { useLocation, useNavigate } from 'react-router-dom'
import Alert from './Alert'
import { useDispatch, useSelector } from 'react-redux'
import { getAccountsByUser } from '../store/accountSlice'

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
];

const AddTransaction = () => {
    // eslint-disable-next-line no-unused-vars
    const [open, setOpen] = useState(true)
    const [formData, setFormData] = useState({ id_bank_account: '', amount: '', date: '', category: '', type: '' })
    const cancelButtonRef = useRef(null)

    //alert succesfful or error
    const [showAlert, setShowAlert] = useState(false);
    const [startDate, setStartDate] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState(false);
    const [currency, setCurrency] = useState('')

    const { accounts } = useSelector(state => state.accounts)
    const dispatch = useDispatch()
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        if (e.target.name === 'id_bank_account') {
            const currencySelected = e.target.options[e.target.selectedIndex].getAttribute('data-currency');
            setCurrency(currencySelected)
        }

        //etAccountsUser(accounts)
        //console.log(e.target)
    }

    const navigate = useNavigate();
    const { state } = useLocation();
    if (state) {
        const { id } = state;
        formData.id_bank_account = id;
        //setCurrency(currency);
    }

    const redirect = () => {
        navigate(-1)

    }
    function cargar() {
        dispatch(getAccountsByUser())
    }

    useEffect(() => {
        cargar()
        //setAccountsUser(accounts)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    //setAccountsUser(accounts)
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let token = window.localStorage.getItem('usertoken')
            const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/app/addTransaction`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                    //'Cookie': `authorization=${localStorage.getItem('usertoken')}`
                },
                body: JSON.stringify({
                    date: formData.date,
                    amount: formData.amount,
                    category: formData.category,
                    type: formData.type,
                    id_bank_account: formData.id_bank_account
                })
            });
            console.log(formData)
            let responseJson = await response.json();
            console.log(responseJson);

            if (responseJson.successfull) {
                setShowAlert(true)
                setTimeout(() => setShowAlert({ open: false }), 1000);

            } else {
                setShowAlert(true)
                setError(true);
                setTimeout(() => setShowAlert({ open: false }), 1000);
                //setIsLogin(false);
            }
        } catch (error) {
            console.log(error)
        }
        setShowAlert(true);
        //redirect()
    }

    return (
        <>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={redirect}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <MdOutlinePayment className="h-6 w-6 text-green-600" aria-hidden="true" />
                                            </div>
                                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                                    Add Transaction
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <form onSubmit={handleSubmit}>
                                                        <div className="mt-4">
                                                            <label htmlFor="id_bank_account" className="block text-sm font-medium text-gray-700">
                                                                Accounts Available
                                                            </label>
                                                            <div className="mt-1">
                                                                <select
                                                                    id="id_bank_account"
                                                                    name="id_bank_account"
                                                                    value={formData.id_bank_account}
                                                                    onChange={handleInputChange}
                                                                    className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-2 rounded-md py-2 px-3"
                                                                    required
                                                                >
                                                                    <option value="">-- Select Account --</option>
                                                                    {accounts && accounts.map((account) => (
                                                                        <option key={account.id} value={account.id} data-currency={account.currency}>
                                                                            {account.id}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="mt-4">
                                                            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                                                                Transaction Type
                                                            </label>
                                                            <div className="mt-1">
                                                                <select
                                                                    id="type"
                                                                    name="type"
                                                                    value={formData.type}
                                                                    onChange={handleInputChange}
                                                                    className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-2 rounded-md py-2 px-3"
                                                                    required
                                                                >
                                                                    <option value="">-- Select Transaction Type --</option>
                                                                    <option value="expense">Expense</option>
                                                                    <option value="income">Income</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="mt-4">
                                                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                                                Category
                                                            </label>
                                                            <div className="mt-1">
                                                                <select
                                                                    id="category"
                                                                    name="category"
                                                                    value={formData.category}
                                                                    onChange={handleInputChange}
                                                                    required
                                                                    className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-2 rounded-md py-2 px-3"
                                                                >
                                                                    <option value="">-- Select Category --</option>
                                                                    {categories.map((category) => (
                                                                        <option key={category} value={category}>
                                                                            {category}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="mt-4">
                                                            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                                                                Date
                                                            </label>
                                                            <input
                                                                className="w-full px-3 py-2 border border-gray-400 rounded shadow appearance-none"
                                                                type="date"
                                                                id="date"
                                                                value={formData.date = startDate}
                                                                onChange={(e) => setStartDate(e.target.value)}
                                                            />
                                                        </div>

                                                        <div className="mt-4">
                                                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                                                                Amount
                                                            </label>
                                                            <div className="relative mt-1 rounded-md shadow-sm">
                                                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                                    <span className="text-gray-500 sm:text-sm">{currency}</span>
                                                                </div>
                                                                <input
                                                                    type="number"
                                                                    name="amount"
                                                                    id="amount"
                                                                    value={formData.amount}
                                                                    onChange={handleInputChange}
                                                                    className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                                    placeholder="0.00"
                                                                    required
                                                                />
                                                                {/* <div className="absolute inset-y-0 right-0 flex items-center">
                                <label htmlFor="currency" className="sr-only">
                                  Balance
                                </label>
                                <select
                                  id="balance"
                                  name="balance"
                                  className="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                >
                                  <option>USD</option>
                                  <option>EUR</option>
                                  <option>GTQ</option>
                                  <option>MXN</option>
                                  <option>JPY</option>
                                </select>
                              </div> */}
                                                            </div>
                                                        </div>
                                                        <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                                                            <button
                                                                type="submit"
                                                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                                                            // onClick={handleSubmit}
                                                            >
                                                                Add
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="mt-3 w-ful l inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                                                onClick={redirect}
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

            {showAlert && error === false && <Alert message="Transaction created successful!" color="green" />}
            {showAlert && error && <Alert message="Error creating Transaction!" color="red" />}
        </>

    )
}

export default AddTransaction;


