import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { BiTransferAlt } from 'react-icons/bi'
import { useLocation, useNavigate } from 'react-router-dom'
import Alert from './Alert'
import { useDispatch, useSelector } from 'react-redux'
import { getAccountsByUser } from '../store/accountSlice'



const AddTransfer = () => {
    // eslint-disable-next-line no-unused-vars
    const [open, setOpen] = useState(true)
    const [formData, setFormData] = useState({ date: '', amount: '', currency: '', id_account: '', id_account_destination: '' })
    const cancelButtonRef = useRef(null)

    //alert succesfful or error
    const [showAlert, setShowAlert] = useState(false);
    const [startDate, setStartDate] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState(false);

    const { accounts } = useSelector(state => state.accounts)
    const dispatch = useDispatch()
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        //etAccountsUser(accounts)
        //console.log(e.target)
    }

    const navigate = useNavigate();
    const { state } = useLocation();
    if (state) {
        const { id } = state;
        formData.id_account = id;
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
            const response = await fetch('http://localhost:3000/app/transferMyAccounts', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `authorization=${localStorage.getItem('usertoken')}`
                },
                body: JSON.stringify({
                    date: formData.date,
                    amount: formData.amount,
                    currency: formData.currency,
                    id_account: formData.id_account,
                    id_account_destination: formData.id_account_destination
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
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <BiTransferAlt className="h-6 w-6 text-purple-600" aria-hidden="true" />
                                            </div>
                                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                                    Transfer between accounts
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <form onSubmit={handleSubmit}>
                                                        <div className="mt-4">
                                                            <label htmlFor="id_account" className="block text-sm font-medium text-gray-700">
                                                                Transfer from:
                                                            </label>
                                                            <div className="mt-1">
                                                                <select
                                                                    id="id_account"
                                                                    name="id_account"
                                                                    value={formData.id_account}
                                                                    onChange={handleInputChange}
                                                                    className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-2 rounded-md py-2 px-3"
                                                                    required
                                                                >
                                                                    <option value="">-- Select Account --</option>
                                                                    {accounts && accounts.map((account) => (
                                                                        <option key={account.id} value={account.id}>
                                                                            {account.id}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="mt-4">
                                                            <label htmlFor="id_account_destination" className="block text-sm font-medium text-gray-700">
                                                                Transfer to:
                                                            </label>
                                                            <div className="mt-1">
                                                                <select
                                                                    id="id_account_destination"
                                                                    name="id_account_destination"
                                                                    value={formData.id_account_destination}
                                                                    onChange={handleInputChange}
                                                                    className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-2 rounded-md py-2 px-3"
                                                                    required
                                                                >
                                                                    <option value="">-- Select Account --</option>
                                                                    {accounts && accounts.map((account) => (
                                                                        <option key={account.id} value={account.id}>
                                                                            {account.id}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="mt-4">
                                                            <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
                                                                Currency
                                                            </label>
                                                            <div className="mt-1">
                                                                <select
                                                                    id="currency"
                                                                    name="currency"
                                                                    value={formData.currency}
                                                                    onChange={handleInputChange}
                                                                    required
                                                                    className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-2 rounded-md py-2 px-3"
                                                                >
                                                                    <option value="">-- Select Currency --</option>
                                                                    <option value="$">USD $</option>
                                                                    <option value="€">EUR €</option>
                                                                    <option value="¥">JPY ¥</option>
                                                                    <option value="$">MXN $</option>
                                                                    <option value="Q">GTQ Q</option>
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
                                                                    <span className="text-gray-500 sm:text-sm">{formData.currency}</span>
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
                                                            </div>
                                                        </div>
                                                        <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                                                            <button
                                                                type="submit"
                                                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple  -500 sm:ml-3 sm:w-auto sm:text-sm"
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
            {showAlert && error && <Alert message="Error creating bank account!" color="red" />}
        </>

    )
}

export default AddTransfer;


