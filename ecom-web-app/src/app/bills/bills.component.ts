import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-bills',
  standalone: false,

  templateUrl: './bills.component.html',
  styleUrl: './bills.component.css'
})
export class BillsComponent implements OnInit {
  bills: any;
  customerId: string = '';
  currentPage: number = 0;
  pageSize: number = 3;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.customerId = this.router.url.split('/')[2];
    this.loadBills();
  }

  loadBills(): void {
    this.http
      .get(`http://localhost:8888/BILLING-SERVICE/fullBill/${this.customerId}`)
      .subscribe({
        next: (data) => {
          this.bills = data;
        },
        error: (error) => {
          console.error('Error loading bills:', error);
        },
      });
  }

  calculateTotalAmount(): number {
    return this.bills.productItems.reduce(
      (sum: number, item: any) =>
        sum + item.price * item.quantity * (1 - item.discount),
      0
    );
  }

  changePage(step: number): void {
    const totalPages = Math.ceil(this.bills.productItems.length / this.pageSize);
    this.currentPage = Math.max(0, Math.min(this.currentPage + step, totalPages - 1));
  }
}
