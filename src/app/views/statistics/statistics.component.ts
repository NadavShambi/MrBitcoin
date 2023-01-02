import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ChartStyle } from 'src/app/models/chart-style.model';

import { BitcoinService } from 'src/app/services/bitcoin.service';

@Component({
  selector: 'statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  constructor(private bitcoinService: BitcoinService) {}

  avgBlockSize: object;
  marketPrice: object;

  style1 = new ChartStyle(
    '#2C74B35f',
    '#2C74B390',
    '#fff',
    '#144272',
    '#fff',
    '#144272f5'
  );
  style2 = new ChartStyle(
    '#8D72E15f',
    '#8D72E1',
    '#fff',
    '#8D9EFF',
    '#fff',
    '#8D9EFFf5'
  );

  async ngOnInit() {
    this.bitcoinService.getAvgBlockSize().subscribe({
      next: (res: object) => {
        this.avgBlockSize = res;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
    this.bitcoinService.getMarketPrice().subscribe({
      next: (response: object) => {
        this.marketPrice = response;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }
}
