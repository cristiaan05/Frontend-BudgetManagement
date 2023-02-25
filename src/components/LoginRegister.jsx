import React, { useState, Fragment, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { logIn } from "../store/authSlice";
import { useCookies } from 'react-cookie';
//import axios from 'axios';
//import "tailwindcss/dist/tailwind.min.css";

//librerias a importar para crear modal pop up
import { Dialog, Transition } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/outline'


const LoginRegister = () => {
    const [name, setName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['usertoken']);

    const dispatch=useDispatch();
    //const {isAuth}=useSelector(state=>state.auth)

    const navigate = useNavigate();
    const redirect = () => {
        navigate('/dashboard')
    }

    const [open, setOpen] = useState(false)

    const cancelButtonRef = useRef(null)

    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isLogin) {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/app/signIn`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            let responseJson = await response.json();
            //console.log(responseJson);

            if (responseJson.successfull) {
                setCookie('usertoken', responseJson.token, { expires: new Date(2147483647 * 1000), });
                document.cookie=`authorization=${responseJson.token}`
                window.localStorage.setItem('usertoken', responseJson.token)
                dispatch(logIn({email:email}))
                redirect();
            } else {
                window.localStorage.removeItem('usertoken')
                setError(true);
                //setIsLogin(false);
            }
            // return {
            //     email: responseJson.email,
            //     token: responseJson.token
            // }
            // .then(response => {
            //     if (!response) {
            //         console.log("response")
            //     }
            //     return response.json();
            // })
            // .then(data => {
            //     // Handle successful login here
            //     console.log(data);
            //     //setError(data.message)
            //     // ...
            // })
            // .catch(error => {
            //     // Handle the error here, for example by displaying a message to the user
            //     console.error(error);
            //     setError(error)
            //     //this.setState({ error: error.message });
            // });

            // if (isLogin) {
            //     // Perform login action
            // } else {
            //     // Perform registration action
            // }
        } else {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/app/signUp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    lastname: lastname,
                    email: email,
                    password: password
                })
            });

            const responseJson = await response.json();
            console.log(responseJson);

            if (responseJson.successfull) {
                setOpen(true);
            } else {
                //localStorage.removeItem('usertoken')
                //setIsLogin(false);
            }
        }
    };

    const toggleForm = () => {
        setIsLogin((prevState) => !prevState);
    };

    return (



        //------------------------
        <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="text-center text-3xl  font-bold" style={{ color: "white" }}>{isLogin ? "Login" : "Register"}</h2>

                {isLogin ?
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                                Email address:
                            </label>
                            <input
                                type="email"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                                Password:
                            </label>
                            <input
                                type="password"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                        </div>
                        {error && <div style={{ color: "red" }}>Data not valid</div>}
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            {isLogin ? "Login" : "Register"}
                        </button>
                        <button
                            type="button"
                            className="text-blue-500 font-bold mt-4"
                            onClick={toggleForm}
                        >
                            Switch to {isLogin ? "Register" : "Login"}
                        </button>
                    </form> :
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                                Name:
                            </label>
                            <input
                                type="text"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                value={name}
                                onChange={handleNameChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="lastname">
                                Last Name:
                            </label>
                            <input
                                type="text"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="lastname"
                                value={lastname}
                                onChange={handleLastNameChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                                Email address:
                            </label>
                            <input
                                type="email"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                                Password:
                            </label>
                            <input
                                type="password"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            {isLogin ? "Login" : "Register"}
                        </button>
                        <button
                            type="button"
                            className="text-blue-500 font-bold mt-4"
                            onClick={toggleForm}
                        >
                            Switch to {isLogin ? "Register" : "Login"}
                        </button>
                        {open && (
                            <Transition.Root show={open} as={Fragment}>
                                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
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
                                                                <CheckCircleIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                                            </div>
                                                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                                                    User Registration
                                                                </Dialog.Title>
                                                                <div className="mt-2">
                                                                    <p className="text-sm text-gray-500">
                                                                        Your registration was successful! Thank you for joining us.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                        <button
                                                            type="button"
                                                            className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                                                            onClick={() => { setOpen(false); setIsLogin(true) }}
                                                        >
                                                            Go To Login
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                                            onClick={() => setOpen(false)}
                                                            ref={cancelButtonRef}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </Dialog.Panel>
                                            </Transition.Child>
                                        </div>
                                    </div>
                                </Dialog>
                            </Transition.Root>
                        )}
                    </form>
                }
            </div>
        </div>

    );
};

export default LoginRegister;
