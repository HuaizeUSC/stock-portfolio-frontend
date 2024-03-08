import { useEffect, useState } from "react";
import Pagination from "../ui/Pagination";
import StockCard from "../ui/StockCard";
import { useParams } from "react-router";
import axios from "axios";
import { useAuth } from "../features/UserManage/useAuth";
import { store } from "../store";
import Spinner from "../ui/Spinner";
const BASEURL = "http://127.0.0.1:8000/market";

function Market() {
  const { pageId, itemNum } = useParams();

  const [data, setData] = useState([]);
  const { login, logout, closeMessage } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { id, accessToken, refreshToken, message, username } = store.getState();
  const [pageNum, setPagenum] = useState(10);
  const [price, setPrice] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BASEURL}/${pageId}/${itemNum}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setData(response.data.stocks);
        setPagenum(response.data.pageNum);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(); // Call the async function
  }, [pageId, itemNum, accessToken]);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 justify-between  h-screen" style={{ height: "calc(100vh - 9rem)" }}>
      <div>
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array.isArray(data) && data.map((stock) => <StockCard key={stock.symbol} currentStock={stock} />)}
        </ul>
      </div>
      <Pagination name={"market"} className="mb-12" totalPages={pageNum} currentPage={1} />
    </div>
  );
}

export default Market;
