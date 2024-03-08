import { ChartBarIcon, LinkIcon, StarIcon } from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function StockCard({ currentStock }) {
  currentStock.latestcloseprice = parseFloat(currentStock.latestcloseprice);
  currentStock.latesthighprice = parseFloat(currentStock.latesthighprice);
  currentStock.latestlowprice = parseFloat(currentStock.latestlowprice);
  currentStock.latestopenprice = parseFloat(currentStock.latestopenprice);
  if (!currentStock.iconurl.endsWith("Lo")) currentStock.iconurl = currentStock.iconurl + "?apiKey=7sDFU1hnKlUhRDSY7kKTmE4hMwrfpyLo";

  return (
    <li key={currentStock.symbol} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
      <div className="flex w-full items-center justify-between space-x-2 p-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="truncate text-sm font-medium text-gray-900">{currentStock.symbol}</h3>
            <span className={`inline-flex flex-shrink-0 items-center rounded-full  px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset ${currentStock.latestcloseprice > currentStock.latestopenprice ? "bg-red-50 text-red-700  ring-red-600/20" : "text-green-700 bg-green-50 ring-green-600/20"}`}>
              {(((currentStock.latestcloseprice - currentStock.latestopenprice) / currentStock.latestcloseprice) * 100).toFixed(2)}%
            </span>
          </div>
          <p className="mt-1 truncate text-sm text-gray-500">{currentStock.name}</p>
        </div>
        <h1 className={currentStock.latestcloseprice > currentStock.latestopenprice ? "text-red-400 font-semibold text-2xl" : "text-green-400 font-semibold text-2xl"}>{currentStock.latestcloseprice} $</h1>
        <img className="h-12 w-12 flex-shrink-0 rounded-full bg-gray-300" src={currentStock.iconurl} alt="" />
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            <a href={currentStock.homepage} className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
              <LinkIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              Homepage
            </a>
          </div>
          <div className="-ml-px flex w-0 flex-1">
            <a href={`/stock/${currentStock.symbol}`} className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
              <ChartBarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              Details
            </a>
          </div>
        </div>
      </div>
    </li>
  );
}
