import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  // authService = inject(AuthService);
  // toastr = inject(ToastrService);
  // userLocalStorageService = inject(UserLocalStorageService);
  // @ViewChild('loginModal') loginModal!: ElementRef;
  // isLoginFormVisible = signal<boolean>(true);
  // registerObj: Register = new Register();
  // loginObj: Login = new Login();
  // toggleForm() {
  //   this.isLoginFormVisible.set(!this.isLoginFormVisible());
  // }
  // openModal() {
  //   if (this.loginModal) {
  //     this.loginModal.nativeElement.style.display = 'block';
  //   }
  // }
  // closeModal() {
  //   if (this.loginModal) {
  //     this.loginModal.nativeElement.style.display = 'none';
  //   }
  // }
  // onRegister() {
  //   this.authService.register(this.registerObj).subscribe({
  //     next: (res: any) => {
  //       this.toastr.success('Registration successful');
  //       this.closeModal();
  //     },
  //     error: (err) => {
  //       this.toastr.error(JSON.stringify(err.error.errors));
  //     },
  //   });
  // }
  // onLogin() {
  //   this.authService.login(this.loginObj).subscribe({
  //     next: (res: ILoginResponse) => {
  //       this.toastr.success('Login successful');
  //       this.userLocalStorageService.setUser(res);
  //       this.closeModal();
  //     },
  //     error: (err) => {
  //       debugger;
  //       this.toastr.error(JSON.stringify(err.error));
  //     },
  //   });
  // }
  // get currentUser(){
  //   return this.userLocalStorageService.getCurrentUser();
  // }
  // onLogout(){
  //   this.toastr.success('Logout successful');
  //   this.userLocalStorageService.ClearUser();
  // }
}
