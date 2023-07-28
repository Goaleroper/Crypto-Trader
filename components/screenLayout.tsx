import { FC, ReactElement } from "react";
import { useThemeCtx } from "../context/ThemeContext";
type ScreenLayoutT = {
  children: ReactElement[] | ReactElement;
};
const ScreenLayout: FC<ScreenLayoutT> = ({ children }) => {
  const themeCTx = useThemeCtx();
  return <main className={`min-h-screen w-full flex flex-col bg-slate-200 ${themeCTx?.darkTheme ? "dark" : ""}`}>{children}</main>;
};

export default ScreenLayout;
