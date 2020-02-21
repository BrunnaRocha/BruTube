import { User } from "../../entities/User";
import { UserGateway } from "../../gateways/user/UserGateway";
import { CryptoGateway } from "../../gateways/CryptoGateway";
import { IdGeneratorGateway } from "../../gateways/IdGeneratorGateway";
import { UserTokenGateway } from "../../gateways/user/UserTokenGateway";

export class RegisterUserUC {
    constructor(
        private userGateway: UserGateway,
        private cryptoGateway: CryptoGateway,
        private idGenerator: IdGeneratorGateway,
        private auth: UserTokenGateway
    ) { }

    async execute(input: RegisterUserUCInput): Promise<string> {
        this.validateUserInput(input);
        const id = this.idGenerator.generate();
        const password = await this.cryptoGateway.hash(input.password);
        const user = new User(id, input.name, input.email, input.birthdate, password);
       

        await this.userGateway.createUser(user);
        const token = this.auth.generateToken(user.getId());

        return token; 
    }

    private validateUserInput(input: RegisterUserUCInput) {
        if(!input.email || !input.password || !input.name){
            throw new Error("Algum(s) campo(s) está(ão) inválido(s)!")
        }
    }
}

export interface RegisterUserUCInput {
    name: string;
    email: string;
    birthdate: string,
    password: string;
}

export interface CreateUseUCOutput {
    message: string;
}
