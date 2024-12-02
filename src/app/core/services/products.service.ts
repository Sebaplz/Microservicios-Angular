import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProductsResponse} from '../interfaces/products.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProducts(page: number = 1, limit: number = 10): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(`${this.API_URL}/products?page=${page}&limit=${limit}`);
  }
}
