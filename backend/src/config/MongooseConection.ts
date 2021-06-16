import mongoose, { connect, connection } from 'mongoose';

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_COLLECTION = process.env.DB_COLLECTION;

export async function run(): Promise<void> {
    await connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_COLLECTION}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
    }).then(res => {
        console.log('mongo running');
    });
}
