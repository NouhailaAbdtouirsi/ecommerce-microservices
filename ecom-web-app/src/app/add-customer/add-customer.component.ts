import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-add-customer',
  standalone: false,

  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css'
})
export class AddCustomerComponent implements OnInit{
  @Input() customer: any = {}; // This is for input data
  @Output() closeModal = new EventEmitter<any>();

  message: string = ''; // Holds the success/error message
  messageType: string = ''; // Determines the background color (success/error)

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    // Fetch customer data from query parameters
    this.route.queryParams.subscribe((params) => {
      if (params['customer']) {
        this.customer = JSON.parse(params['customer']); // Parse the customer data
      }
    });
  }

  onSubmit() {
    // if the inputs are empty
    if (!this.customer.name || !this.customer.email || !this.customer.phone) {
      this.showMessage('Please fill in all fields.', 'error');
      return;
    }
    console.log(this.customer);
    if (this.customer.id) {
      // Edit customer
      this.http
        .put(`http://localhost:8888/COSTUMER-SERVICE/customers/${this.customer.id}`, this.customer)
        .subscribe({
          next: (data) => {
            console.log(data);
            this.showMessage('customer updated successfully!', 'success');
          },
          error: (err) => {
            console.log(err);
            this.showMessage('Error updating customer.', 'error');
          },
        });
    } else {
      // Add new customer
      this.http
        .post('http://localhost:8888/COSTUMER-SERVICE/customers', this.customer)
        .subscribe({
          next: (data) => {
            console.log(data);
            this.showMessage('customer added successfully!', 'success');
          },
          error: (err) => {
            console.log(err);
            this.showMessage('Error adding customer.', 'error');
          },
        });
    }
  }

  showMessage(message: string, type: string) {
    this.message = message;
    this.messageType = type;
    setTimeout(() => {
      this.message = ''; // Clear the message after a few seconds
    }, 3000);
  }
}
