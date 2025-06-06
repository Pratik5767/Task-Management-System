import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

const BASIC_URL = "http://localhost:9000/";

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    constructor(private http: HttpClient) { }

    getUsers(): Observable<any> {
        return this.http.get(BASIC_URL + "api/admin/users", {
            headers: this.createAuthorizationHeader()
        })
    }

    postTask(taskDto: any): Observable<any> {
        return this.http.post(BASIC_URL + "api/admin/task", taskDto, {
            headers: this.createAuthorizationHeader()
        })
    }

    getAllTasks(): Observable<any> {
        return this.http.get(BASIC_URL + "api/admin/tasks", {
            headers: this.createAuthorizationHeader()
        })
    }

    deleteTask(id: number): Observable<any> {
        return this.http.delete(BASIC_URL + "api/admin/task/" + id, {
            headers: this.createAuthorizationHeader()
        })
    }

    private createAuthorizationHeader(): HttpHeaders {
        return new HttpHeaders().set(
            'Authorization', 'Bearer ' + StorageService.getToken()
        )
    }
}