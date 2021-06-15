import { connection } from 'mongoose';

const uptimeServer = async () => {
    const mongo = connection;

    const { uptime } = await mongo.db.command({ serverStatus: 1 });

    return uptime ? uptime : null;
};

const queryCount = async () => {
    const mongo = connection;

    const count = await mongo.db
        .collection('system.profile')
        .find({ ns: 'test.cpfs', op: 'query' })
        .count();

    return count ? count : null;
};

const serverStatus = async () => {
    const uptime = await uptimeServer();
    const count = await queryCount();

    return { uptime, count };
};

export default serverStatus;
