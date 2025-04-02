import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private router = inject(Router)
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;

  onSubmit() {
    if (this.username === 'admin' && this.password === 'password123') {
      this.errorMessage = null;
      const session = { username: this.username, password: this.password };
      localStorage.setItem('user', JSON.stringify(session));
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect.';
    }
  }
}
