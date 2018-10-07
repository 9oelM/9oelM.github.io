---
comments: true
layout: post
title: "Chatting app with express + react + socket.io + etc"
date: 2018-10-07 09:00:00 -0100
categories: development
---
# Rationale
I had no choice. I needed go explore full-stack. I could not just stay as a front-end developer.

# Code
So I just cloned [this well-made boilerplate repo](https://github.com/crsandeep/simple-react-full-stack) and wrote my codes onto it, [in this repo](https://github.com/9oelM/chatt).

# Brute-forcing this education process
And I just looked for resources to educate myself. I decided to make a simple working chat app.

## Sources on creating a simple chatting app
* [slatepeak](https://blog.slatepeak.com/creating-a-real-time-chat-api-with-node-express-socket-io-and-mongodb/)
* [djamware](https://www.djamware.com/post/5b6a681f80aca76a2cbd98fb/mongodb-express-vuejs-2-nodejs-mevn-and-socketio-chat-app)

## Sources on Mongoose & MongoDB
* [Mongoose homepage](https://mongoosejs.com/docs/guide.html)
* [Velopert 1](https://velopert.com/436)
* [Velopert 2](https://velopert.com/594)

# What the heck is `mongodb`
* The most popular NoSQL database.
* A record in MongoDB is called a **document**, which is a data structure composed of field and value pairs (just like Javascript objects that are key-value pairs). 

# MongoDB Atlas
MongoDB Atlas is a cloud-hosted service for provisioning, running, monitoring, and maintaining MongoDB deployments. It is a fast, easy, and free way to get started with MongoDB.

Yeah. So I signed up for it. I just followed instructions [here](https://docs.mongodb.com/manual/tutorial/atlas-free-tier-setup/#create-free-tier-manual).

# Trying
Install `mongodb`
```
sudo apt-get install -y mongodb-org
```
Run `mongodb`
```
mongod --nojournal


2018-10-07T18:07:06.550+0000 [initandlisten] MongoDB starting : pid=5025 port=27017 dbpath=/data/db 64-bit host=j031-testt-6450328
2018-10-07T18:07:06.550+0000 [initandlisten] db version v2.6.12
2018-10-07T18:07:06.550+0000 [initandlisten] git version: d73c92b1c85703828b55c2916a5dd4ad46535f6a
2018-10-07T18:07:06.550+0000 [initandlisten] build info: Linux build5.ny.cbi.10gen.cc 2.6.32-431.3.1.el6.x86_64 #1 SMP Fri Jan 3 21:39:27 UTC 2014 x86_64 BOOST_LIB_VERSION=1_49
2018-10-07T18:07:06.550+0000 [initandlisten] allocator: tcmalloc
2018-10-07T18:07:06.550+0000 [initandlisten] options: { storage: { journal: { enabled: false } } }
2018-10-07T18:07:06.557+0000 [initandlisten] allocating new ns file /data/db/local.ns, filling with zeroes...
2018-10-07T18:07:06.628+0000 [FileAllocator] allocating new datafile /data/db/local.0, filling with zeroes...
2018-10-07T18:07:06.628+0000 [FileAllocator] creating directory /data/db/_tmp
2018-10-07T18:07:06.635+0000 [FileAllocator] done allocating datafile /data/db/local.0, size: 64MB,  took 0.002 secs
2018-10-07T18:07:06.636+0000 [initandlisten] build index on: local.startup_log properties: { v: 1, key: { _id: 1 }, name: "_id_", ns: "local.startup_log" }
2018-10-07T18:07:06.636+0000 [initandlisten]     added index to empty collection
2018-10-07T18:07:06.637+0000 [initandlisten] waiting for connections on port 27017
^C2018-10-07T18:07:22.593+0000 [signalProcessingThread] got signal 2 (Interrupt), will terminate after current cmd ends
2018-10-07T18:07:22.593+0000 [signalProcessingThread] now exiting
2018-10-07T18:07:22.593+0000 [signalProcessingThread] dbexit: 
2018-10-07T18:07:22.593+0000 [signalProcessingThread] shutdown: going to close listening sockets...
2018-10-07T18:07:22.593+0000 [signalProcessingThread] closing listening socket: 5
2018-10-07T18:07:22.593+0000 [signalProcessingThread] closing listening socket: 6
2018-10-07T18:07:22.593+0000 [signalProcessingThread] removing socket file: /tmp/mongodb-27017.sock
2018-10-07T18:07:22.593+0000 [signalProcessingThread] shutdown: going to flush diaglog...
2018-10-07T18:07:22.594+0000 [signalProcessingThread] shutdown: going to close sockets...
2018-10-07T18:07:22.594+0000 [signalProcessingThread] shutdown: waiting for fs preallocator...
2018-10-07T18:07:22.594+0000 [signalProcessingThread] shutdown: closing all files...
2018-10-07T18:07:22.594+0000 [signalProcessingThread] closeAllFiles() finished
2018-10-07T18:07:22.594+0000 [signalProcessingThread] shutdown: removing fs lock...
2018-10-07T18:07:22.594+0000 [signalProcessingThread] dbexit: really exiting now
```
on c9, you won't have enough spaces, so append this `--nojournal` option.

## Doing things with `mongo` to manipulate database
First, launch up `mongod` again and then start console with `mongo`.

### `use databaseName`
If `databaseName` exists, switch to this database. Otherwise create and switch to `databaseName`.
```
> use test
switched to db test
```

### `db`
Check which database I'm on. `db` also refers to the database you are on when used in combination with other commands. 
```
> db
test
```

### `show dbs`
Check the list of databases.
```
> show dbs
admin  (empty)
local  0.078GB
```

### Delete database
    1. `use databaseName`
    2. `db.dropDatabase();`

### Create collection
```
db.createCollection(name, [options])
```

But you could also implicitly create collection by inserting into a collection that has not yet been made:
```
> db.users.insert({"username": "joel"})
WriteResult({ "nInserted" : 1 })
```

### `show collections` 
```
> show collections
system.indexes
users
```
Check collection with this command.

I mean, you got it right? Other commands follow the same logic. Now I just need to search for APIs when I need other commands.