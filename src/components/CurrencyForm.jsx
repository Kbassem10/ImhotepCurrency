import currencies from '../data/currencies.js';

export default function CurrencyForm() {
  return (
    <form>
      <input type="number" placeholder="Amount" />
      <select>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <select>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <button type="submit">Convert</button>
    </form>
  );
}
