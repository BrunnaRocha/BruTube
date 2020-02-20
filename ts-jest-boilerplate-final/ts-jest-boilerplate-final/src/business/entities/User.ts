export class User {
    constructor (
        private fullName: string,
        private id: string,
        private email: string,
        private bithdate: string,
        private password: string
    ) {}
    
    public getFullName(): string {
        return this.fullName
    }

    public getId(): string {
        return this.id
    }

    public getEmail(): string {
        return this.email
    }

    public getBirthdate(): string {
        return this.bithdate
    }

    public getPassword(): string {
        return this.password
    }
}