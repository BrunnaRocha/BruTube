import { User } from "../../entities/User";

export interface UserGateway {
    getUserById(id: string): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    createUser(user: User): Promise<void>;
    verifyUserExists(id: string): Promise<boolean>;
    getAllUsersUC(): Promise<User[]>;
    createUserRelation(followerId: string, followedId: string): Promise<void>;
    undoUserRelation(followerId: string, followedId: string): Promise<void>
}