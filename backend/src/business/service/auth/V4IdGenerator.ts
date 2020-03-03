import { v4 } from 'uuid';
import { IdGeneratorGateway } from '../../gateways/IdGeneratorGateway';

export class V4IdGenerator implements IdGeneratorGateway{
    generate(): string {
        return v4()
    }
} 