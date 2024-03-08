import { useNavigate, useParams } from "react-router";
import ListItem from "../ui/ListItem";

import TradePagination from "../ui/TradePagination";
import { useEffect, useState } from "react";
import { useAuth } from "../features/UserManage/useAuth";
import { store } from "../store";
import axios from "axios";
import Pagination from "../ui/Pagination";

const trade = {
  symbol: "AKAM",
  quantity: 2313,
  price: 125.57,
  timestamp: 1707282000000,
};

const trade1 = {
  symbol: "META",
  quantity: -200,
  price: 12.57,
  timestamp: 1707280000000,
};

const BASEURL = "http://127.0.0.1:8000";

function Trade() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { login, logout, closeMessage, setMessage } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { pageId, itemNum } = useParams();
  const [pageNum, setPagenum] = useState(10);
  const [fund, setFund] = useState(50000);
  const { id, accessToken, refreshToken, message, username } = store.getState();
  const fetchData = async () => {
    setIsLoading(true);
    closeMessage();
    try {
      const response = await axios.get(`${BASEURL}/trades/${pageId}/${itemNum}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
      setPagenum(response.data.pageNum);
      setData(response.data.trades);
      setFund(parseFloat(response.data.funds.balance));
    } catch (error) {
      setMessage(JSON.stringify(error.response.data));
    } finally {
      setIsLoading(false);
    }
  };
  const total =
    data.reduce((acc, item) => {
      const price = parseFloat(item.price);
      const quantity = item.quantity;
      return acc + price * quantity;
    }, 0) + fund;
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex flex-col justify-between  h-screen" style={{ height: "calc(100vh - 9rem)" }}>
      <div className="flex flex-col">
        <div className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
          <div className="flex justify-between items-center px-8 py-5">
            <h1 className="text-md text-black font-semibold ">Balance of your fund: </h1>
            <h1 className={`text-md font-semibold text-2xl text-yellow-600`}>{fund} $</h1>
          </div>
          <div className="flex justify-between items-center px-8 py-5">
            <h1 className="text-md text-black font-semibold ">Total Fund: </h1>
            <h1 className={`text-md font-semibold text-2xl ${total >= 50000 ? "text-red-600" : "text-green-600"}`}>{total} $</h1>
          </div>
        </div>
        <div>
          <ul role="list" className="divide-y divide-gray-100">
            {data.map((trade, index) => (
              <ListItem key={index} trade={trade} />
            ))}
          </ul>
        </div>
      </div>
      <Pagination name={"trade"} className="mb-12" totalPages={pageNum} currentPage={1} />
    </div>
  );
}

export default Trade;
