# cheerio-suap
A way to get SUAP user information using cheerio in Nodejs

[Privacy](#privacy)

[How to install](#how-to-install)

[How to use](#how-to-use)

[Getting Data](#getting-data)
- [profile](#get-profile)
- [messages](#get-messages)
- [notifications](#get-notifications)
- [virtualClasses](#get-virtualclasses)
- [IRAs](#get-iras)
- [requirements](#get-requirements)
- [reports](#get-reports)
- [classesTime](#get-classesTime)
- [meals](#get-meals)


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
Returns a JSON with profile's principal information.
Example:
```
localhost:3333/profile
```
```
{
  "full_name": "Fulano da Silva Tal",
  "matricula": "20191114010015",
  "situation": "Matriculado",
  "period": "2º",
  "ira": "90,64",
  "photo_profile_url": "https://suap.ifrn.edu.br/media/alunos/150x200/194797.kLdnb3i5yzas.jpg",
  "fingerprint": "Sim"
}
```

#### GET /messages
Returns an array of JSON objects each one representing a SUAP's message.
Example:
```
localhost:3333/messages
```
```
[
  {
    "from": "Danilo Henrique (111111)",
    "title": "Minicurso: \"O corpo em movimento: orientações para manter-se ativo\"",
    "date": "24/04/2020 22:19"
  },
  {
    "from": "Jose Nascimento (111111)",
    "title": "Auxílio emergencial ao cidadão",
    "date": "14/04/2020 18:28"
  },
  ...
]
```

#### GET /notifications
Returns an array of JSON objects each one representing a SUAP's notification.
Example:
```
localhost:3333/notifications
```
```
[
  {
    "date": "14/02/2020 13:53",
    "text": "Saúde: Vacina Atrasada"
  },
  {
    "date": "13/02/2020 13:53",
    "text": "Saúde: Vacina Atrasada"
  },
  ...
]
```


#### GET /virtualClasses
Returns an array of JSON objects each one representing SUAP's virtual classes.
Example:
```
localhost:3333/virtualClasses
```
```
[
  {
    "virtual_id": "68405",
    "name": "Gestão Organizacional (NA)",
    "professor": "Maira Medeiros de Araujo"
  },
  {
    "virtual_id": "68406",
    "name": "Projeto de Desenvolvimento de Software (Curso 401)",
    "professor": "Daniel Bruno Alves dos Santos"
  },
  {
    "virtual_id": "68410",
    "name": "Sociologia do Trabalho(30H)",
    "professor": "Ana Eliza Trajano Soares"
  },
  ...
]
```

#### GET /iras
Returns an array of JSON objects each one representing I.R.A.'s information.
Example:
```
localhost:3333/iras
```
```
[
  {
    "period": "4",
    "year": "2020/1",
    "situation": "Matriculado",
    "frequency": "98,48%",
    "value": "-"
  },
  {
    "period": "3",
    "year": "2019/1",
    "situation": "Aprovado",
    "frequency": "97,41%",
    "value": "84,63"
  },
  ...
]
```

#### GET /requirements
Returns an array with current curse's progress and an array of JSON objects each one representing curse's requirement.
Example:
```
localhost:3333/requirements
```
```
{
  "progress": "77.72%",
  "requirements": [
    {
      "request": "Disciplinas Obrigatórias",
      "situation": "Não-cumprido",
      "ch_expected": "3570",
      "ch_done": "2670",
      "ch_pending": "900"
    },
    {
      "request": "Seminários",
      "situation": "Cumprido",
      "ch_expected": "70",
      "ch_done": "70",
      "ch_pending": "0"
    },
    ...
   ]
}
```
#### GET /reports
Returns an array of JSON objects each one representing studen's grades, frequency, total classes, situation etc.
Example:
```
localhost:3333/reports
```
```
[
  {
    "subject": "Biologia II(120H)",
    "total_classes": "16",
    "total_lack": "0",
    "frequency": "100%",
    "situation": "Cursando",
    "grades": {
      "n1": "-",
      "n2": "-",
      "n3": "-",
      "n4": "-"
    }
  },
  }
    "subject": "Qualidade de Vida e Trabalho",
    "total_classes": "0",
    "total_lack": "0",
    "frequency": "100%",
    "situation": "Cursando",
    "grades": {
      "n3": "-",
      "n4": "-"
    }
  },
  {
    "subject": "Programação para Internet",
    "total_classes": "13",
    "total_lack": "2",
    "frequency": "84,61%",
    "situation": "Cursando",
    "grades": {
      "n1": "100",
      "n2": "-",
      "n3": "-",
      "n4": "-"
    }
  },
  ...
]
```

#### GET /classesTime
Return arrays each one representing week's day with your classes times.

Where:
  0 = Monday
  1 = Tuesday
  2 = Wednesday
  3 = Thursday
  4 = Friday

Example:
```
localhost:3333/classesTime
```
Return all days.
```
[
  // monday [0]
  [
    {
      "time": "13:00 - 13:45",
      "class": "Biologia II(120H)"
    },
    {
      "time": "13:45 - 14:30",
      "class": "Biologia II(120H)"
    },
    ...
  ],
  // tuesday [1]
  [
    {
      "time": "13:00 - 13:45",
      "class": "Fundamentos de sistemas operacionais e Sistemas operacionais de redes"
    },
    {
      "time": "13:45 - 14:30",
      "class": "Fundamentos de sistemas operacionais e Sistemas operacionais de redes"
    },
    ...
  ],
  ...
]
```

#### GET /classesTime/:dayIndex
Return classes time of specific day.

Where:
  0 = Monday
  1 = Tuesday
  2 = Wednesday
  3 = Thursday
  4 = Friday

Example:
```
localhost:3333/classesTime/0
```
Returns Monday's classes times.
```
[
  {
    "time": "13:00 - 13:45",
    "class": "Biologia II(120H)"
  },
  {
    "time": "13:45 - 14:30",
    "class": "Biologia II(120H)"
  },
  ...
]
```

#### GET /meals
Returns an array of JSON that contains last three meals requested.
Example:
```
localhost:3333/meals
```
```
[
  {
    "request_date": "08/11/2019",
    "to_date": "11/11/2019",
    "type": "Jantar",
    "reason": "Projeto integrador",
    "situation": "Deferida"
  },
  {
    "request_date": "18/10/2019",
    "to_date": "21/10/2019",
    "type": "Jantar",
    "reason": "Projeto integrador",
    "situation": "Deferida"
  },
  {
    "request_date": "14/10/2019",
    "to_date": "15/10/2019",
    "type": "Jantar",
    "reason": "Projeto integrador",
    "situation": "Deferida"
  }
]
```
