export type Maybe<T> = T | null;
export type Coin_Data = {
  id?: Maybe<string>;
  symbol?: Maybe<string>;
  image?: Maybe<string>;
  name?: Maybe<string>;
  price_change_percentage_24h?: Maybe<number>;
  current_price?: Maybe<number>;
  market_cap?: Maybe<number>;
};

export type Coin_Detail_Data = {
  image?: Maybe<Coin_Image>;
  description?: Maybe<Description_La>;
  name?: Maybe<string>;
  market_cap_rank?:Maybe<number>;
  market_data?:Maybe<Market_Data_Type>;
  // current_price?:Maybe<Market_Price_Type>;
};

export type Coin_Image = {
  large?: Maybe<string>;
  small?: Maybe<string>;
  thumb?: Maybe<string>;
};

export type Description_La = {
  en?: Maybe<string>;
};

export type Market_Data_Type = {
  current_price?: Maybe<Market_Price_Type>;
  market_cap?:Maybe<Market_Price_Type>;
};

export type Market_Price_Type = {
  usd?: Maybe<number>;
};