#zenstore

zenstore is a simple JSON storage backed by [leveldb](https://code.google.com/p/leveldb/), [node-levelup](https://github.com/rvagg/node-levelup). You can easily `post` or `put` data to the storage and receive it by a simple `get`.

It is designed for simple use. Just request a new store by visiting the web-frontend or by calling the `/create` route.

##Why didn't you use a framework like express, restify etc.

Seriously? `32`LOC aren't to much! And one saves the framework overhead!

##LICENSE

MIT

##Is there a hosted version?

Yep, at the moment there is one at [http://zen-store.herokuapp.com/](http://zen-store.herokuapp.com/)! If you want a secure, high-end, poolished and backuped one - ask ;)

##Roadmap

* implement delete method to erase a store
* implement search and atomic operations for one zenstorage
