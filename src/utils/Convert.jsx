import { useState, useEffect } from "react"

export default function Convert() {
    const [amount, setAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_KEY = import.meta.env.VITE_EXCHANGE_API_KEY_PRIMARY;

    const convertCurrency = async () => {
        if (!amount || amount <= 0) {
            setError('Please enter a valid amount');
            return;
        }

        if (!API_KEY) {
            setError('API key not configured');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {

            const response = await fetch(
                `https://imhotepexchangeratesapi.pythonanywhere.com/convert/latest_rates/${API_KEY}/${fromCurrency}/${toCurrency}/${amount}`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.data && data.data.converted_amount) {
                setResult(parseFloat(amount));
            } else {
                setError('Invalid response from API');
            }
        } catch (err) {
            setError(`Failed to convert currency: ${err.message}`);
            console.error('Conversion error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        amount,
        setAmount,
        fromCurrency,
        setFromCurrency,
        toCurrency,
        setToCurrency,
        result,
        isLoading,
        error,
        convertCurrency,
        clearResult: () => setResult(null)
    };
}