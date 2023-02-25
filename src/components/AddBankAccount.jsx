import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { BsBank } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import Alert from './Alert'

const AddBankAccount = () => {
  // eslint-disable-next-line no-unused-vars
  const [open, setOpen] = useState(true)
  const [cookies] = useCookies(['usertoken']);
  const [formData, setFormData] = useState({ account_name: '', balance: '', currency: '' })
  const cancelButtonRef = useRef(null)

  //alert succesfful or error
  const [showAlert, setShowAlert] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    //console.log(e.target)
  }

  const navigate = useNavigate();
  const redirect = () => {
    navigate('/dashboard/')
  }

  // const account_name = (event) => {
  //   setFormData({account_name:account_name})
  // };
  // const handleEmailChange = (event) => {
  //   setEmail(event.target.value);
  // };

  // const handlePasswordChange = (event) => {
  //   setPassword(event.target.value);
  // };



  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(localStorage)
    let token=window.localStorage.getItem('usertoken');
    console.log(token)
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/app/addAcount`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': `authorization=${cookies.usertoken}`
        },
        body: JSON.stringify({
          account_name: formData.account_name,
          balance: formData.balance,
          currency: formData.currency
          
        })
      });

      let responseJson = await response.json();
      console.log(responseJson);

      if (responseJson.successfull) {
          setShowAlert(true)
          setTimeout(() => setShowAlert({open:false}), 1000);
          
      } else {
        setShowAlert(true)
        setError(true);
        setTimeout(() => setShowAlert({open:false}), 1000);
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
                        <BsBank className="h-6 w-6 text-green-600" aria-hidden="true" />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                          Add Bank Account
                        </Dialog.Title>
                        <div className="mt-2">
                          <form onSubmit={handleSubmit}>
                            <div className="mt-4">
                              <label htmlFor="account_name" className="block text-sm font-medium text-gray-700">
                                Account Type
                              </label>
                              <div className="mt-1">
                                <select
                                  id="account_name"
                                  name="account_name"
                                  value={formData.account_name}
                                  onChange={handleInputChange}
                                  className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-2 rounded-md py-2 px-3"
                                  required
                                >
                                  <option value="">-- Select Account Type --</option>
                                  <option value="current">Current</option>
                                  <option value="savings">Savings</option>
                                  <option value="student">Student</option>
                                  <option value="credit_card">Credit Card</option>
                                  <option value="cheking">Cheking</option>
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
                                  <option value="$$">MXN $</option>
                                  <option value="Q">GTQ Q</option>
                                </select>
                              </div>
                            </div>
                            <div>
                              <label htmlFor="balance" className="block text-sm font-medium text-gray-700">
                                Balance
                              </label>
                              <div className="relative mt-1 rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                  <span className="text-gray-500 sm:text-sm">{formData.currency}</span>
                                </div>
                                <input
                                  type="number"
                                  name="balance"
                                  id="balance"
                                  value={formData.balance}
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

      {showAlert && error===false && <Alert message="Bank Account created successful!" color="green" />}
      {showAlert &&error && <Alert message="Error creating bank account!" color="red" />}
    </>

  )
}

export default AddBankAccount;


