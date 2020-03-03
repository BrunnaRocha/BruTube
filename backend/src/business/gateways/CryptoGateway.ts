export interface CryptoGateway {
    hash(word: string): Promise<string>
    compare(word: string, hash: string): Promise<boolean>
}