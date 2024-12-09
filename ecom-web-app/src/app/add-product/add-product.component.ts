import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  imports: [
    FormsModule,
    NgClass,
    NgIf
  ],
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  @Input() product: any = {}; // This is for input data
  @Output() closeModal = new EventEmitter<any>();

  message: string = ''; // Holds the success/error message
  messageType: string = ''; // Determines the background color (success/error)

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    // Fetch product data from query parameters
    this.route.queryParams.subscribe((params) => {
      if (params['product']) {
        this.product = JSON.parse(params['product']); // Parse the product data
      }
    });
  }

  onSubmit() {
    // if the inputs are empty
    if (!this.product.name || !this.product.price || !this.product.quantity) {
      this.showMessage('Please fill in all fields.', 'error');
      return;
    }
    console.log(this.product);
    if (this.product.id) {
      // Edit product
      this.http
        .put(`http://localhost:8888/INVENTORY-SERVICE/products/${this.product.id}`, this.product)
        .subscribe({
          next: (data) => {
            console.log(data);
            this.showMessage('Product updated successfully!', 'success');
          },
          error: (err) => {
            console.log(err);
            this.showMessage('Error updating product.', 'error');
          },
        });
    } else {
      // Add new product
      this.http
        .post('http://localhost:8888/INVENTORY-SERVICE/products', this.product)
        .subscribe({
          next: (data) => {
            console.log(data);
            this.showMessage('Product added successfully!', 'success');
          },
          error: (err) => {
            console.log(err);
            this.showMessage('Error adding product.', 'error');
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
