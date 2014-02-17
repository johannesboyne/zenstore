#zenstore

zenstore is a simple JSON storage backed by [leveldb](https://code.google.com/p/leveldb/), [node-levelup](https://github.com/rvagg/node-levelup). You can easily `post` or `put` data to the storage and receive it by a simple `get`.

It is designed for simple use. Just request a new store by visiting the web-frontend or by calling the `/create` route.

####What it will become in the future

zenstore is supposed to be a simple "back-end" like structure for the "Internet of Thungs" (IoT) - [IoT-Wikipedia](http://en.wikipedia.org/wiki/Internet_of_Things), [IoT-McKinsey](http://www.mckinsey.com/insights/high_tech_telecoms_internet/the_internet_of_things), [IoT-Europe](http://www.internet-of-things.eu/). All this is very cool, but how to connect and store the data of **things**?

zenstore tries to solve the problem, it gives everyone the possibility to simply store and exchange data!

###Link 'secret' storage, that's like naming it

This one is quite cool, if you want to give somebody an easy read access just use the `createZenlink` API call. With this goodie it is possible to hide the random generated 'secret' zenstorage ID behind a human readable name. E.g. your zenlink ID is `c739a87f21d1740fbf83411d3132043780043a8b` you can link it by calling `http://[...]/createZenlink/c739a87f21d1740fbf83411d3132043780043a8b/yourbeautifulname`. Now you can share this zenstorage with ease: `http://[...]/zenlink/yourbeautifulname`.

###Linking Computations

This feature is quite cool - well, personally I like it... - if you don't want to share your data rawly, you can link a computation with your data set. Look at the example:

```
$ curl http://localhost:1337/67030dcf8eb3a25cc14dc223ccbb5234b786a90a
{"test":3}

$ curl \
> -d '{"script": "var output = {\"mynum\": data.test + 2}"}' \
> http://localhost:1337/linkComputation/67030dcf8eb3a25cc14dc223ccbb5234b786a90a
{"linkComputation":{"id":"67030dcf8eb3a25cc14dc223ccbb5234b786a90a","script":"var output = {\"mynum\": data.test + 2}"}}

$ curl http://localhost:1337/67030dcf8eb3a25cc14dc223ccbb5234b786a90a
{"mynum":5}

$ curl http://localhost:1337/unlinkComputation/67030dcf8eb3a25cc14dc223ccbb5234b786a90a
{"unlinkComputation":"67030dcf8eb3a25cc14dc223ccbb5234b786a90a"}

$ curl http://localhost:1337/67030dcf8eb3a25cc14dc223ccbb5234b786a90a
{"test":3}
```

The computation is done on the server, directly where your data is. This means, it is possible to share your results filtered, aggreated or even completly changed. BTW it does work with linked storages as well:

```
$ curl http://localhost:1337/zenlink/abc
{"test":3}

$ curl \
> -H "Content-Type: application/json" \
> -d '{"script": "var output = {\"mynum\": data.test + 2}"}' \
http://localhost:1337/linkComputation/67030dcf8eb3a25cc14dc223ccbb5234b786a90a

$ curl curl http://localhost:1337/zenlink/abc
{"mynum":5}
```

Quite cool, isn't it. And it should be save as well because we are using the node.js `vm` module and that runs everything you pass in inside a sandbox. If you receiver the raw data after you linked a computation your computation fails.

##LICENSE

MIT

##Roadmap

* implement search and atomic operations for one zenstorage
* implement preview for data-types at the "follow" subpage
