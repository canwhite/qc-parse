# qc-parse

parse tools

# install
```
yarn add qc-parse
or
npm i qc-parse
```
# api
  * stringify
  * parse
  * deep_clone
  * parse_search 
  * get_os(Browser exclusive) 
  * addTinyImg
  * addTinyVideo
  todo ...      



# use

* front
```
import parse from "qc-parse"
...
let url = "?id=2&name=xm&login=false"

let result =  parse.parse_search(url);
console.log(result);//{ id: '2', name: 'xm', login: false }
let data = parse.deep_clone([1,2,3]);
console.log("deep",data); //[ 1, 2, 3 ]

let s = parse.stringify(result);// string:{"id":"2","name":"xm","login":false}
console.log("stringify",s)

let j = parse.parse(s);//obj:{ id: '2', name: 'xm', login: false }
console.log("obj",j);

```

* Node.js
```
const parse = require("qc-parse").default;
...
let url = "?id=2&name=xm&login=false"

let result =  parse.parse_search(url);
console.log(result);//{ id: '2', name: 'xm', login: false }
let data = parse.deep_clone([1,2,3]);
console.log("deep",data); //[ 1, 2, 3 ]

let s = parse.stringify(result);// string:{"id":"2","name":"xm","login":false}
console.log("stringify",s)

let j = parse.parse(s);//obj:{ id: '2', name: 'xm', login: false }
console.log("obj",j);
```
