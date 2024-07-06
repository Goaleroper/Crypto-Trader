import { useEffect, useState } from "react";
import ScreenLayout from "./../components/screenLayout";
import Image from "next/image";
import { useThemeCtx } from "../context/ThemeContext";
import { useRouter } from "next/router";
import { Coin_Data } from "../Types/coinDataTypes";
export default function Home() {
  const [items, setItems] = useState<Coin_Data[]>([]);
  const router = useRouter();
  const themeCTx = useThemeCtx();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const items = JSON.parse(localStorage.getItem("tableData") || "[]");
      if (items) {
        setItems(items);
      }
    }
  }, []);
  const handleRoute = () => {
    router.push({ pathname: "/SearchCoins" });
  };

  return (
    <ScreenLayout>
      <div
        className={`${
          themeCTx?.darkTheme ? "bg-landing" : "bg-landingLG"
        } bg-cover bg-center h-screen flex flex-row-reverse`}
      >
        <div className="flex flex-col w-2/3 relative">
          <button
            onClick={themeCTx?.toggleTheme}
            className={`self-end !bg-transparent w-36 border border-slate-700 rounded-3xl m-3 p-3 text-slate-700 text-sm 
            text-center whitespace-nowrap ${themeCTx?.darkTheme ? "dark" : ""}`}
          >
            Change Theme
          </button>
          <ul className="flex absolute bottom-5 self-end mr-24 gap-28">
            {items.map((temp, index) => (
              <li
                key={index}
                className={`flex flex-row-reverse border border-gray-400 p-2
                text-slate-700 text-xs font-light rounded-md gap-2 !bg-transparent ${
                  themeCTx?.darkTheme ? "dark" : ""
                }`}
              >
                {`$ ${temp.current_price}`}
                <br />
                {`${temp.name} USD`}
                <Image
                  src={temp.image ?? ""}
                  alt="coin symbol"
                  width={30}
                  height={30}
                  loading="lazy"
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col w-1/3 justify-center pl-4 text-center">
          <p
            className={`text-slate-700 font-medium text-[45px] leading-[65px] !bg-transparent ${
              themeCTx?.darkTheme ? "dark" : ""
            }`}
          >
            Search &
            <br />
            Buy <span className="text-yellow-400  font-medium">Crypto</span>
          </p>
          <p
            className={`text-slate-700 font-light text-sm mt-8 !bg-transparent ${
              themeCTx?.darkTheme ? "dark" : ""
            }`}
          >
            Mohaymen ICT
            <br />
            Test Project
          </p>
          <button
            onClick={handleRoute}
            className="self-center bg-yellow-400 w-32 rounded-3xl mt-8 p-2 text-white text-sm text-center whitespace-nowrap"
          >
            Search More
          </button>
        </div>
      </div>
    </ScreenLayout>
  );
}
