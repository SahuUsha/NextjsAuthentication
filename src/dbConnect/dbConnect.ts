import mongoose,{ConnectOptions} from 'mongoose'

export async function dbconnect() {
    try {
        if (mongoose.connection.readyState === 0) {
            mongoose.set('bufferTimeoutMS', 20000);
      
            const options: ConnectOptions = {
              autoIndex: true, // Automatically build indexes
              connectTimeoutMS: 10000, // Timeout after 10 seconds
            };

            const connectResponse =  mongoose.connect(process.env.MONGO_URI!,options) // ! tells typescript that the value is not null
             console.log(connectResponse)
            const connection = mongoose.connection
             console.log(connection)
     
             connection.on('connected', () => {
                 console.log('MongoDB connected')
             })
     
              connection.on('error', (error) => {
                 console.log('Mongodb connection error , please make sure db is up and running: ', error)
                 process.exit(1)
              })
        }

    } catch (error) {
        console.log('Error connecting to database: ', error)

        
        
    }
}
