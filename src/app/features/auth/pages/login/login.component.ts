import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {DividerModule} from 'primeng/divider';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {CommonModule} from '@angular/common';
import {MessagesModule} from 'primeng/messages';
import {FloatLabelModule} from 'primeng/floatlabel';
import {MessageModule} from 'primeng/message';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, DividerModule, ButtonModule, InputTextModule, ReactiveFormsModule, RouterLink, MessagesModule, FloatLabelModule, FormsModule, MessageModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);

  /** Login form group */
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  /**
   * Returns error message for a specific field
   * @param field Field name
   * @returns Error message string
   */
  getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);

    if (control?.hasError('required')) {
      return `${field} is required.`;
    }

    if (field === 'email' && control?.hasError('email')) {
      return `Invalid email format.`;
    }

    if (field === 'password' && control?.hasError('minlength')) {
      const requiredLength = control.getError('minlength')?.requiredLength;
      return `Password must be at least ${requiredLength} characters long.`;
    }

    return '';
  }

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
