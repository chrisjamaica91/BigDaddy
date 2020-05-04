import { Component, OnInit } from '@angular/core';
import { TrackingService } from '../tracking.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-tracking-table',
  templateUrl: './tracking-table.component.html',
  styleUrls: ['./tracking-table.component.scss']
})
export class TrackingTableComponent implements OnInit {
  trackingNumbers: any;
  shippingDetails = { Grnd: 5, PRIO: 3};
  defaultShipping = 4;

  constructor(private trackingService: TrackingService) {
    interval(3600000).subscribe(x => { // will execute every hour 3600000
      this.addTrackingData();
    });
   }

  ngOnInit() {
    this.addTrackingData();
  }

  addTrackingData() {
    this.trackingService.addTrackingData().subscribe(response => {
      this.getTrackingData();
    });
  }

  getTrackingData() {
    this.trackingService.getTrackingData().subscribe(response => {
      const date = new Date();
      const last3Days = date.setDate(date.getDate() - 3);
      const res = response.filter(tracking => Date.parse(tracking.timeStamp) >= last3Days);
      res.map(tracking => {
        const year = tracking.ship_date.substring(0, 4);
        const month = tracking.ship_date.substring(4, 6);
        const day = tracking.ship_date.substring(6, 8);
        const shipDate = new Date(year, month - 1, day);
        for (const key in this.shippingDetails) {
          if (key === tracking.shipping_method) {
            tracking.deliveryDate = this.addDays(shipDate, this.shippingDetails[key]);
            console.log('Date: ' + tracking.deliveryDate);
          }
        }
        if (!tracking.deliveryDate) {
          tracking.deliveryDate = this.addDays(shipDate, this.defaultShipping);
        }
        tracking.ship_date = shipDate;
      });
      res.sort((a, b) => {
        return new Date(a.timeStamp).getTime() - new Date(b.timeStamp).getTime();
      });
      this.trackingNumbers = res;
    });
  }

  addDays(date, days) {
    const copy = new Date(Number(date));
    copy.setDate(date.getDate() + days);
    return copy;
  }

}
