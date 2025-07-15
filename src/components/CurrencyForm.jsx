import { useState, useEffect, useRef } from 'react';
import currencies from '../data/currencies.js';
import Result from './Result.jsx';

export default function CurrencyForm() {
    // initialize the main states
    const [fromSearch, setFromSearch] = useState('')
    const [toSearch, setToSearch] = useState('')
    const [resultObj, setResultObj] = useState({})
    const [error, setError] = useState('')
    
    const [amount, setAmount] = useState(1)
    const [initialCurrency, setInitialCurrency] = useState("USD")
    const [targetCurrency, setTargetCurrency] = useState("EUR")
    const resultSection = useRef(null)

    // create the filter to make the filter on the select menu
    const filteredFromCurrencies = currencies.filter(currency =>
        currency.toLowerCase().includes(fromSearch.toLowerCase())
    )
    
    const filteredToCurrencies = currencies.filter(currency =>
        currency.toLowerCase().includes(toSearch.toLowerCase())
    )

    // useEffect to change the select menu based on the input when it changes
    useEffect(() => {
        if (fromSearch && filteredFromCurrencies.length > 0 && !filteredFromCurrencies.includes(initialCurrency)) {
            setInitialCurrency(filteredFromCurrencies[0])
        }
    }, [fromSearch, filteredFromCurrencies, initialCurrency])

    useEffect(() => {
        if (toSearch && filteredToCurrencies.length > 0 && !filteredToCurrencies.includes(targetCurrency)) {
            setTargetCurrency(filteredToCurrencies[0])
        }
    }, [toSearch, filteredToCurrencies, targetCurrency])


    // a function to happens when the form is submitted
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // check the inputs
        if (!amount || amount <= 0) {
            setError('Please enter a valid amount')
            return
        }

        if (!initialCurrency || !targetCurrency) {
            setError('Please select both currencies')
            return
        }
        
        try {
            setError('');

            // get the api key from the .env file
            const API_KEY = import.meta.env.VITE_EXCHANGE_API_KEY_PRIMARY
            
            // if the api key is not working then shows the error
            if (!API_KEY) {
                setError('API key is not configured. Please check your environment variables.')
                return
            }
            
            // fetch the response of the API key
            const apiUrl = import.meta.env.PROD 
                ? `https://imhotepexchangeratesapi.pythonanywhere.com/convert/latest_rates/${API_KEY}/${initialCurrency}/${targetCurrency}/${amount}`
                : `/api/convert/latest_rates/${API_KEY}/${initialCurrency}/${targetCurrency}/${amount}`;
            
            const response = await fetch(apiUrl);
            
            // if the response isn't working then throw and error
            if (!response.ok) {
                throw new Error(`API request failed with status: ${response.status}`)
            }
            
            // get the response and save it on the ResultObj
            const data = await response.json()
            setResultObj(data)

        } catch (err) {
            setError('Error fetching exchange rates. Please try again.')
        }
    }

    useEffect(() => {
        if (resultObj.data && resultSection.current) {
            setTimeout(() => {
                resultSection.current.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    }, [resultObj])

    // clear the results
    const clearResults = () => {
        setResultObj({})
        setError('')
    };

    return (
        <main className="app-main">
            <form className="currency-form" onSubmit={handleSubmit}>
                <div className="amount-section">
                    <input 
                        type="number" 
                        placeholder="Enter amount" 
                        name="amount" 
                        id="amount" 
                        className="amount-input"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        min="0"
                        step="0.01"
                    />
                </div>
                
                {error && <div className="error-message">{error}</div>}

                <div className="currency-sections">
                    <div className="currency-section">
                        <h3 className="section-title">From</h3>
                        <input 
                            type="text" 
                            placeholder="Search currency" 
                            id="initialCurrency" 
                            className="currency-search"
                            value={fromSearch}
                            onChange={(e) => setFromSearch(e.target.value)}
                        />
                        <select 
                            className="currency-select"
                            value={initialCurrency}
                            onChange={(e) => setInitialCurrency(e.target.value)}
                        >
                            {filteredFromCurrencies.map((currency) => (
                                <option key={currency} value={currency}>
                                    {currency}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="currency-section">
                        <h3 className="section-title">To</h3>
                        <input 
                            type="text" 
                            placeholder="Search currency" 
                            id="targetCurrency" 
                            className="currency-search"
                            value={toSearch}
                            onChange={(e) => setToSearch(e.target.value)}
                        />
                        <select
                            className="currency-select"
                            value={targetCurrency}
                            onChange={(e) => setTargetCurrency(e.target.value)}
                        >
                            {filteredToCurrencies.map((currency) => (
                                <option key={currency} value={currency}>
                                    {currency}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <button type="submit" className="convert-button">
                    Convert Currency
                </button>
            </form>
            <Result resultObj={resultObj} clearResults={clearResults} resultRef={resultSection} />
        </main>
    )
}
