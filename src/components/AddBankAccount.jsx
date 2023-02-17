import { useState } from "react";

const AddBankAccount =()=> {
  const [accountName, setAccountName] = useState("");
  const [bankName, setBankName] = useState("");
  const [balance, setBalance] = useState("");
  const [currency, setCurrency] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform additional validation of the input values here
    const newAccount = {
      accountName: accountName,
      bankName: bankName,
      balance: balance,
      currency: currency,
    };
    console.log(newAccount); // For debugging purposes only
    // You can also send the new account data to a backend server here
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="account-name">Account Name</label>
        <input
          type="text"
          id="account-name"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="bank-name">Bank Name</label>
        <input
          type="text"
          id="bank-name"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="balance">Balance</label>
        <input
          type="text"
          id="balance"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="currency">Currency</label>
        <input
          type="text"
          id="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        />
      </div>
      <button type="submit">Add Account</button>
    </form>
  );
}

export default AddBankAccount;