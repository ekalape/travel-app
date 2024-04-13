export type CountryInfoType = {
  commonName: string;
  offName: string;
  capital: string[];
  currencies: CurrenciesType;
  region: string;
  subregion: string;
  languages: {
    [code: string]: string
  };
  map: string;
  population: number;
  timezone: string[];
  flag: string;
}


export type CurrenciesType = {
  [code: string]: {
    name: string,
    symbol: string
  }
}
