import {Injectable} from '@angular/core';
import {apiBaseUrl} from "../core/constants/api";
import {HttpClient} from "@angular/common/http";
import {LoginRequest, LoginResponse} from "../models/login";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly apiUrl = `${apiBaseUrl}/auth`;

    constructor(private readonly httpClient: HttpClient) {
    }

    public login(request: LoginRequest) {
        return this.httpClient.post<LoginResponse>(`${this.apiUrl}/login`, request, {
            headers: {}
        });
    }
}
