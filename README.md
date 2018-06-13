# node-yourshares
#### 项目介绍

按照【 约定优于配置】的开发原则，快速搭建HTTP服务，RPC服务的框架主要包括三大块功能
1. 快速定义Http接口服务。
2. 快速定义RPC服务端
3. 基于ORM，快速定义自身的数据模型。

#### 安装方式
```
npm i node-yourshares
```

#### 使用说明

##### 快速定义Http接口服务。

定义http服务，只需要继承YSHttpHandle类。比如发布路径为/helloword 的get请求, typscript代码如下:
 ```javascript
import {YSHttpHandle} from "node-yourshares"

import * as express from "express"

let config1 = {host:"tcp://127.0.0.1:9001", name: 'Test'}
let app = express()
class TestHttpHandle extends YSHttpHandle {
    public get_helloworld(req, res) {
      console.log(req.query)
      console.log('get_hello req.paramer==>>', req.query.id)
      res.send('hello world')
      
    }
  }
  let http = new TestHttpHandle()
  app.set('port', (process.env.PORT || 8080))
  http.attach(app)
  app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
  })
 ```

几点说明  
1. 需要发布的http接口函数名形式必须形如: get_xxx_xxx;
2. 框架自动识别对象中以['post', 'get', 'delete', 'all']开头的方法进行发布。 
3. API请求的方式，以函数名开头的['post', 'get', 'delete', 'all']为标识。比如需要发布post请求的方法。则可以名称为post_xx的方法。
4. api的路径根据方法名来定义。比如方法 post_hello_world，它实际表示的意思是。发布post接口，路径为/hello/world




