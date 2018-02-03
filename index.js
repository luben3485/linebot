var linebot = require('linebot')
var express = require('express')
var getJSON = require('get-json')
var port = '2266' 
var bot = linebot({
  channelId:'1560928773',
  channelSecret:'976346f7b7e48bd94df30eaf2529d4cd',
  channelAccessToken:'5ObAymA8Fs8ahSmejCSCiGrIMZgy6y6yCR0VWvpzZPzXbic58zqQ4uAEjwS9MhnFIzNQjlPnhS02yDSQv+dW5lT61X/FZuTacCspW/ZjAQh661sPhloWKsFgPsKFZQZ02LMhrslflG3ImdCy1ICpQAdB04t89/1O/w1cDnyilFU='
})

var timer
var pm = []
pm_getJSON()

bot.on('message',function(event){
//    event.source.profile().then(function(profile){
//    event.reply("hello,"+profile.displayName+" 尼剛剛說: "+event.message.text)
//    event.reply(profile.userId)
//    event.reply(profile.pictureUrl)
//    event.reply(profile.statusMessage) 
//  })


   if (event.message.type = 'text') {
      var msg = event.message.text;
      var replyMsg = '';
      //如果user 有輸入包含PM2.5的字串
      if(msg.indexOf('PM2.5')!= -1){
        pm.forEach(function(e,i){
          //如果輸入的地址是正確的
          if(msg.indexOf(e[0]) != -1){
            replyMsg = e[0] + '的PM2.5數值為'+e[1]
          }
        })
        if(replyMsg ==''){
          replyMsg = '請輸入正確地點'
        }

      }
      if(replyMsg==''){
        replyMsg = '不知道「'+ msg +'」是什麼意思:P'
      }

      event.reply(replyMsg).then(function(data) {
        console.log(replyMsg)
      }).catch(function(error) {
        console.log('error')
      })
   }

})
/*
setTimeout(function(){
  var userId = 'Uf6f7dbaf8f52b91d217816ba6eb6cd8e'
  var sendMsg = 'fuck you'
  bot.push(userId,sendMsg)
//  console.log('send: '+sendMsg + ' to '+userId )
},6000)
*/

function pm_getJSON( ) {
  clearTimeout(timer)
  getJSON('http://opendata2.epa.gov.tw/AQX.json',function(error,response){
    response.forEach(function(e,i){
      pm[i] = [] 
      pm[i][0] = e.SiteName
      pm[i][1] = e['PM2.5'] * 1
      pm[i][2] = e.PM10 * 1
    })
  })
  timer = setInterval(pm_getJSON,10000000)
}
/*
var test
test_timer()
function test_timer(){
  clearTimeout(timer)
  var userId = 'Uf6f7dbaf8f52b91d217816ba6eb6cd8e'
  var sendMsg = 'fuck you'
  bot.push(userId,sendMsg)
  timer = setInterval(test_timer,200)
}*/



//server
const app = express()
const linebotParser = bot.parser()

app.post('/',linebotParser)


var server = app.listen(port,function(){
  console.log('running on port'+ port+'!')
})





