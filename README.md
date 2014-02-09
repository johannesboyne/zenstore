#zenstore

zenstore is a simple JSON storage backed by [leveldb](https://code.google.com/p/leveldb/), [node-levelup](https://github.com/rvagg/node-levelup). You can easily `post` or `put` data to the storage and receive it by a simple `get`.

It is designed for simple use. Just request a new store by visiting the web-frontend or by calling the `/create` route.

###Link 'secret' storage, that's like naming it

This one is quite cool, if you want to give somebody an easy read access just use the `createZenlink` API call. With this goodie it is possible to hide the random generated 'secret' zenstorage ID behind a human readable name. E.g. your zenlink ID is `c739a87f21d1740fbf83411d3132043780043a8b` you can link it by calling `http://[...]/createZenlink/c739a87f21d1740fbf83411d3132043780043a8b/yourbeautifulname`. Now you can share this zenstorage with ease: `http://[...]/zenlink/yourbeautifulname`.

##LICENSE

MIT

##Is there a hosted version?

Yep, at the moment there is one at [http://zen-store.herokuapp.com/](http://zen-store.herokuapp.com/)! If you want a secure, high-end, poolished and backuped one - ask ;)

##Roadmap

* implement delete method to erase a store
* implement search and atomic operations for one zenstorage
