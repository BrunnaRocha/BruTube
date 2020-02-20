export interface UserTokenGateway {
    generateToken(userId: string): string;
    getUserIdFromToken(token: string): string;
}