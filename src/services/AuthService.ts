/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";
import { Roles } from "../constants/Roles";
import { Token } from "../types/Token";
import ApiService from "./ApiService";
import CookieService from "./CookieService";
import { ApiDetails } from "../constants/Api";


interface DecodedToken {
  role: string[];
  exp: number;
  userId: string;
  [key: string]: any;
}

export default class AuthService extends ApiService {
  private cookieService: CookieService;

  constructor() {
    super();
    this.cookieService = new CookieService();
  }

  /**
   * User login API call
   */
  public async UserLogin(data: any): Promise<Token | string> {
    const api = ApiDetails.login;
    const result = await this.crud(api, data);

    if (result[0] === 201) {
      const tokenData = result[1] as Token;
      this.cookieService.SetCookies(tokenData);

      return tokenData;
    }

    return result[1] as string;
  }

  /**
   * Authenticate a user with username and password
   */
  public async login(credentials: { username: string; password: string }): Promise<{
    success: boolean;
    message: string;
    role?: string;
  }> {
    try {
      const result = await this.UserLogin(credentials);
      
      if (typeof result === "string") {
        return { success: false, message: result };
      }
      
      // User authentication successful
      const decodedToken = this.decodeToken(result.accessToken);
      const userRole = decodedToken?.role?.[0] || "";
      
      return { success: true, message: "Login successful", role: userRole };
    } catch (error: any) {
      console.error("Authentication error:", error);
      return {
        success: false,
        message: error.message || "An unexpected error occurred during login",
      };
    }
  }

  /**
   * Decode the JWT token to extract user information
   */
  public decodeToken(token: string): DecodedToken | null {
    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error("Token decode error:", error);
      return null;
    }
  }

  /**
   * Get the current user's information from the token
   */
  public getCurrentUser(): { userId: string; role: string } | null {
    const token = this.cookieService.accessToken();
    
    if (!token) {
      return null;
    }
    
    const decoded = this.decodeToken(token);
    
    if (!decoded) {
      return null;
    }
    
    return {
      userId: decoded.userId,
      role: decoded.role[0]
    };
  }

  /**
   * Check if the user is authenticated
   */
  public isAuthenticated(): boolean {
    const token = this.cookieService.accessToken();
    
    if (!token) {
      return false;
    }
    
    try {
      const decoded = this.decodeToken(token);
      
      if (!decoded) {
        return false;
      }
      
      // Check if token is expired
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch (error) {
      return false;
    }
  }

  /**
   * Check if user has a specific role
   */
  public hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    
    if (!user) {
      return false;
    }
    
    return user.role === role;
  }

  /**
   * Check if the user has admin access
   */
  public isAdmin(): boolean {
    return this.hasRole(Roles.Admin);
  }

  /**
   * Check if the user has supervisor access
   */
  public isSupervisor(): boolean {
    return this.hasRole(Roles.Supervisor);
  }

  /**
   * Check if the user has worker access
   */
  public isWorker(): boolean {
    return this.hasRole(Roles.Worker);
  }

  /**
   * Logout the user by clearing all cookies
   */
  public logout(): void {
    this.cookieService.clearCookies();
  }

  /**
   * Get the appropriate redirect path based on user role
   */
  public getRedirectPath(): string {
    if (this.isAdmin()) {
      return "/admin/dashboard";
    } else if (this.isSupervisor()) {
      return "/supervisor/dashboard";
    } else if (this.isWorker()) {
      return "/worker/dashboard";
    } else {
      return "/unauthorized";
    }
  }
}