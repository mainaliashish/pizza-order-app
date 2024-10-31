import React from "react";
import { useSelector } from "react-redux";

const UserName = () => {
  const userName = useSelector((state) => state.user.userName);
  if (!userName) return null;
  return <p className="my-1 hidden text-sm font-semibold md:block">{userName}</p>;
};

export default UserName;
