import axios from "axios";
import { useEffect, useState } from "react";
import ScreenLayout from "../components/screenLayout";
import { useThemeCtx } from "../context/ThemeContext";
import { useRouter } from "next/router";
import { Coin_Detail_Data } from "../Types/coinDataTypes";
import Image from "next/image";

const CoinDetailPage = () => {
  const themeCTx = useThemeCtx();
  const [coinDetail, setCoinDetail] = useState<Coin_Detail_Data>();
  const router = useRouter();
  useEffect(() => {
    if (router.query.coinId) {
      const fetchData = async () => {
        try {
          let res = await await axios.get(
            `https://api.coingecko.com/api/v3/coins/${router.query.coinId}`
          );
          setCoinDetail(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [router.query]);
  return (
    <ScreenLayout>
      <div
        className={`flex flex-col items-center w-full bg-slate-200 min-h-screen
         ${themeCTx?.darkTheme ? "dark" : ""}`}
      >
        <div className="w-full flex justify-end py-4 shadow-[inset_0_-2px_6px_rgba(0,0,0,0.7)] mb-4">
          <button
            onClick={themeCTx?.toggleTheme}
            className={`!text-yellow-700 px-6 text-sm opacity-50 ${
              themeCTx?.darkTheme ? "dark !text-yellow-500" : ""
            }`}
          >
            Change Theme
          </button>
        </div>
        <div className="flex flex-col px-6 items-center gap-6">
          <Image
            src={coinDetail?.image?.large ?? ""}
            alt="coin symbol"
            width={100}
            height={100}
            loading="lazy"
          />
          <p
            className={`font-bold text-3xl ${
              themeCTx?.darkTheme ? "dark" : ""
            }`}
          >
            {coinDetail?.name}
          </p>
          <p>{coinDetail?.description?.en}</p>
          <ul className="flex gap-10 mb-6">
            <li className="bg-slate-300 p-3 rounded-lg text-slate-900 font-semibold">Rank: {coinDetail?.market_cap_rank}</li>
            <li className="bg-slate-300 p-3 rounded-lg text-slate-900 font-semibold">Price: {coinDetail?.market_data?.current_price?.usd}</li>
            <li className="bg-slate-300 p-3 rounded-lg text-slate-900 font-semibold"> Market Cap: {coinDetail?.market_data?.market_cap?.usd}</li>
          </ul>
        </div>
      </div>
    </ScreenLayout>
  );
};
export default CoinDetailPage;
