const express = require('express');
const app = express();
const path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const port = 3001;

//Constants for the objects that manage petitions for each resource.
const users = require("./src/routes/users");
const groups = require("./src/routes/groups");
const rooms = require("./src/routes/rooms");
const canvas = require("./src/routes/canvas");
const chats = require("./src/routes/chats");
const messages = require("./src/routes/messages");
const sessions = require("./src/routes/sessions");
const comments = require("./src/routes/comments");
const actions = require("./src/routes/actions");

//const usersInGroups = require("./src/routes/usersInGroups");
const bodyParser = require('body-parser');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'front/build')));

app.use(bodyParser.json());

//Declatarions that link the resources to the main app express manager.
//User routes
app.get("/api/users/", users.getUsers);
app.get("/api/users/:userid", users.getUser);
app.get("/api/users/name/:username", users.getUserByName);
app.post("/api/users/create", users.postUser);
app.put("/api/users/edit/:userid",users.putUser);
app.delete("/api/users/delete/:userid",users.deleteUser);

//Group routes
app.get("/api/groups/",groups.getGroups);
app.get("/api/groups/:groupid",groups.getGroup);
app.post("/api/groups/create", groups.postGroup);
app.delete("/api/groups/delete/:groupid",groups.deleteGroup);

//Room routes
app.get("/api/rooms/", rooms.getRooms);
app.get("/api/rooms/:roomid", rooms.getRoom);
app.post("/api/rooms/create", rooms.postRoom);
app.put("/api/rooms/edit/:roomid", rooms.putRoom);
app.delete("/api/rooms/delete/:roomid",rooms.deleteRoom);

//Canvas routes
app.get("/api/canvas/", canvas.getCanvas);
app.get("/api/canvas/:id", canvas.getCanva);
app.post("/api/canvas/create", canvas.postCanvas);
app.put("/api/canvas/edit/:id",canvas.putCanvas);
app.delete("/api/canvas/delete/:id",canvas.deleteCanvas);

//Chat routes
app.get("/api/chats/", chats.getChats);
app.get("/api/chats/:chatid", chats.getChat);
app.post("/api/chats/create", chats.postChat);
app.delete("/api/chats/delete/:chatid", chats.deleteChat);

//Messages routes
app.get("/api/messages/", messages.getMessages);
app.get("/api/messages/:messageid", messages.getMessage);
app.post("/api/messages/send", messages.postMessage);
app.put("/api/messages/edit/:messageid",messages.putMessage);
app.delete("/api/messages/delete/:messageid",messages.deleteMessage);

//Sessions routes
app.get("/api/sessions/", sessions.getSessions);
app.post("/api/sessions/create", sessions.postSession);
app.put("/api/sessions/:userid", sessions.putSession);
app.delete("/api/sessions/delete/:sessionid", sessions.deleteSession);

//Comments routes
app.get("/api/comments/", comments.getComments);
app.get("/api/comments/:commentid", comments.getComment);
app.post("/api/comments/create", comments.postComment);
app.put("/api/comments/edit/:commentid", comments.putComment);
app.delete("/api/comments/delete/:commentid",comments.deleteComment);

//Actions routes
app.get("/api/actions/", actions.getActions);
app.get("/api/actions/:svgPath", actions.getAction);
app.post("/api/actions/create", actions.postAction);
app.delete("/api/actions/delete/:actionid", actions.deleteAction);


app.post("/api/groups/admins", groups.postAdmin);
app.post("/api/groups/users", groups.postUser);

app.listen(port,() => {
	console.log('Serverapp listening on port 3001 !');
});
