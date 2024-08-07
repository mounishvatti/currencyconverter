import { useState } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import { MdSwapCalls } from "react-icons/md";
import { FaGithub } from "react-icons/fa";

const navigateToGithub = () => {
  window.open("https://github.com/mounishvatti/currencyconverter", "_blank");
}

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);

  const options = Object.keys(currencyInfo);

  const swap = () => {
    setTo(from);
    setFrom(to);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <>
      <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
          backgroundColor: "black",
        }}
      >
        <div className="w-full">
        <h1 className="text-4xl text-white font-bold text-center mb-8">Currency Converter 💸</h1>
          <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-black/30">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                convert();
              }}
            >
              <div className="w-full mb-1">
                <InputBox
                  label="From"
                  amount={amount}
                  currencyOptions={options}
                  onCurrencyChange={(currency) => setAmount(amount)}
                  selectCurrency={from}
                  onAmountChange={(amount) => setAmount(amount)}
                />
              </div>
              <div className="relative w-full h-0.5">
                <button
                  type="button"
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-gray-800 rounded-md bg-yellow-500 text-black px-2 py-0.5 hover:bg-yellow-400 text-2xl"
                  onClick={swap}
                >
                  <MdSwapCalls />
                </button>
              </div>
              <div className="w-full mt-1 mb-4">
                <InputBox
                  label="To"
                  amount={convertedAmount}
                  currencyOptions={options}
                  onCurrencyChange={(currency) => setTo(currency)}
                  selectCurrency={to}
                  amountDisable
                />
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-500 text-black px-4 py-3 rounded-lg font-semibold"
              >
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
            </form>
          </div>
          <div className="text-center mt-28">
            <button id="github-button" onClick={navigateToGithub} className="bg-yellow-500 text-black px-4 py-3 rounded-lg font-semibold">
              <span>View on Github</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
