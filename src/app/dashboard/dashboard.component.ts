import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private router = inject(Router);
  private data = [
    { name: 'Dupont', firstName: 'Jean', age: 25 },
    { name: 'Martin', firstName: 'Sophie', age: 30 },
    { name: 'Bernard', firstName: 'Luc', age: 22 },
    { name: 'Robert', firstName: 'Camille', age: 28 },
    { name: 'Durand', firstName: 'Paul', age: 35 }
  ];

  dataDisplay = this.data;

  personName: string = '';

  private searchByName(name: string) {
    return this.data.find(person => person.name.toLowerCase() === name.toLowerCase()) || null;
  }

  search() {
    if(this.personName !== ''){
      const result = this.searchByName(this.personName);
      this.dataDisplay = result ? [result] : [];
    }
  }

  logOut() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}