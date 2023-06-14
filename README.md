# json-service-editor

用于启动一个json读写的配套程序。比如服务端还在开发中，但是你仍需要一个可以模拟本地读写的程序，那么 **json-service-editor** 是一个很好的选择。

* core(跨域) - 1.0.11以及以后
* 支持js配置文件 - 1.0.11以及以后
* 支持自定义接口配置 - 1.0.11以及以后

## Install

``` shell
npm i json-service-editor -g
```

## Quick Start

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

## Interface

这里是最基本的json两个接口，get 和 set。

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

## Options

这里提供两种配置文件，一种是 `.json-service.json` 一种是 `.json-service.js`,如果运行目录同时存在js 与 json两种配置则js脚本优先。

|  配置 |  .json-service.js   | .json-service.json | description |
|  ----  | ----  | ----  | ----  |
|  url | ✅ | ✅ | 文件相对路径 |
| port  | ✅ | ✅ | 服务端口 |
| service  | ✅ | ❌ | 自定义服务列表 |

url与port定义相对简单，service这里做一些代码演示:

``` js
module.exports = () => {
  const url = "src/demo.json";
  const port = 3110;
  return {
    url,
    port,
    service: {
      // post请求
      '/post': {
        methods: 'post',
        handle: ({ json, params, res, req }) => {
          // json: 编辑json本身
          // params: 请求入参
          // res && req: 参考express官方文档
          res.json(200, { message: 'pass!' });
        }
      },

      // post请求
      '/get': {
        methods: 'get',
        handle: ({ json, params, res, req }) => {
          // json: 编辑json本身
          // params: 请求入参
          // res && req: 参考express官方文档
          res.json(200, { message: 'pass!' });
        }
      }
    }
  }
};
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

getValue(
  () => {},
  () => {}
)

```

## TODO

* Test
* Website
* BenchMark
