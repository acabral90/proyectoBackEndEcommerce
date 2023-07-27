import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import { Faker, en } from '@faker-js/faker';

//bcrypt
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const validatePassword = (password, user) => bcrypt.compareSync(password, user.password);

//faker
export const customFaker = new Faker({
    locale: [en]
});

const { commerce, database, string } = customFaker;

export const generateProduct = ()=> {
    return {
        _id: database.mongodbObjectId(),
        title: commerce.productName(),
        description: commerce.productDescription(),
        price: parseFloat(commerce.price()),
        stock: parseInt(string.numeric(2)),
        category: commerce.department(),
    }
}


//__dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;
