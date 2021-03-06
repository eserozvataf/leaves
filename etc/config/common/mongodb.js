module.exports = {
    mongodb: {
        host: 'data01.hexajans.com',
        port: 27017,
        database: 'leaves',

        username: 'leaves',
        password: 'leaves',

        options: {
            /*
            replset: {
                // rs_name: 'rs0',
                poolSize: 10,
                socketOptions: {
                    keepAlive: 1,
                    connectTimeoutMS: 30000
                }
            },
            */
            server: {
                auto_reconnect: false,
                poolSize: 5,
                socketOptions: {
                    keepAlive: 1,
                    connectTimeoutMS: 30000
                }
            },
            db: {
                bufferMaxEntries: 0
            }
        }
    }
};
