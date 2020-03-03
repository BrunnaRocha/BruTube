import express, {Request, Response, request} from 'express'
import { UserDatabase } from '../data/UserDatabase';
import { BcryptService } from '../business/service/cryptography/BcryptService';
import { JwtAuthService } from '../business/service/auth/jwtAuthService';
import { V4IdGenerator } from '../business/service/auth/V4IdGenerator';
import { RegisterUserUC } from '../business/usecases/user/RegisterUserUC';
import { LoginUC } from '../business/usecases/user/LoginUC';
import { GetAllUsersUC } from '../business/usecases/user/GetAllUsersUC';

const app = express()
app.use(express.json()) // Linha mágica (middleware)

const getTokenFromHeaders = (headers: any): string => {
    return (headers["auth"] as string) || "";
};

app.post("/signup", async (req: Request, res: Response) => {
    try {
        const createUser = new RegisterUserUC (
            new UserDatabase(),
            new BcryptService(),
            new V4IdGenerator(),
            new JwtAuthService()
        );

        const result = await createUser.execute({
            fullName: req.body.fullName,
            email: req.body.email,
            birthdate: req.body.birthdate,
            password: req.body.password
        });
        res.status(200).send(result)
        
    } catch (err) {
        res.status(400).send({
            erroMessage: err.message
        })
    }
});

app.post("/login", async (req: Request, res: Response) => {
    try {
        const loginUC = new LoginUC(
            new UserDatabase(),
            new BcryptService(),
            new JwtAuthService()
        )

        const result = await loginUC.execute({
            email: req.body.email,
            password: req.body.password
        })

        res.send(result)

    } catch(err) {
        res.status(400).send({
            erroMessage: err.message
        })
    }
});

app.get("/getAllUsers", async (req: Request, res: Response) => {
    try {
        const getAllUsersUC = new GetAllUsersUC(new UserDatabase());
        const result = await getAllUsersUC.execute();
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send({
            errorMessage: err.message
        });
    }
});

function authenticate(req: Request) {
    const jwtAuthService = new JwtAuthService()
    return jwtAuthService.getUserIdFromToken(getTokenFromHeaders(req.headers))
}


export default app