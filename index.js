'use strict'

const ami = require('ami-io')
const fs = require('fs')

let SilentLogger = new ami.SilentLogger();
let amiclient = ami.createClient({port:5038,host:'cc.informunity.ru',login:'connectioncheck',password:'b9834c7fb8fc62ea9957a731955a4f33'});
amiclient.connect();
    amiclient.on('connected', function(){
console.log('Connected');
let action = new ami.Action.QueueStatus();
action.queue = 10000;
amiclient.send(action,(e,d)=>{
if (e) process.exit(1);
let t = fs.createWriteStream('out.log');
t.write(JSON.stringify(d));
let events = d.events;
for(let i=0;i<events.length;i++) {
console.log(events[i].strategy);
if (events[i].event=='QueueParams')
console.log(events[i].event.strategy);
else if (events[i].event=='QueueMember') {
console.log(events[i].name+' : '+events[i].location);
}
}
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
