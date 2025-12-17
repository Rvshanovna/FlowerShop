import { compare, hash } from 'bcrypt';

class Crypto {
    async decode(data){
        const hashedData = await hash(data, 7);
        return hashedData;
    };
    async encode(data, hashedData){
        const isMatch = await compare(data, hashedData);
        return isMatch;
    }
}

export default new Crypto();