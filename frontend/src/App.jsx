  import axios from 'axios';
  import { useEffect, useState } from 'react'

  function App() {
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
      fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
      try {
        const response = await axios.get('/api/transactions');

        setTransactions(response.data);
        setBalance(response.data[0].balance);
      } catch (error) {
        console.error(error);
      }
    };

    const handleTransaction = async (type) => {
      if (!amount || !date || !description) {
        alert('Please fill out all fields');
        return;
      }

      try {
        const response = await axios.post('/api/transaction', {
          type,
          amount: parseFloat(amount),
          date,
          description,
          balance
        });

        console.log(response.data);


        setBalance(response.data.balance);
        setTransactions([...transactions, response.data]);
        setAmount('');
        setDate('');
        setDescription('');
      } catch (error) {
        console.error(error);
      }
    };

    return (
      //<div className="flex items-center justify-center min-h-screen bg-[url('https://img.freepik.com/free-photo/top-view-bank-notes-with-rubber-band-copy-space_23-2148546855.jpg?t=st=1730271336~exp=1730274936~hmac=fc45566b04f8e50ad46026699f0484dff497dfd80255f2d248bc8fd36c0a060f&w=1380')] bg-cover bg-center">
      <div className="flex items-center justify-center min-h-screen bg-black">
          <div className="bg-transparent p-8 shadow-lg rounded-lg w-full max-w-md backdrop-blur-sm ">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">Current Balance: ₹{balance}</h1>


          <div className="space-y-4 mb-4">
            <input
              type="number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => handleTransaction('deposit')}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Deposit
            </button>
            <button
              onClick={() => handleTransaction('withdraw')}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Withdraw
            </button>
          </div>

          <h2 className="text-2xl font-bold text-center my-6">Transaction History</h2>
          <div className="max-h-64 overflow-y-scroll p-5">
            <ul className="space-y-4">
              {transactions.map((transaction) => (
                <li
                  key={transaction._id}
                  className={`flex justify-between p-4 border ${transaction.type === 'deposit' ? 'border-green-500 bg-green-200' : 'border-red-500 bg-red-200'
                    } rounded-md`}
                >
                  <span>{transaction.description}</span>
                  <span>₹{transaction.amount}</span>
                  <span>{transaction.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );  
  }

  export default App
