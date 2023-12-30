export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: number; // Unix timestamp
}
