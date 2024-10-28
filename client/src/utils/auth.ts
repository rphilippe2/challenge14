import { JwtPayload, jwtDecode } from "jwt-decode";

class AuthService {
  getProfile(): JwtPayload | null {
    const token = this.getToken();
    if (token) {
      return jwtDecode<JwtPayload>(token); 
    }
    return null; 
  }

  loggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string): boolean {
    const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
    return decoded.exp ? Date.now() >= decoded.exp * 1000 : true; 
  }

  getToken(): string | null {
    return localStorage.getItem("token"); 
  }

  login(idToken: string) {
    localStorage.setItem("token", idToken);
    window.location.href = "/home"; 
  }

  logout() {
    localStorage.removeItem("token"); 
    window.location.href = "/login"; 
  }
}

export default new AuthService();
