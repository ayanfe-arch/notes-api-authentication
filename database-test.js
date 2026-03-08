const{ MongoClient} = require('mongodb');

const uri = 'mongodb+srv://ayanfe123ayanfe_db_user:wmDVpZcark6OwNtf@cluster0.qghb1z7.mongodb.net/?appName=Cluster0';

const client = new MongoClient(uri, {
    tlsAllowInvalidCertificates: true,
    tlsAllowInvalidHostnames: true
});

async function connect(){
    console.log('Attempting to connect...');
    try {
        await client.connect();
        console.log('Connected to MongoDB sucessfully!');
        
        await client.close();
        console.log('Connection closed');
    } catch (error) {
        console.error('Connection failed:', error);
    }
    }

    connect();