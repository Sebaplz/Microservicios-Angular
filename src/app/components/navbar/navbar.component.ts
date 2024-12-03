import {Component, inject} from '@angular/core';
import {MenuModule} from 'primeng/menu';
import {Button} from 'primeng/button';
import {AuthService} from '../../core/services/auth.service';
import {TabMenuModule} from 'primeng/tabmenu';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MenuModule,
    Button,
    TabMenuModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  private authService = inject(AuthService);
  isLoggedIn: true | false = false;

  logout() {
    this.authService.logout();
  }
}
