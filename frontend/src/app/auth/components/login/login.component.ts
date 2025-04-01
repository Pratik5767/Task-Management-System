import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth/auth.service';

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
        private snakBar: MatSnackBar
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
                this.snakBar.open("Login Successfull", "close", {duration: 5000});
            } else {
                this.snakBar.open("Invalid credentials", "close", {duration: 5000, panelClass: "error-snackbar"});
            }
        })
    }
}