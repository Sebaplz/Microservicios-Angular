import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {DividerModule} from 'primeng/divider';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, DividerModule, ButtonModule, InputTextModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  errorMessage: string = '';

  /** Login form group */
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]], // Coloca los validadores síncronos en un array
    password: ['', [Validators.required, Validators.minLength(6)]], // Coloca los validadores síncronos en un array
  });

  /**
   * Handles the login form submission
   */
  onSubmit(): void {
    if (this.loginForm.valid) {
      const {email, password} = this.loginForm.value;
      console.log('Login credentials:', {email, password});
      // Redirect or handle successful login here
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  /** Handles the sign-up form submission */
  onSignUp(): void {
    // Handle sign-up navigation or logic
    console.log('Redirecting to sign-up...');
    /*this.router.navigate(['/auth/register']);*/
  }
}
