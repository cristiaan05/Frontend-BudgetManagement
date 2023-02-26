import { useState } from 'react';

function ExchangeForm() {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [exchangeCurrency, setExchangeCurrency] = useState('EUR');
  const [baseValue, setBaseValue] = useState(0);
  const [exchangeValue, setExchangeValue] = useState(0);

  // const rates = [
  //   //USD
  //   { USD: 1, EUR: 0.943042 },
  //   { USD: 1, MXN: 18.363905 },
  //   { USD: 1, JPY: 134.865498 },
  //   { USD: 1, GTQ: 7.815839 },
  //   //MXN
  //   { MXN: 1, GTQ: 0.425563 },
  //   { MXN: 1, USD: 0.054456 },
  //   { MXN: 1, JPY: 7.344122 },
  //   { MXN: 1, EUR: 0.051344 },
  //   //EUR
  //   { EUR: 1, MXN: 19.473843 },
  //   { EUR: 1, USD: 1.060459 },
  //   { EUR: 1, JPY: 143.016116 },
  //   { EUR: 1, GTQ: 8.288375 },
  //   //GTQ
  //   { GTQ: 1, EUR: 0.120639 },
  //   { GTQ: 1, USD: 0.127945 },
  //   { GTQ: 1, JPY: 17.255217 },
  //   { GTQ: 1, MXN: 2.349828 },
  //   //JPY
  //   { JPY: 1, MXN: 0.136181 },
  //   { JPY: 1, USD: 0.007415 },
  //   { JPY: 1, GTQ: 0.057953 },
  //   { JPY: 1, EUR: 0.006992 }
  // ];

  const calculateExchange = async (event) => {
    event.preventDefault();
    const token = window.localStorage.getItem('usertoken');
    const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/app/getExchanges`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        baseCurrency: baseCurrency,
        currencyToChange: exchangeCurrency,
        baseValue: baseValue
      })
    });

    let responseJson = await response.json();
    console.log(responseJson)
    if (responseJson) {
      setExchangeValue(responseJson.value)
    }


    // const rate = rates.find(
    //   (rate) => rate[baseCurrency] && rate[exchangeCurrency]
    // );

    // const rateBaseToExchange = rate[exchangeCurrency] / rate[baseCurrency];
    // setExchangeValue((baseValue * rateBaseToExchange).toFixed(2));
  };

  const handleBaseCurrencyChange = (event) => {
    setBaseCurrency(event.target.value);
  };

  const handleExchangeCurrencyChange = (event) => {
    setExchangeCurrency(event.target.value);
  };

  const handleBaseValueChange = (event) => {
    setBaseValue(event.target.value);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="base">
            Base Currency
          </label>
          <select
            id="base"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={baseCurrency}
            onChange={handleBaseCurrencyChange}
          >
            <option value="USD">USD $</option>
            <option value="EUR">EUR €</option>
            <option value="JPY">JPY ¥</option>
            <option value="MXN">MXN $</option>
            <option value="GTQ">GTQ Q</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="exchange"
          >
            Exchange Currency
          </label>
          <select
            id="exchange"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={exchangeCurrency}
            onChange={handleExchangeCurrencyChange}
          >
            <option value="USD">USD $</option>
            <option value="EUR">EUR €</option>
            <option value="JPY">JPY ¥</option>
            <option value="MXN">MXN $</option>
            <option value="GTQ">GTQ Q</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="baseValue"
          >
            Base Value
          </label>
          <input
            id="baseValue"
            type="number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="0.00"
            value={baseValue}
            onChange={handleBaseValueChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="exchangeValue">
            Exchange Value
          </label>
          <input
            id="exchangeValue"
            type="number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="0.00"
            value={exchangeValue}
            readOnly
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={calculateExchange}
          >
            Calculate
          </button>
        </div>
      </form>
    </div>
  );
}

export default ExchangeForm;
