import currencies from '../data/currencies.js';

export default function CurrencyForm() {
  return (
    <main className="app-main">
      <form className="currency-form">
        <div className="amount-section">
          <input 
            type="number" 
            placeholder="Enter amount" 
            name="amount" 
            id="amount" 
            className="amount-input"
          />
        </div>

        <div className="currency-sections">
          <div className="currency-section">
            <h3 className="section-title">From</h3>
            <input 
              type="text" 
              placeholder="Search currency" 
              id="initialCurrency" 
              className="currency-search"
            />
            <select className="currency-select">
              {currencies.map((currency) => (
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
            />
            <select className="currency-select">
              {currencies.map((currency) => (
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
    </main>
  )
}