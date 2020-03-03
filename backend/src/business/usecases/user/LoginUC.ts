import { UserTokenGateway } from '../../gateways/user/UserTokenGateway';
import { CryptoGateway } from '../../gateways/CryptoGateway';
import { UserGateway } from '../../gateways/user/UserGateway';

export class LoginUC {
    constructor(
        private userGateway: UserGateway,
        private cryptoGateway: CryptoGateway,
        private userTokenGateway: UserTokenGateway
    ) {}

    async execute(input: LoginInput): Promise<LoginOutput> {

        const user = await this.userGateway.getUserByEmail(input.email);

        const verifyPassword = await this.cryptoGateway.compare(input.password, user.getPassword());

        if(!verifyPassword){
            throw new Error("Senha ou email inválido")
        }

        return {
            token: this.userTokenGateway.generateToken(user.getId())
        }
    }
}

export interface LoginInput {
    email: string,
    password: string
}

export interface LoginOutput {
    token: string
} 