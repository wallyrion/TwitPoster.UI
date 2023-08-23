import {Injectable} from '@angular/core';
import {apiBaseUrl} from "../core/constants/api";
import {HttpClient} from "@angular/common/http";
import {Account} from "../models/auth";
import {storageKeys} from "../core/constants/localstorage";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly apiUrl = `${apiBaseUrl}/users`;

    constructor(private readonly httpClient: HttpClient) {
    }

    public getCurrentUser() {
        return this.httpClient.get<Account>(`${this.apiUrl}/me`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(storageKeys.accessTokenKey)}`
            }
        });
    }
}
