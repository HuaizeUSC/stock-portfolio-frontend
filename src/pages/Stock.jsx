import { ArrowUpIcon, LinkIcon } from "@heroicons/react/24/outline";
import formatTimestamp, { formatTimestampDay } from "../utils/utils";
import { Navigate, useNavigate, useParams } from "react-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { store } from "../store";
import axios from "axios";
import Spinner from "../ui/Spinner";
import { useAuth } from "../features/UserManage/useAuth";
import Chart from "../ui/Chart";
import { ErrorMessage, SuccessMessage } from "../ui/Message";

const BASEURL = "http://127.0.0.1:8000";

function Stock() {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const { login, logout, closeMessage, setMessage } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { id, accessToken, refreshToken, message, username, messagetype } = store.getState();
  const [price, setPrice] = useState([]);
  const [showMessage, setShowMessage] = useState(true);
  const fetchData = async () => {
    setIsLoading(true);
    closeMessage();
    try {
      const response = await axios.get(`${BASEURL}/market/${symbol}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setPrice(response.data.stockPrice);
      setData(response.data.stock);
    } catch (error) {
      setMessage(JSON.stringify(error.response.data));
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData(); // Call the async function
    setShowMessage(true);
  }, [symbol, accessToken]);
  const handleFavor = async () => {
    setIsLoading(true);
    closeMessage();
    try {
      const response = await axios.get(`${BASEURL}/market/favor/${symbol}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      fetchData();
    } catch (error) {
      setMessage(JSON.stringify(error.response.data));
    } finally {
      setIsLoading(false);
    }
  };
  const handleDeFavor = async () => {
    setIsLoading(true);
    closeMessage();
    try {
      const response = await axios.get(`${BASEURL}/deleteFavor/${symbol}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      fetchData();
    } catch (error) {
      setMessage(JSON.stringify(error.response.data));
    } finally {
      setIsLoading(false);
    }
  };
  const handleBuy = async (e) => {
    const amountInput = document.getElementById("amountinput");
    const amount = amountInput.value;
    if (!amount) return;
    setIsLoading(true);
    closeMessage();
    try {
      const response = await axios.post(
        `${BASEURL}/market/buy/${symbol}/`,
        {
          quantity: parseInt(amount),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setMessage(response.data.message, 1);
    } catch (error) {
      setMessage(JSON.stringify(error.response.data));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSell = async (e) => {
    const amountInput = document.getElementById("amountinput");
    const amount = amountInput.value;
    if (!amount) return;
    setIsLoading(true);
    closeMessage();
    try {
      const response = await axios.post(
        `${BASEURL}/market/sell/${symbol}/`,
        {
          quantity: parseInt(amount),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // fetchData();
      console.log(response.data);
      setMessage(response.data.message, 1);
    } catch (error) {
      setMessage(JSON.stringify(error.response.data));
    } finally {
      setIsLoading(false);
    }
  };
  const handleDismiss = () => {
    closeMessage();
    setShowMessage(false);
  };
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-6">
      {showMessage && message && messagetype == 0 && <ErrorMessage message={message} handleDismiss={handleDismiss} />}
      {showMessage && message && messagetype == 1 && <SuccessMessage message={message} handleDismiss={handleDismiss} />}
      <div className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
        <div className="flex flex-col gap-8 p-8">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <div className="w-32 h-32 bg-gray-300 rounded-full flexitems-center justify-center">
                <img src={data.iconurl ? (data.iconurl.endsWith("Lo") ? data.iconurl : data.iconurl + "?apiKey=7sDFU1hnKlUhRDSY7kKTmE4hMwrfpyLo") : ""} className="rounded-full w-full h-full" />
              </div>
              <div className="flex flex-col ml-4 gap-1 justify-center">
                <p className="font-semibold text-xl">{`${data.symbol}  -  ${data.location}`}</p>
                <p className="font-norm text-lg">{data.name}</p>
                <div className="flex hover:text-yellow-600">
                  <LinkIcon className="w-4 mr-2" />
                  <a href={data.homepage} className="text-lg">
                    Link
                  </a>
                </div>
                {data.favor ? (
                  <span
                    onClick={handleDeFavor}
                    className={`inline-flex flex-shrink-0 w-[11.2rem] items-center rounded-full px-3 py-1 text-sm font-medium ring-1 ring-inset text-yellow-700 ring-yellow-500/20 bg-yellow-50 
    hover:bg-yellow-100 hover:text-yellow-800 hover:ring-yellow-500 hover:ring-opacity-40`}
                  >
                    Remove from Favorite
                  </span>
                ) : (
                  <span
                    onClick={handleFavor}
                    className={`inline-flex flex-shrink-0 w-[8.5rem] items-center rounded-full px-3 py-1 text-sm font-medium ring-1 ring-inset text-yellow-700 ring-yellow-500/20 bg-yellow-50 
    hover:bg-yellow-100 hover:text-yellow-800 hover:ring-yellow-500 hover:ring-opacity-40`}
                  >
                    Add to Favorite
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end justify-center gap-1">
              <p className="font-semibold text-sm">{formatTimestampDay(data.latestupdatetime)}:</p>
              <span className={`inline-flex flex-shrink-0 items-center rounded-full  px-3 py-1 text-sm font-medium ring-1 ring-inset ${data.latestcloseprice > data.latestopenprice ? "bg-red-50 text-red-700  ring-red-600/20" : "text-green-700 bg-green-50 ring-green-600/20"}`}>
                {(((data.latestcloseprice - data.latestopenprice) / data.latestcloseprice) * 100).toFixed(2)}%
              </span>
              <p className="font-semibold text-sm mt-2">Type:</p>
              <span
                className={`inline-flex flex-shrink-0 items-center rounded-full  px-3 py-1 text-sm font-medium ring-1 ring-inset  text-blue-700 bg-blue-50 ring-blue-600/20"
                `}
              >
                {data.companytype}
              </span>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-md text-black font-semibold px-8 py-5">Description:</h1>
          <div className="text-md text-gray-500 px-8 pb-8">{data.description}</div>
        </div>
        <div className="grid grid-cols-4 divide-x divide-gray-200">
          <div className="border-t border-white/5 py-6 px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-medium leading-6 text-gray-700">Open Price</p>
            <p className="mt-2 flex items-baseline gap-x-2">
              <span className="text-4xl text-yellow-600 font-semibold tracking-tight">{data.latestopenprice}</span>
              <span className="text-sm text-gray-600">$</span>
            </p>
          </div>
          <div className="border-t border-white/5 py-6 px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-medium leading-6 text-gray-700">Close Price</p>
            <p className="mt-2 flex items-baseline gap-x-2">
              <span className="text-4xl text-purple-600 font-semibold tracking-tight">{data.latestcloseprice}</span>
              <span className="text-sm text-gray-600">$</span>
            </p>
          </div>
          <div className="border-t border-white/5 py-6 px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-medium leading-6 text-gray-700">Highest Price</p>
            <p className="mt-2 flex items-baseline gap-x-2">
              <span className="text-4xl text-red-600 font-semibold tracking-tight">{data.latesthighprice}</span>
              <span className="text-sm text-gray-600">$</span>
            </p>
          </div>
          <div className="border-t border-white/5 py-6 px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-medium leading-6 text-gray-700">Lowest Price</p>
            <p className="mt-2 flex items-baseline gap-x-2">
              <span className="text-4xl text-green-600 font-semibold tracking-tight">{data.latestlowprice}</span>
              <span className="text-sm text-gray-600">$</span>
            </p>
          </div>
        </div>
      </div>
      <div className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
        <div className="flex flex-col">
          <h1 className="text-md text-black font-semibold px-8 py-5">Price:</h1>
          {data && <Chart data={price} />}
        </div>
      </div>
      <div className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
        <div className="flex justify-between items-center px-8 py-5">
          <h1 className="text-md text-black font-semibold ">Make a trade: </h1>
          <div className="flex items-center gap-4">
            <input type="number" id="amountinput" min="1" className="px-2 py-1 rounded-md border-gray-300" placeholder="Enter amount" />
            <div className="flex items-center gap-2">
              <button type="submit" onClick={handleBuy} className="px-4 py-2 font-semibold bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-3xl border-2 border-pink-200">
                Buy
              </button>
              <button type="submit" onClick={handleSell} className="px-4 py-2 font-semibold bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-3xl border-2 border-indigo-200">
                Sell
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stock;
