import { connect } from 'mongoose';

export async function run(): Promise<void> {
    await connect('mongodb://localhost:27017/test', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(res => {
        console.log('mongo running');
    });
}
