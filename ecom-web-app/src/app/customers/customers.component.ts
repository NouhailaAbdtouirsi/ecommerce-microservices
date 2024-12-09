import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-customers',
  standalone: false,

  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {
  customers: any;
  itemsPerPage = 4;
  currentPage = 1;
  constructor(
    private router: Router,
    private http: HttpClient
  ) { }
  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers() {
    this.http
      .get(`http://localhost:8888/COSTUMER-SERVICE/customers`)
      .subscribe({
        next: (data: any) => {

          this.customers = data;
          console.log('Customers:', this.customers);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  get paginatedCustomers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.customers?._embedded.customers.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.customers._embedded.customers.length / this.itemsPerPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  goToAddCustomer(customer?: any) {
    if (customer) {
      this.router.navigate(['add-customer'], {
        queryParams: { customer: JSON.stringify(customer) },
      });
    } else {
      this.router.navigate(['/add-customer']);
    }
  }

  deleteCustomer(id: any) {
    this.http.delete(`http://localhost:8888/COSTUMER-SERVICE/customers/${id}`).subscribe({
      next: (data) => {
        console.log('Customer deleted:', data);
        this.customers = this.customers._embedded.customers.filter((customer: { id: any; }) => customer.id !== id);
        //refresh the page
        this.ngOnInit();
      },
      error: (err) => {
        console.log('Error deleting customer:', err);
      }
    });

  }
  viewBills(customerId: number) {
    this.router.navigate([`/customers/${customerId}/bills`]);
  }
}
