const socketio = require('socket.io');
const Message = require('../../database/models/index').Message;
const Room = require('../../database/models/index').Room;

const messageToSave = [];
let SaveQueryToDatabase = 1;
const nicknames = [];

let io;

exports.listen = function (_server) {
  io = socketio.listen(_server);
  // allowing it to piggyback on the existing HTTP server
  io.set('log level', 1);

  // nb of users
  // io.sockets.sockets.length
  // io.engine.clientsCount

  io.sockets.on('connection', (socket) => {
    io.emit('client_disconnected' /* CLIENT ID WHO MUST BE DISCONNECTED FROM THE ROOM */);
    // to the canal of the room
    joinRoom(socket, socket.handshake.query.marker);

    // Broadcasting message by room
    _handleMessageBroadcasting(socket);
    // Change room
    _handleRoomJoining(socket);

    _handleClientDisconnection(socket);
  });
};

/*
  parse always the same response
  */
function parse(socket, boolean, string_info, object = {}) {
  return {
    success: boolean,
    info: {
      id: socket.id,
      message: string_info
    },
    data: object
  };
}

function joinRoom(socket, room) {
  Room.findOrCreate({ where: { marker_description_id: room } }).then(result => {
    // obj.getMesssage();
    socket.join(result.id); // Make user join room

    socket.emit('join', parse(socket, true, 'join_room', { id: result.id }));
    // save the room in database
    // socket.broadcast.to(room).emit('notification', parse(socket, true, 'number of users', { image: user.image, message: `${user.username} joined ` }));

    // Show how many users there are in the room
    // socket.emit('notification', parse(socket, true, 'number of users', { message: `Users connected : ${io.sockets.adapter.rooms[room].length - 1}` }));
  });
}

/*
  Broadcasting message by room
  */
function _handleMessageBroadcasting(socket) {
  socket.on('message', (response, fn) => {
    // Associate to the ORM
    message = {
      user_id: response.user.id,
      room_id: response.room,
      content: response.data.message
    };

    let messageBuild = Message.build(message);

    // persisting
    // if(++SaveQueryToDatabase > 5) {
    messageBuild.save();
    // }

    fn(parse(socket, true, 'message received'));

    response.data.user = response.user;

    io.sockets.in(response.room).emit('message', parse(socket, true, 'new message', response.data));
  });
}
/*
  allows a user to join an existing room.
  */
function _handleRoomJoining(socket) {
  socket.on('join', (response, fn) => {
    const data = response.data;

    // if (MarkerDescription.findOne({id: data.name})) {
    socket.leave(response.room);
    joinRoom(socket, data.name, data.user);

    // fn(parse(socket, true, 'room name', { room: data.name }));// send info
    /* } else {
      fn(parse(socket, false, 'The room doesn\'t exist'));// send info
    }*/
  });
}
/*
  remove a user's nickname when the user leaves the chat application.
  */
function _handleClientDisconnection(socket) {
  socket.on('disconnect', () => {
    delete nicknames[socket.id];
  });
}
