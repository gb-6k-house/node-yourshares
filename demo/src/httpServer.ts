/******************************************************************************
** auth: liukai
** date: 2017/7
** ver : 1.0
** desc:  说明
** Copyright © 2017年 尧尚信息科技(wwww.yourshares.cn). All rights reserved
******************************************************************************/

import {YSHttpHandle, RPCClient } from "../../src"

import Express = require('express');


let config1 = {host:"tcp://127.0.0.1:9001", name: 'Test'}

let rpc =  new RPCClient(config1)

let app = Express()
class TestHttpHandle extends YSHttpHandle {
    public post_teacher(req, res, next) {
      console.log(`post_teacher body: ${req.body}`)
      console.log(`post_teacher query:`, req.query)
      // console.log('req.paramer==>>', req.params.id)
  
    }
    public get_hello_world(req, res) {
      console.log(req.query)
      console.log('get_hello req.paramer==>>', req.query.id)
      res.send('hello world')
      
    }
    public delete_hello(req, res) {
      console.log(`delete_hello:===>`)
      console.log(req.query)
      res.send('hello world')
    }
  }
  
  let http = new TestHttpHandle('/api/v1')
  
  app.set('port', (process.env.PORT || 8080))
  http.attach(app)
  
  app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
  });