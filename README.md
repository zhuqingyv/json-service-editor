# json-service-editor

用于启动一个json读写的配套程序。

## install

``` shell
npm i json-service-editor -g
```

## use

create ``` .json-service.json ```

``` json
{
  "url": "demo.json",
  "port": 3000
}
```

run

``` shell
json-service-editor
```

现在你已经启动了一个简单的json读写服务。

## interface

Get JSonValue

``` typescript
fetch('http://localhost:3000/get/demo.json', {
  method: 'GET',
})
```

Set JSonValue

``` typescript
fetch('http://localhost:3000/set/demo.json', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ message: 'hello world!' }),
})
```

## Simpler API

First:
``` npm install json-service-editor ```

Code:

``` typescript
import JsonServiceEditorCore from 'json-service-editor';

const serviceSDK = new JsonServiceEditorCore({
  baseUrl: 'http://localhost:3000',
  fileName: 'demo.json'
});

const { getValue, setValue } = serviceSDK;
```