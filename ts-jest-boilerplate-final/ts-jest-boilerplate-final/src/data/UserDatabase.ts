import knex from 'knex';
import { User } from '../business/entities/User';
import { UserGateway } from '../business/gateways/user/UserGateway'


export class UserDatabase implements UserGateway {
    createUserRelation(followerId: string, followedId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    undoUserRelation(followerId: string, followedId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    private connection = knex({
        client: 'mysql',
        connection: {
            host: 'ec2-18-229-236-15.sa-east-1.compute.amazonaws.com',
            user: 'brunna',
            password: 'f0938b7263c683db91a52018a6b038e8',
            database: 'brunna'   
        }
    });


    public async getUserById(id: string): Promise<User> {
        const query = await this.connection.raw(
            `SELECT * FROM BruTube WHERE id="${id}";`
        );

        const returnedUser = query[0] [0];
        if (!returnedUser) {
            throw new Error("usuário não encontrado");
        }

        return new User(
            returnedUser.id,
            returnedUser.fullName,
            returnedUser.email,
            returnedUser.birthdate,
            returnedUser.password
        );
    }

    public async getUserByEmail (email: string): Promise<User> {
        const query = await this.connection.raw(
            `SELECT * FROM BruTube WHERE email="${email}";`
        );

        const returnedUser = query [0] [0];
        if(!returnedUser) {
            throw new Error("Usuário não encontrado");
        }
        return new User(
            returnedUser.id,
            returnedUser.fullName,
            returnedUser.email,
            returnedUser.birthdate,
            returnedUser.password
        );
    }

    public async createUser(user: User): Promise<void> {
        await this.connection
        .insert({
            id: user.getId(),
            name: user.getFullName(),
            email: user.getEmail(),
            password: user.getPassword()
        })
        .into("BruTube")
    }

    async verifyUserExists(id: string): Promise<boolean> {
        const query = await this.connection.raw(
            `SELECT * FROM BruTube WHERE id="${id}";`
        );
        const returnedUser = query [0] [0];

        return Boolean(returnedUser);
    }

    public async getAllUsersUC(): Promise<User[]> {
        const query = this.connection.raw("SELECT * FROM BruTube;");
        const usersFromDb = await query;
        return usersFromDb[0].map(
            (user: any) =>
                new User(user.id, user.name, user.email, user.birthdate, user.password)
        );
    }

}