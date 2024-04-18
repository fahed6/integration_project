import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor() {}

  public setRoles(roles: []) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('roles', JSON.stringify(roles));
    }
  }

  public getRoles(): [] | null {
    if (typeof localStorage !== 'undefined') {
      const rolesString = localStorage.getItem('roles');
      return rolesString ? JSON.parse(rolesString) : null;
    }
    return null;
  }

  public setToken(jwtToken: string) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('jwtToken', jwtToken);
    }
  }

  public getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('jwtToken');
    }
    return null;
  }

  public clear() {
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }
}
