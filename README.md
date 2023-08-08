# short-url
This is a simple URL shortener written in node.js and express.js with a MongoDB database.
## Installation
1. Clone the repository
2. Install the dependencies
```bash
npm install
```
3. Create a .env file and add the following:
```bash
MONGO_URI=<your mongodb uri>
JWT_KEY=<your jwt secret>
```
4. Run the server
```bash
npm start
```
## Usage
### Register
Send a POST request to /api/user/signuo with the following body:
```json
{
    "username": "username",
    "email": "email",
    "password": "password"
}
```
### Login
Send a POST request to /api/user/login with the following body:
```json
{
    "email": "email",
    "password": "password"
}
```
### Create a short URL
Authorization header is required. `Authorization: Bearer <token>`
Send a POST request to /api/short with the following body:
```json
{
    "url": "url",
    "code": "code (not required)"
}
```
### Get code information
Send a GET request to /api/url/:code .
### Try the short URL
Send a GET request or enter on the browser the following URL: /r/:code.


## License
[MIT](https://choosealicense.com/licenses/mit/)

