# koala
Code Fellows 401 JS project by [Natalie Chow](https://github.com/xxnatc) and [Kenneth Suh](https://github.com/suhk).

## Koa vs. Express
The main differences between Koa and Express are based on their relationship to node.js.

#### Generator functions and the `yield` command
Where Express tries to keep, but simplify, a lot of functionality similar to vanilla HTTP node, Koa takes a different outlook on the situation. It does it by using "generator" functions. This is Koa's method of handling asynchronous callbacks. A generator function does not actually get called until the object it returns (the iterator) has its `next` function called. Inside these generator functions, you can call the `yield` command before any asynchronous function, and that basically means that the entire function stops and waits for that chosen function to finish running before continuing on the next line of code. This makes handling async calls a lot simpler, and you won't have to next callback inside callback inside callback.

#### Koa's `Context` object
Like Express, Koa includes additional properties and methods with node's `request` and `response` objects for more convenient code-writing. Koa takes this a step further by combining these objects into a single Koa `Context` object. `Context` is created per request, as is accessible inside the middleware generator function using the `this` keyword. This has been a common practice in HTTP server development so Koa decided to implement the operation at its level (instead of a higher one).

However, such implementation involves a careful placement of the context. Developers might need to rebind `this` context if it's nested in another function call. The usage of normal function and arrow function expressions must also be clearly distinguished.
Moreover, even though the original node and Koa request/response objects are available (through `this.req`/`this.res` and `this.request`/`this.response` respectively), the way Koa combined them made some original methods unusable. For instance, using `res.writeHead()`, `res.write()`, and `res.end()` are said to be avoided, as Koa states in its docs, "bypassing Koa's response handling is not supported".

#### Router
Koa advertises itself to be smaller and more robust than Express. It doesn't come with any middleware out of the box, so it lacks one of the features we've been using frequently in class, a router. This, however, was not at all a problem since there are plenty of modules available. Koa's [GitHub wiki](https://github.com/koajs/koa/wiki#routing-and-mounting) contains a list of 2 dozens routing and mounting modules written for Koa. Some of them are maintained by the team at Koa while others are written by community members. The page also contains links to many different types of Koa frameworks, middleware and modules.
In short, incorporating a router is only a matter of requiring an extra module, plus you have the option to choose the router with features you need or syntax you like. Compared to Express, Koa provides you with building blocks to construct a framework only what you need, making it more flexible and very often lighter than Express.


## API Reference
Koala contains a single resource, `koalas`, and it utilizes a REST API.

- a `GET` request to `/api/koalas` will retrieve all koalas in the database.
- a `POST` request to `/api/koalas` will create a new koala
- a `PUT` request to `/api/koalas/:id` will fully update the koala with specified id
- a `DELETE` request to `/api/koalas/:id` will remove the koala with specified id from the database

Note that the `POST` request takes a JSON-formatted object to specify options for your koala. The options include:

| Properties | Data type | Default value |
| ---------- | --------- | ------------- |
| `name`     | String    | none          |
| `accent`   | String    | 'Australian'  |
| `age`      | Number    | A random integer between 0 and 99 |
| `color`    | String    | 'gray'        |
| `friends`  | Array     | `[]`          |
