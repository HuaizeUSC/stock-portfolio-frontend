import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import formatTimestamp, { formatTimestampDay } from "../utils/utils";

const statuses = {
  Buy: "text-green-700 bg-green-50 ring-green-600/20",
  Sell: "text-yellow-800 bg-yellow-50 ring-yellow-600/20",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ListItem({ trade }) {
  return (
    <li key={trade.stockinfo} className="flex items-center justify-between gap-x-6 py-5">
      <div className="min-w-0">
        <div className="flex items-center gap-x-3">
          <p className="text-lg font-semibold leading-6 text-gray-900">{trade.stockinfo}</p>
          <p className={classNames(trade.quantity < 0 ? statuses.Buy : statuses.Sell, "rounded-3xl whitespace-nowrap mt-0.5 px-3.5 py-0.5 text-md font-medium ring-1 ring-inset")}>Position: {Math.abs(trade.quantity)}</p>
        </div>
        {/* <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
          <p className="whitespace-nowrap">
            <time>{formatTimestamp(trade.timestamp)}</time>
          </p>
        </div> */}
      </div>
      <div className="flex flex-none items-center gap-x-4">
        <div className={"text-pink-700 rounded-3xl whitespace-nowrap  px-5 py-1 font-medium flex flex-col items-end"}>
          <div className="text-xs text-black">Total Price:</div>
          <div className="">{(trade.price * trade.quantity).toFixed(2)} $</div>
        </div>

        <div className={"text-indigo-700 rounded-3xl whitespace-nowrap  px-5 py-1 text-md font-medium flex flex-col items-end"}>
          <div className="text-xs text-black">Current Price:</div>
          <div className="">{trade.price} $</div>
        </div>
        <a href={`/stock/${trade.stockinfo}`} className="hidden rounded-3xl bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-yellow-700 sm:block">
          View Stock
        </a>
        <Menu as="div" className="relative flex-none">
          <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
            <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
          </Menu.Button>
          <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
            <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <a href="#" className={classNames(active ? "bg-gray-50  text-yellow-600" : "", "block px-3 py-1 text-sm leading-6 text-gray-900")}>
                    Delete
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </li>
  );
}

export default ListItem;
