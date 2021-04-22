import {Component, OnInit} from '@angular/core';
import { RegistrationService } from 'src/app/registration.service';
import { Product } from 'src/app/product';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.scss']
})
export class UserHistoryComponent implements OnInit {

  products: Product[];

    cols: any[];
    // userHistory: UserHistory[];

    constructor(private service: RegistrationService) { }

    ngOnInit() {
      // this.userHistory.push({ });
      
        this.service.getProductsSmall().then(data => this.products = data);

        this.cols = [
            { field: 'code', header: 'Code', width: '20%' },
            { field: 'name', header: 'Name', width: '20%' },
            { field: 'category', header: 'Category', width: '20%' },
            { field: 'quantity', header: 'Quantity', width: '20%' }
        ];
    }

}
