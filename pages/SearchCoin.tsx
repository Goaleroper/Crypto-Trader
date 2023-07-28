import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import ScreenLayout from "../components/screenLayout";
import { useThemeCtx } from "../context/ThemeContext";
import { Coin_Data, Maybe } from "../Types/coinDataTypes";
import Image from "next/image";
import { useRouter } from "next/router";
import BeatLoader from "react-spinners/BeatLoader";
import { FaTrash } from "react-icons/fa";
import React from 'react';

const SearchCoin = () => {
  const [selectedCoin, setSelectedCoin] = useState<string>("");
  const [tableData, setTableDate] = useState<Coin_Data[]>([]);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const columns = ["coin", "price", "24hChange", "Market Cap", "Delete"];
  const themeCTx = useThemeCtx();
  const router = useRouter();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("tableData") || "[]");
    setTableDate(items);
  }, []);

  const savedData = useMemo(() => {
    let len = tableData.length;
    let temp = [];
    if (len > 0) {
      for (let i = len - 3; i < len; i++) {
        if (tableData[i]) temp.push(tableData[i]);
      }
      if (typeof window !== "undefined")
        localStorage.setItem("tableData", JSON.stringify(temp));
    }
  }, [tableData]);

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");
    setSelectedCoin(e.target.value);
  };

  const submitSerach = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setErrorMessage("");
      let temp = tableData.find((item) => item.id === selectedCoin);
      if (temp) setErrorMessage("Repetitive Record");
      else {
        setShowLoader(true);
        try {
          const res = await axios.get(
            "https://api.coingecko.com/api/v3/coins/markets",
            { params: { vs_currency: "usd", ids: selectedCoin } }
          );
          let temp = [...tableData];
          temp.push(res.data[0]);
          setTableDate(temp);
          setSelectedCoin("");
        } catch (e) {
          setErrorMessage("Something Went Wrong!");
        }
        setShowLoader(false);
      }
    }
  };
  const handleDeleteRow = (id: Maybe<string> | undefined) => {
    let temp = [...tableData];
    let index = temp.findIndex((item) => item.id === id);
    temp.splice(index, 1);
    setTableDate(temp);
  };
  const handleRoute = (id: Maybe<string> | undefined) => {
    router.push({ pathname: "/CoinDetailPage", query: { coinId: id } });
  };
  return (
    <ScreenLayout>
      <div
        className={`flex flex-col w-full justify-center bg-slate-200 ${
          themeCTx?.darkTheme ? "dark" : ""
        }`}
      >
        <button
          onClick={themeCTx?.toggleTheme}
          className={`!text-yellow-700 px-8 py-2 text-sm opacity-50 my-auto self-end
          ${themeCTx?.darkTheme ? "dark !text-yellow-500" : ""}`}
        >
          Change Theme
        </button>
      </div>
      <div className="bg-banner bg-cover bg-no-repeat bg-center h-[450px]">
        <p className="text-white font-bold text-2xl text-center mt-6">
          Search Coin
          <br />
          <span className="text-sm font-medium opacity-70">
            Get Information From Here
          </span>
        </p>
      </div>
      <div
        className={`flex flex-col w-full items-center px-28 ${
          themeCTx?.darkTheme ? "dark" : ""
        }`}
      >
        <p
          className={`text-slate-800 font-regu text-lg ${
            themeCTx?.darkTheme ? "dark" : ""
          }`}
        >
          Cryptocurrency Prices by Market Cap
        </p>
        <input
          value={selectedCoin}
          placeholder="Type coin name & press enter"
          onChange={handleChangeSearch}
          onKeyDown={submitSerach}
          className={`w-full px-2 py-1 my-4 bg-transparent border border-gray-400 rounded-sm text-slate-700
            text-sm font-light ${themeCTx?.darkTheme ? "dark" : ""}`}
        />
        <span className={showLoader ? "block" : "hidden"}>
          <BeatLoader
            color={themeCTx?.darkTheme ? "white" : "black"}
            margin={5}
          />
        </span>
        <span className="text-red-600 text-sm mb-2">{errorMessage}</span>
        <table
          className={`table-auto w-full text-slate-800 mb-28 ${
            themeCTx?.darkTheme ? "dark" : ""
          }`}
        >
          <thead className="bg-yellow-500">
            <tr>
              {columns.map((items, index) => (
                <th
                  key={index}
                  className={`py-1 px-2 ${
                    index === 0 ? "text-start" : "text-center"
                  }`}
                >
                  {items}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 ? (
              tableData.map((item, index) => (
                <tr
                  key={index}
                  className={`text-xs text-center font-light border-b border-b-slate-700 last:border-b-0 ${
                    themeCTx?.darkTheme ? "dark" : ""
                  }`}
                >
                  <td
                    className="flex flex-row-reverse gap-1 py-2 justify-end cursor-pointer"
                    onClick={() => handleRoute(item.id)}
                  >
                    {item.symbol?.toUpperCase()}
                    <br />
                    {item.name}
                    <Image
                      src={item.image ?? ""}
                      alt="coin symbol"
                      width={30}
                      height={30}
                      loading="lazy"
                    />
                  </td>
                  <td>{item.current_price}</td>
                  <td
                    className={
                      item.price_change_percentage_24h &&
                      item.price_change_percentage_24h > 0
                        ? "text-[#8fce7c]"
                        : "text-red-400"
                    }
                  >
                    {`${item.price_change_percentage_24h}%`}
                  </td>
                  <td>{`$ ${item.market_cap}`}</td>
                  <td
                    onClick={() => handleDeleteRow(item.id)}
                    className="cursor-pointer "
                  >
                    <FaTrash className="mx-auto" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="pt-4 font-bold text-lg">No coin is selected</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </ScreenLayout>
  );
};
export default SearchCoin;
