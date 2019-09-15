const linebot = require('linebot')
const express = require('express')
const getJSON = require('get-json')
const cheerio = require('cheerio')
const request = require('request')
const func = require('./autoAdd')
const func_odd = require('./login')
const config = require('./config.json') 
const url = "http://course-query.acad.ncku.edu.tw/qry/qry001.php?dept_no=P7"
var port = '2266' 
var bot = linebot({
  channelId:config.channelId,
  channelSecret:config.channelSecret,
  channelAccessToken:config.channelAccessToken})
var passwd = config.passwd
var count=0
var timer
//var ban = ['201','263','051','242','244','246','284','304','601','603','604','605','004','023','081','061','162','163','183','204','206','268','281','289']
//var like = ['343','224','341','322','302','434','123','140','141','142','143','160','161','162','164','210','288','302','321','440','480','120','322']
var ban = []
var like = ['016']
course_reload()

bot.on('message',function(event){
  //console.log('87')
  //console.log(event)
  
  if(event.message.type == 'text'){
    
     msg = event.message.text
     console.log(event.source.userId,"說",msg)
     if(msg.indexOf('banlist')!= -1){
        var replyMsg = ''
        for(var i = 0 ; i < ban.length ; i++)
          replyMsg = replyMsg  + ban[i] + ' '
          event.reply(replyMsg)
     }else if(msg.indexOf('likelist')!= -1 ){
        var replyMsg = ''
        for(var i = 0 ; i < like.length ; i++)
          replyMsg = replyMsg  + like[i] + ' '
          event.reply(replyMsg)	
     }	
     else if(msg.indexOf('unban')!= -1 ){
       var index = -1
       for(var i =0 ; i < ban.length ; i++){
          var deleted = msg.split(' ')[1]
          if(deleted == ban[i]){
            index = i
            break
          }
       }
       if(index == -1)
          event.reply(deleted + " 不在黑名單！")
       else{
          ban.splice(index,1)
          event.reply(deleted + " 已排除黑名單！")
       
       }
     }else if( msg.indexOf('ban')!= -1 ){
       var bancode = msg.split(' ')[1]
       var exist = 0
       for(var j = 0 ; j < ban.length ; j++){
          if( bancode == ban[j])
              exist =1
       }
       if(exist){
          event.reply(bancode + " 已在黑名單內！")
       }else{
          ban.push(bancode)
          event.reply(bancode + " 已加入黑名單！")
       }
      
     }else if(msg.indexOf('close') != -1){
        clearTimeout(timer)      
        event.reply("已關閉選課餘額通知！")
     }else if(msg.indexOf('open') != -1){
        course_reload()      
        event.reply("已開啟選課餘額通知！")

     }else if(msg.indexOf('dislike') != -1){
       var index = -1
       for(var i =0 ; i < like.length ; i++){
          var liked = msg.split(' ')[1]
          if(liked == like[i]){
            index = i
            break
          }
       }
       if(index == -1)
          event.reply(liked + " 不在搶課名單！")
       else{
          like.splice(index,1)
          event.reply(liked + " 已排除搶課名單！")
       
       }
	
     }else if(msg.indexOf('like') != -1){
      	var likecode = msg.split(' ')[1]
        var exist = 0
        for(var j = 0 ; j < like.length ; j++){
          if( likecode == like[j])
              exist =1
        }
        if(exist){
          event.reply(likecode + " 已在搶課名單內！")
        }else{
          like.push(likecode)
          event.reply(likecode + " 已加入搶課名單！")
        }
     }else if(msg.indexOf('add') != -1){
		
		std_no = msg.split(' ')[1]
		depno = msg.split(' ')[2]
		seqno = msg.split(' ')[3]
		//func.autoAddClass(std_no,depno,seqno)
		//func.autoAddClass(std_no,depno,seqno)
        func_odd.autoAddClass(std_no,passwd,depno,seqno)
        func_odd.autoAddClass(std_no,passwd,depno,seqno)
		console.log('開始幫'+std_no+'搶喔')
		event.reply('正在幫'+std_no+'搶 '+depno +' '+seqno+' ，請稍候自行確認。（如有衝堂可能搶課失敗）' )
     
     }else if(msg.indexOf('delete') != -1 || msg.indexOf('delete') != -1){
		std_no = msg.split(' ')[1]
		depno = msg.split(' ')[2]
		seqno = msg.split(' ')[3]
		//func.autoDeleteClass(std_no,depno,seqno)
        event.reply('正在幫'+std_no+'棄選 '+depno +' '+seqno+' ，請稍候自行確認。' )
	 }else if(msg.indexOf('help')!=-1){
        event.reply('常見指令如下:\n***********************\nopen(開啟選課通知)\nclose(關閉選課通知)\n**目前只有管理員看得到通知**\nbanlist (顯示黑名單課程)\nlikelist (顯示白名單課程)\nban <seqno> (將A9加入黑名單)\nunban <seqno> (將A9移除黑名單)\nlike <seqno> (將A9加入白名單)\ndislike <seqno>(將A9移除白名單)\nadd <std_no> <depno> <seqno>\n(幫特定人選特定課程嘻嘻 )')

	}

  }
})

function course_reload() {
  clearTimeout(timer)      
  request(url, (err, res, body) => {
   if(err || !body){
      console.log(err)
   }else{
     var courses = []
     var $ = cheerio.load(body)
     $('table tbody .course_y0').each(function(i,elem){
        courses.push($(this).text().split('\n'))
     })
     courses = courses.map(course => ({
/*        
        courseName: course[11],
        courseCode: course[3],
        courseClass: course[8],
        left:course[15],
        time:course[16],
        teacher:course[13]
*/
        
        courseName: course[15],
        courseCode: course[5],
        courseClass: course[6],
        left:course[19],
        time:course[20],
        teacher:course[17]
     }))
    
   
   var now_left = []
   for(var i = 0;i<courses.length;i++){
    if(courses[i].left != '額滿' && parseInt(courses[i].left) <20){
      var isban = 0
      for(var j = 0 ; j < ban.length ; j++){
        if(courses[i].courseCode == ban[j])
          isban =1
      }
      if(!isban)
        now_left.push(courses[i])
    }
   }
  /* courses.foreach(function(e){
    if(e.left != '額滿'){
      now_left.push(e)
    }
   })*/
     console.log("有" +now_left.length + "堂課還沒滿")
     var userId = 'Uf6f7dbaf8f52b91d217816ba6eb6cd8e'
     var sendMsg = '還有餘額 快去搶課!\n'
     if(now_left.length == 0){ 
     // console.log("NOOO");
     // bot.push(userId,"NONONOOOOO")
     }else{
   		 
//	func.autoAddClass('A9','061') 
        for(var i = 0;i < now_left.length ; i++){
			if(now_left[i].courseCode == '343'){
				//func.autoAddClass('E94051128','A9','343')
				//func.autoAddClass('E94051128','A9','343')
				//func.autoAddClass('E94051128','A9','343')

			}
       	    sendMsg = sendMsg  + 'A9 '+ now_left[i].courseCode + ' ' + now_left[i].courseName +' '+ now_left[i].time+ ",餘額" +now_left[i].left + "人\n"
	    for(var j = 0;j<like.length;j++){
	    	if(now_left[i].courseCode == like[j]){
		    var std_no = config.std_no
            	    //func.autoAddClass(std_no,'A9',now_left[i].courseCode)
            	    //func.autoAddClass(std_no,'A9',now_left[i].courseCode)
            	    //func.autoAddClass(std_no,'A9',now_left[i].courseCode)
        			func_odd.autoAddClass(std_no,passwd,'A9',now_left[i].courseCode)
        			func_odd.autoAddClass(std_no,passwd,'A9',now_left[i].courseCode)
		    var sendAddClassMsg = '已試著幫 '+std_no+' 搶到 ' + now_left[i].courseName + ' '+now_left[i].courseCode + ' 時間為 ' + now_left[i].time + '\n' 
		    bot.push(userId,sendAddClassMsg)
			}
	    }
        }
        //bot.push(userId,sendMsg)
		
    }
	count+=1
	if((count%10)==0){
		bot.push(userId,'search:'+count)
	}
  }
  })
  timer = setInterval(course_reload,300)
}


//server
const app = express()
const linebotParser = bot.parser()
//w_left[i].time

app.post('/',linebotParser)


var server = app.listen(port,function(){
  console.log('running on port '+ port+'!')
})





