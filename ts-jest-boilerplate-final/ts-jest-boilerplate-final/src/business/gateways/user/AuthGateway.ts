export interface AuthGateway{
    createToken(id: string, email: string): string
    verifyToken(token: string): TokenData
}

export interface TokenData{
    id:string,
    email:string
}