# cheerio-suap
A way to get SUAP user information using cheerio in Nodejs

[Privacy](#privacy)

[How to install](#how-to-install)

[How to use](#how-to-use)

[Getting Data](#getting-data)


### Privacy

  **1. We are not responsible for any wrong uses!**
  
  **2. This API can not modify or share your informations**
  
  **3. Never share your cookies with others**

### How to install

In the main directory execute this command:
```
npm install
```
After:

1. Create a file named **.env** with this content:
```
MATRICULA=<HERE SET YOUR MATRICULA>

CSRF_TOKEN=

SESSION_ID=
```
2. Login [SUAP](https://suap.ifrn.edu.br/accounts/login/?next=/) with your account
3. Get page's information using **Ctrl+Shift+I** (Chrome)
4. Access cookies in **Application > Storage > Cookies**
5. Set *csrftoken* value into **.env** file
6. Set *sessionid* value into **.env** file

### How to use

Execute this command: 
```
npm start
```
If you want to set HTTP Server Port, please run this command:
```
PORT=<SET HERE> node src/server.js
```

### Getting data

Now we can get profile information, notifications, messages and virtual classes. 

#### GET /profile
Returns a JSON with profile's principal information
Example:
```
localhost:3333/profile
```

#### GET /messages
Returns an array of JSON objects each one representing a SUAP's message
Example:
```
localhost:3333/messages
```

#### GET /notifications
Returns an array of JSON objects each one representing a SUAP's notification 
Example:
```
localhost:3333/notifications
```

#### GET /virtualClasses
Returns an array of JSON objects each one representing SUAP's virtual class
Example:
```
localhost:3333/virtualClasses
```

#### GET /iras
Returns an array of JSON objects each one representing I.R.A.'s information
Example:
```
localhost:3333/iras
```

