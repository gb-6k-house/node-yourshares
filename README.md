# node-yourshares


<!-- TOC -->

- [node-yourshares](#node-yourshares)
            - [项目介绍](#项目介绍)
            - [安装方式](#安装方式)
            - [使用说明](#使用说明)
                - [<span id = "1">快速定义Http接口服务。</span>](#span-id--1快速定义http接口服务span)
                - [<span id = "2">快速定义RPC服务端</span>](#span-id--2快速定义rpc服务端span)

<!-- /TOC -->

#### 项目介绍
按照【 约定优于配置】的开发原则，快速搭建HTTP服务，RPC服务的框架主要包括三大块功能
1. [快速定义Http接口服务](#1)
2. [快速定义RPC服务](#2)
3. [基于ORM，快速定义自身的数据模型](#3)

#### 安装方式
```
npm i node-yourshares
```

#### 使用说明

##### <span id = "1">快速定义Http接口服务。</span>

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
1. 需要发布的http接口函数名形式必须形如: get_xxx_xxx或post_xxx_xxx等;
2. 框架自动识别对象中以['post', 'get', 'delete', 'all']开头的方法进行发布。 
3. API请求的方式，以函数名开头的['post', 'get', 'delete', 'all']为标识。比如需要发布post请求的方法。则可以名称为post_xx的方法。
4. api的路径根据方法名来定义。比如方法 post_hello_world，它实际表示的意思是。发布post接口，路径为/hello/world

##### <span id = "2">快速定义RPC服务端</span>

node-yourshares的RPC服务是通过[gRPC][1]实现的。接下来通过简单例子来说明如何进行RPC服务端和消费端代码编写。


>**定义RPC服务器**

首先，定义RPC服务器首先需要编写[protobuf][2]文件
```
syntax = "proto3";

option java_multiple_files = true;
option java_package = "io.grpc.examples.helloworld";
option java_outer_classname = "HelloWorldProto";
option objc_class_prefix = "HLW";

package helloworld;

// The greeting service definition.
service Greeter {
  // Sends a greeting
  rpc SayHello (HelloRequest) returns (HelloReply) {}
}

// The request message containing the user's name.
message HelloRequest {
  string name = 1;
}

// The response message containing the greetings
message HelloReply {
  string message = 1;
}
```
>**服务端代码**

```
import {RPCStartup} from "../../src"

var PROTO_PATH = __dirname + '/protos/helloworld.proto';

/**/
class  HelloRpc {
  /**
    * Implements the SayHello RPC method.
    */
  sayHello(call, callback) {
    callback(null, {message: 'Hello ' + call.request.name});
  }
}

var rpc = new RPCStartup({ip: '0.0.0.0', port: '50051'}, PROTO_PATH, 'helloworld')
rpc.addService({serviceName: 'Greeter', object: new HelloRpc()})
rpc.publish()

```
关于RPCStartup简单说明
- 通过RPCStartup#addService发布.proto描述的接口，不在描述文件中的接口和"_"开头的接口不会进行发布。
- .proto可以定义四种服务接口，1、简单 RPC，2、 服务器端流式 RPC，3、客户端流式 RPC，4、双向流式 RPC。四种服务具体如何实现RPC接口请参照[gRPC-Node][3]

>**消费端代码**

```
import {RPCClient} from "../../src"


var PROTO_PATH = __dirname + '/protos/helloworld.proto';

var client: any = new RPCClient({ip: '0.0.0.0', port: '50051'},'Greeter', PROTO_PATH, 'helloworld')


client.sayHello().sendMessage({name: 'world'}).then((message) =>{
    console.log('Greeting:', message);
})

```
- 消费端直接通过创建RPCClient实例就可以消费服务端的方法。
- 如果接口是简单RPC，则通过Promise方式调用接口。
- 关于更多四种类型的接口，消费端代码编写，参照[gRPC-Node-Detail][4]






[1]:https://grpc.io
[2]:https://developers.google.com/protocol-buffers/
[3]:https://grpc.io/docs/quickstart/node.html
[4]:https://grpc.io/docs/tutorials/basic/node.html




