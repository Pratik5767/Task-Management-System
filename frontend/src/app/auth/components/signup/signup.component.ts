import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

    signupForm!: FormGroup;
    hidePassword: boolean = true;

    constructor(
        private fb: FormBuilder, 
        private authService: AuthService,
        private snakBar: MatSnackBar,
        private router: Router
    ) {
        this.signupForm = this.fb.group({
            name: [null, [Validators.required]],
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required]],
            confirmPassword: [null, [Validators.required]],
        })
    }

    togglePasswordVisibility() {
        this.hidePassword = !this.hidePassword;
    }

    onSubmit() {
        console.log(this.signupForm.value);
        const password = this.signupForm.get("password")?.value
        const confirmPassword = this.signupForm.get("confirmPassword")?.value

        if (password !== confirmPassword) {
            this.snakBar.open("Password does not match", "close", {duration: 5000, panelClass: "error-snakbar"});
            return;
        }

        this.authService.signup(this.signupForm.value).subscribe((res) => {
            console.log(res);
            if (res.id != null) {
                this.snakBar.open("Signup Successfull", "close", {duration: 5000});
                this.router.navigateByUrl("/login");
            } else {
                this.snakBar.open("Signup Failed", "close", {duration: 5000, panelClass: "error-snakbar"});
            }
        })
    }
}