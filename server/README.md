# HackerU node.js Module

## Initial Data Users Credentials: 
* Admin: 
  * email: admin@gmail.com
  * password: Abc!123Abc
* Business:
    * email: business@gmail.com
    * password: Abc!123Abc
* Simple:
    * email: simple@gmail.com
    * password: Abc!123Abc

# APIs

### Register a new user
POST/api/users
#### Request:
| index      | type    | index       | type   | min | max | remark   |
| ---------- | ------- | ----------- | ------ | --- | --- | -------- |
| name       | object  |             |        |     |     | required |
|            |         | first       | string | 2   | 256 | required |
|            |         | middle      | string | 2   | 256 |          |
|            |         | last        | string | 2   | 256 | required |
| phone      | string  |             |        | 9   | 11  | required |
| email      | string  |             |        | 5   |     | required |
| password   | string  |             |        | 7   | 20  | required |
| image      | object  |             |        |     |     |          |
|            |         | url         | string | 14  |     |          |
|            |         | alt         | string | 2   | 256 |          |
| address    | object  |             |        |     |     | required |
|            |         | state       | string | 2   | 256 |          |
|            |         | country     | string | 2   | 256 | required |
|            |         | city        | string | 2   | 256 | required |
|            |         | street      | string | 2   | 256 | required |
|            |         | houseNumber | number | 2   | 256 | required |
|            |         | zip         | number | 2   | 256 | required |
| isBusiness | boolean |             |        |     |     | required |

- "image" must be a standard URL
- "password" must be at least nine characters, contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&\*-
- "phone" must be a standard phone number
- "email" must be a standard email

### User Login
POST/api/users/login
#### Request Body:
| index    | type   | min | max | remark   |
| -------- | ------ | --- | --- | -------- |
| email    | string | 5   |     | required |
| password | string | 7   | 20  | required |

#### Response

If credentials are correct, a token will be returned and the following object can be extracted from it with the help of the jwt-decode library

| index      | type    |
| ---------- | ------- |
| \_id       | string  |
| isBusiness | boolean |
| isAdmin    | boolean |

### Get User
GET/api/users/:id

Required:
- Token
- You will need to be the registered user or Admin type user to get an answer from this api

### Update User
PUT/api/users/:id
### Request Body:

| index      | type    | index       | type   | min | max | remark   |
| ---------- | ------- | ----------- | ------ | --- | --- | -------- |
| name       | object  |             |        |     |     | required |
|            |         | first       | string | 2   | 256 | required |
|            |         | middle      | string | 2   | 256 |          |
|            |         | last        | string | 2   | 256 | required |
| phone      | string  |             |        | 9   | 11  | required |
| email      | string  |             |        | 5   |     | required |
| password   | string  |             |        | 7   | 20  | required |
| image      | object  |             |        |     |     | required |
|            |         | url         | string | 14  |     | required |
|            |         | alt         | string | 2   | 256 | required |
| address    | object  |             |        |     |     | required |
|            |         | state       |        | 2   | 256 |          |
|            |         | country     |        | 2   | 256 | required |
|            |         | city        |        | 2   | 256 | required |
|            |         | street      |        | 2   | 256 | required |
|            |         | houseNumber |        | 2   | 256 | required |
|            |         | zip         |        | 2   | 256 | required |
| isBusiness | boolean |             |        |     |     | required |

- "image" must be a standard URL
- "password" must be at least nine characters, contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&\*-
- "phone" must be a standard phone number
- "email" must be a standard email
- Token
- You need to be Admin to get an answer from this api

#### Delete User
DELETE/api/users/:id

- You will need to provide a token to get an answer from this api
- You will need to be the registered user or Admin to get an answer from this api

### Change User Type (Business/Simple)
PATCH/api/users/:id

Required:
- Token
- You will need to be the registered user or Admin to get an answer from this api

### Get All Cards
GET/api/cards

### Get Cards Of Specific User
GET/api/cards/my-cards

Required:
- Token

### Create A Card
POST/api/cards

#### Request

| index       | type   | index       | type   | min | max  | remark   |
| ----------- | ------ | ----------- | ------ | --- | ---- | -------- |
| title       | string |             |        | 2   | 256  | required |
| subtitle    | string |             |        | 2   | 256  | required |
| description | string |             |        | 2   | 1024 | required |
| phone       | string |             |        | 9   | 11   | required |
| email       | string |             |        | 5   |      | required |
| web         | string |             |        | 14  |      |          |
| image       | object |             |        |     |      | required |
|             |        | url         | string | 14  |      |          |
|             |        | alt         | string | 2   | 256  |          |
| address     | object |             |        |     |      | required |
|             |        | state       | string |     |      |          |
|             |        | country     | string |     |      | required |
|             |        | city        | string |     |      | required |
|             |        | street      | string |     |      | required |
|             |        | houseNumber | number | 1   |      | required |
|             |        | zip         | number |     |      |          |

- "image" must be a standard URL
- "phone" must be a standard phone number
- "email" must be a standard email
- "web" must be a standard URL
- Token
- You will need to be a Business type user to get an answer from this api

### Update A Card

#### Request
PUT /api/cards/:id

| index       | type   | index       | type   | min | max  | remark   |
| ----------- | ------ | ----------- | ------ | --- | ---- | -------- |
| title       | string |             |        | 2   | 256  | required |
| subtitle    | string |             |        | 2   | 256  | required |
| description | string |             |        | 2   | 1024 | required |
| phone       | string |             |        | 9   | 11   | required |
| email       | string |             |        | 5   |      | required |
| web         | string |             |        | 14  |      |          |
| image       | object |             |        |     |      | required |
|             |        | url         | string | 14  |      |          |
|             |        | alt         | string | 2   | 256  |          |
| address     | object |             |        |     |      | required |
|             |        | state       | string |     |      |          |
|             |        | country     | string |     |      | required |
|             |        | city        | string |     |      | required |
|             |        | street      | string |     |      | required |
|             |        | houseNumber | number | 1   |      | required |
|             |        | zip         | number |     |      |          |

- "image" must be a standard URL
- "phone" must be a standard phone number
- "email" must be a standard email
- "web" must be a standard URL
- Token
- You will need to be a Business type user to get an answer from this api

### Card Like
PATCH/api/cards/biz-number/:id

#### Request

| index     | type   | min | max | remark   | from    | to      |
| --------- | ------ | --- | --- | -------- | ------- | ------- |
| bizNumber | number | 7   | 7   | required | 1000000 | 9999999 |

- Token
- You will need to be an admin type user to get an answer from this api

### Delete Card
DELETE/api/cards/:id

- Token
- You must be the user who created the card or an admin in order to delete the business card