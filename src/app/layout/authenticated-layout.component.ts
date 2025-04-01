import {
  Component,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Register, Login, ILoginResponse } from '../models/auth';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { UserLocalStorageService } from '../services/user-local-storage/user-local-storage.service';

@Component({
  selector: 'app-authenticated-layout',
  standalone: true,
  imports: [RouterOutlet, FormsModule, RouterLink],
  templateUrl: './authenticated-layout.component.html',
  styleUrl: './authenticated-layout.component.css'
})
export class AuthenticatedLayoutComponent {
  authService = inject(AuthService);
  toastr = inject(ToastrService);
  userLocalStorageService = inject(UserLocalStorageService);

  @ViewChild('loginModal') loginModal!: ElementRef;
  isLoginFormVisible = signal<boolean>(true);

  registerObj: Register = new Register();

  loginObj: Login = new Login();

  toggleForm() {
    this.isLoginFormVisible.set(!this.isLoginFormVisible());
  }

  openModal() {
    if (this.loginModal) {
      this.loginModal.nativeElement.style.display = 'block';
    }
  }

  closeModal() {
    if (this.loginModal) {
      this.loginModal.nativeElement.style.display = 'none';
    }
  }

  onRegister() {
    this.authService.register(this.registerObj).subscribe({
      next: (res: any) => {
        this.toastr.success('Registration successful');
        this.closeModal();
      },
      error: (err) => {
        this.toastr.error(JSON.stringify(err.error.errors));
      },
    });
  }

  onLogin() {
    this.authService.login(this.loginObj).subscribe({
      next: (res: ILoginResponse) => {
        this.toastr.success('Login successful');
        this.userLocalStorageService.setUser(res);
        this.closeModal();
      },
      error: (err) => {
        debugger;
        this.toastr.error(JSON.stringify(err.error));
      },
    });
  }

  get currentUser(){
    return this.userLocalStorageService.getCurrentUser();
  }

  onLogout(){
    this.toastr.success('Logout successful');
    this.userLocalStorageService.ClearUser();
  }
}
