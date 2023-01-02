import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, from, throwError } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class BitcoinService {
  // constructor(private http: HttpClient) {}

  public getRate() {
    return from(
      fetch('https://blockchain.info/tobtc?currency=USD&value=1').then(
        (response) => response.json()
      ).catch()
    );
  }
  public getAvgBlockSize() {
    return from(
      fetch(
        'https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true'
      ).then((response) => response.json())
    );
  }
  public getMarketPrice() {
    return from(
      fetch(
        'https://api.blockchain.info/charts/n-transactions?timespan=5months&format=json&cors=true'
      ).then((response) => response.json())
    );
  }
}
