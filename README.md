# json-service-editor

用于启动一个json读写的配套程序。比如服务端还在开发中，但是你仍需要一个可以模拟本地读写的程序，那么 **json-service-editor** 是一个很好的选择，

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

## Simpler Browser API (Base on [FetchAPI](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API))

如果你不想直接通过 fetchAPI 实现读写，你可以直接在需要json的地方

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

## TODO

* Test
* Website
* BenchMark
