import { Component, OnInit, inject } from '@angular/core';
import { ProductsService } from '../../../../core/services/products.service';
import { Product } from '../../../../core/interfaces/products.interface';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  imports: [CommonModule, TableModule],
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  private productsService = inject(ProductsService);

  products: Product[] = [];
  loading: boolean = false;
  totalRecords: number = 0; // Total de productos
  rows: number = 10; // Productos por página
  page: number = 1; // Página actual (1-based)

  ngOnInit() {
    this.loadProducts(this.page, this.rows);
  }

  loadProducts(page: number, rows: number) {
    this.loading = true;
    this.productsService.getProducts(page, rows).subscribe({
      next: (response) => {
        this.products = response.data; // Datos de productos
        this.totalRecords = response.total; // Total de productos del backend
        this.loading = false;
      },
      error: () => {
        console.error('Failed to load products');
        this.loading = false;
      },
    });
  }

  onLazyLoad(event: any) {
    const page = Math.floor(event.first / event.rows) + 1; // Calcular página (1-based)
    const rows = event.rows; // Tamaño de la página
    this.loadProducts(page, rows);
  }
}
