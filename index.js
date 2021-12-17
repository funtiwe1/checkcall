'use strict'

const ami = require('ami-io')

let SilentLogger = new ami.SilentLogger();
let amiclient = ami.createClient({port:5038,host:'cc.informunity.ru',login:'acp',password:'b26fa64e7642066de5cfe44b52f2a49b'});
amiclient.connect();
    amiclient.on('connected', function(){
console.log('Connected');
let action = new ami.Action.QueueStatus();
action.queue = 10000;
amiclient.send(action,(e,d)=>{
if (e) process.exit(1);
//console.log(d);
console.log('Send QS');
});
        setTimeout(function(){
            amiclient.disconnect();
            amiclient.on('disconnected',()=>{
console.log('Disconnected')
 process.exit();
});
        },5000);
    });
