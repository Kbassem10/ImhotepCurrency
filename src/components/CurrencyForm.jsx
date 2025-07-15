import { useState, useEffect } from 'react';
import currencies from '../data/currencies.js';
import Result from './Result.jsx';

export default function CurrencyForm() {
    const [fromSearch, setFromSearch] = useState('')
    const [toSearch, setToSearch] = useState('')
    const [resultObj, setResultObj] = useState({})
    const [error, setError] = useState('')
    
    const [amount, setAmount] = useState(1)
    const [initialCurrency, setInitialCurrency] = useState("USD")
    const [targetCurrency, setTargetCurrency] = useState("EUR")

    const filteredFromCurrencies = currencies.filter(currency =>
        currency.toLowerCase().includes(fromSearch.toLowerCase())
    )
    
    const filteredToCurrencies = currencies.filter(currency =>
        currency.toLowerCase().includes(toSearch.toLowerCase())
    )

    // Update selected currency when search filters change and current selection is not in filtered list
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
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
            const API_KEY = import.meta.env.VITE_EXCHANGE_API_KEY_PRIMARY
            
            if (!API_KEY) {
                setError('API key is not configured. Please check your environment variables.')
                return
            }
            
            const response = await fetch(
                `/api/convert/latest_rates/${API_KEY}/${initialCurrency}/${targetCurrency}/${amount}`
            );
            
            if (!response.ok) {
                throw new Error(`API request failed with status: ${response.status}`)
            }
            
            const data = await response.json()
            setResultObj(data)
        } catch (err) {
            setError('Error fetching exchange rates. Please try again.')
        }
    }

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
            <Result resultObj={resultObj} clearResults={clearResults} />
        </main>
    )
}
