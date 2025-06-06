import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent {

    loginForm!: FormGroup;
    hidePassword: boolean = true;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private snakBar: MatSnackBar,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required]],
        })
    }

    togglePasswordVisibility() {
        this.hidePassword = !this.hidePassword;
    }

    onSubmit() {
        console.log(this.loginForm.value);
        this.authService.login(this.loginForm.value).subscribe((res) => {
            console.log(res);
            if (res.userId != null) {
                const user = {
                    id: res.userId,
                    role: res.userRole,
                }
                StorageService.saveUser(user);
                StorageService.saveToken(res.jwt);

                if (StorageService.isAdminLoggedIn()) {
                    this.router.navigateByUrl("/admin/dashboard");
                } else if (StorageService.isEmployeeLoggedIn()) {
                    this.router.navigateByUrl("/employee/dashboard");
                }
                this.snakBar.open("Login Successfull", "close", { duration: 5000 });
            } else {
                this.snakBar.open("Invalid credentials", "close", { duration: 5000, panelClass: "error-snackbar" });
            }
        })
    }


}