import jwt from 'jsonwebtoken';

interface User {
    email: string;
}

const formatKey = (key: string) => key.replace(/\\n/g, '\n');

const privateKey = formatKey(process.env.PRIVATE_KEY || '');
const publicKey = formatKey(process.env.PUBLIC_KEY || '');

export const generateJwToken = (payload: User): Promise<string> => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '10m' }, (err, token) => {
            if (err) reject(err);
            resolve(token as string);
        });
    });
};

export const verifyJwToken = (token: string): Promise<User> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (err, decoded) => {
            if (err) reject(err);
            resolve(decoded as User);
        });
    });
};