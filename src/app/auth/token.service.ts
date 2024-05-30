import { Injectable, OnInit } from '@angular/core';
import { TokenDTO } from '../login/dto/token-dto.interface';

const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() {
  }

  setToken(tokenDTO: TokenDTO) {
    sessionStorage.setItem(TOKEN_KEY, tokenDTO.token);
  }

  getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  removeToken() {
    sessionStorage.removeItem(TOKEN_KEY);
  }

}
