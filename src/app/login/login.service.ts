import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../auth/token.service';
import { LoginDTO } from './dto/login-dto.interface';
import { TokenDTO } from './dto/token-dto.interface';
import * as jwt_decode from 'jwt-decode';

const LOGIN_ENDPOINT = `http://localhost:8080/auth/login`;

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
    private router: Router,
  ) { }

  login(loginDto: LoginDTO) {
    this.httpClient.post<TokenDTO>(LOGIN_ENDPOINT, loginDto).subscribe({
      next: tokenDTO => this.handleSuccess(tokenDTO),
      error: error => console.log(loginDto)
    });
  }

  logout() {
    this.tokenService.removeToken();
    this.router.navigate(['/login']);
  }

  handleSuccess(tokenDTO: TokenDTO) {
    this.tokenService.setToken(tokenDTO);
    this.router.navigate(['']);
  }

  handleError(error: HttpErrorResponse) {
    console.log(error);
  }

  checkTokenExpired() {
    const token = this.tokenService.getToken();
        
    if (token) {
      const tokenDecoded: any = jwt_decode.jwtDecode(token);
      const tokenExpirado = Date.now() > tokenDecoded.exp * 1000;
      if (tokenExpirado) {
          this.logout();
          return true;
      }
    }
    return false;
  }
}
