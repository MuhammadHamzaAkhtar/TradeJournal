import React, { useState } from 'react';
import './Home.css';
import { BaseUrl } from '../Assets/Data';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    openedAt: '',
    closedAt: '',
    currencyPair: '',
    direction: 'Long',
    lotSize: '',
    entryPrice: '',
    exitPrice: '',
    stopLoss: '',
    takeProfit: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (let key in form) {
      if (!form[key]) {
        alert(`Please fill out the "${key}" field.`);
        return;
      }
    }
    try {
      setLoading(true);
      const response = await fetch(`${BaseUrl}/trades`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Trade saved successfully!');
        console.log('Saved trade:', data.trade);
      } else {
        alert(`Failed to save trade: ${data.message}`);
      }

      setForm({
        openedAt: '',
        closedAt: '',
        currencyPair: '',
        direction: 'Long',
        lotSize: '',
        entryPrice: '',
        exitPrice: '',
        stopLoss: '',
        takeProfit: '',
      });
    } catch (err) {
      console.error(err);
      alert('Error saving trade');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? <LoadingSpinner /> : <div className="form-container">
        <h2 className="form-title">📈 Trade Entry Form</h2>
        <form onSubmit={handleSubmit} className="trade-form">
          <label>
            Opened At
            <input type="datetime-local" name="openedAt" value={form.openedAt} onChange={handleChange} />
          </label>

          <label>
            Closed At
            <input type="datetime-local" name="closedAt" value={form.closedAt} onChange={handleChange} />
          </label>

          <label>
            Currency Pair
            <input type="text" name="currencyPair" value={form.currencyPair} onChange={handleChange} />
          </label>

          <label>
            Direction
            <select name="direction" value={form.direction} onChange={handleChange}>
              <option value="Long">Long (Buy)</option>
              <option value="Short">Short (Sell)</option>
            </select>
          </label>

          <label>
            Lot Size
            <input type="number" name="lotSize" value={form.lotSize} onChange={handleChange} />
          </label>

          <label>
            Entry Price
            <input type="number" name="entryPrice" value={form.entryPrice} onChange={handleChange} />
          </label>

          <label>
            Exit Price
            <input type="number" name="exitPrice" value={form.exitPrice} onChange={handleChange} />
          </label>

          <label>
            Stop Loss
            <input type="number" name="stopLoss" value={form.stopLoss} onChange={handleChange} />
          </label>

          <label>
            Take Profit
            <input type="number" name="takeProfit" value={form.takeProfit} onChange={handleChange} />
          </label>

          <button type="submit" className="submit-btn">Save Trade</button>
        </form>
      </div>}
    </>
  );
};

export default Home;
