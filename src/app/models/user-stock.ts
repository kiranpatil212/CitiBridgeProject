import { StockHistory } from "./stock-history";

export class UserStock {

	companySymbol : string ;
	companyName : string ;
	open : number ;
	close : number ;
	high : number ;
	low : number ;
	change : number ;
	peRatio : number ;
	marketCap : number ;
	volume : number ;
	returnOnEquity : number ;
	history : StockHistory[] ;

    constructor() {  }

}
