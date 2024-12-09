import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router} from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: false,

  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  products: any;
  itemsPerPage = 4;
  currentPage = 1;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get('http://localhost:8888/INVENTORY-SERVICE/products').subscribe({
      next: (data) => {
        console.log(data);
        this.products = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  get paginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.products._embedded.products.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.products._embedded.products.length / this.itemsPerPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  goToAddProduct(product?: any) {
    if (product) {
      // If a product is passed, navigate to edit route with the product data
      this.router.navigate(['add-product'], {
        queryParams: { product: JSON.stringify(product) },
      });
    } else {
      // Otherwise, navigate to the add product route
      this.router.navigate(['/add-product']);
    }
  }

  deleteProduct(id: any) {
    this.http.delete(`http://localhost:8888/INVENTORY-SERVICE/products/${id}`).subscribe({
      next: (data) => {
        console.log('Product deleted:', data);
        this.products = this.products._embedded.products.filter((product: { id: any; }) => product.id !== id);
        //refresh the page
        this.ngOnInit();
      },
      error: (err) => {
        console.log('Error deleting product:', err);
      }
    });

  }
}
