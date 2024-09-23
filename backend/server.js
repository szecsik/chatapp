const { Server } = require("socket.io");
const { MongoClient } = require("mongodb");


// Replace the uri string with your connection string.
const uri = "mongodb+srv://szecsikr:ocdJtV9vwNHtq7L6@szecsikr.gfmf4dd.mongodb.net/";


const io = new Server({ cors : {
    origin: "http://localhost:3000"
}});

io.use((socket, next) => {
  socket.on('chatroom', async (msg) => {
    console.log('middleware: ' + msg);
    const messageToSend = JSON.parse(msg)
    messageToSend.date = new Date()
    const client = new MongoClient(uri);
    try {
      const database = client.db('szecsikr');
      const messages = database.collection('messages');
      const result = await messages.insertOne(messageToSend);

    }
    catch(e){
      console.log(e)
    }
    finally{
      await client.close()
      next()
    }


});
    next()
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chatroom', (msg) => {
          console.log('message: ' + msg);
          socket.emit('middleware', "gecis")
          console.log("emitting")
          io.emit('chatroom', msg)
    });


  });


io.listen(3001);