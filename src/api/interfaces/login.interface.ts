export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    role: string;
  };
  expiresIn: number;
}

export interface TokenVerifyResponse {
  valid: boolean;
  user?: {
    id: string;
    name: string;
    role: string;
  };
}
