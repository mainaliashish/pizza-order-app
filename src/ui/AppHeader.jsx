import React from "react";
import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/user/userName";

const AppHeader = () => {
  return (
    <header className="flex items-center justify-between border-b-8 border-stone-500 bg-yellow-400 px-4 py-3 uppercase sm:px-6">
      <Link to="/" className="tracking-[5px]">
        Fast React Pizza Co.
      </Link>
      <span>
        <SearchOrder />
        <UserName />
      </span>
    </header>
  );
};

export default AppHeader;
