import { UserStock } from './user-stock';

describe('UserStock', () => {
  it('should create an instance', () => {
      var temp = new UserStock() ;
    expect(temp.companySymbol).toBeUndefined();
    expect(temp.companyName).toBeUndefined();
    expect(temp.open).toBeUndefined();
    expect(temp.close).toBeUndefined();
    expect(temp.high).toBeUndefined();
    expect(temp.low).toBeUndefined();
    expect(temp.change).toBeUndefined();
    expect(temp.peRatio).toBeUndefined();
    expect(temp.marketCap).toBeUndefined();
    expect(temp.volume).toBeUndefined();
    expect(temp.returnOnEquity).toBeUndefined();
    expect(temp.history).toBeUndefined();
  });
});
