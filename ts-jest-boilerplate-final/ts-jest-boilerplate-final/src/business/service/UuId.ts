import { v4 } from 'uuid'
import { IdGeneratorGateway } from '../gateways/IdGeneratorGateway'


export class generateRandomId implements IdGeneratorGateway {
    generate() {
        return v4();
    }
}