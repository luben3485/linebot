const url = "http://course-query.acad.ncku.edu.tw/qry/qry001.php?dept_no=A2"
const cheerio = require('cheerio')
const request = require('request') 
const func_odd = require('./thirdAutoAddOdd')
const config = require('./config.json')
course_reload()
ban = []
like = ['258']
var count = 0
var std_no = config.std_no
var passwd = config.passwd
var timer
//func_odd.autoAddClass(std_no,passwd,'A2',258) //test
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
        courseName: course[11],
        courseCode: course[3],
        courseClass: course[8],
        left:course[15],
        time:course[16],
        teacher:course[13]
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
   console.log("有" +now_left.length + "堂課還沒滿","已經試著幫你搶了"+count+"次")
   var sendMsg = ''
   if(now_left.length == 0){ 
     //console.log('課都滿了...') 
   }else{
     for(var i = 0;i < now_left.length ; i++){
       sendMsg = sendMsg  + 'A2 '+ now_left[i].courseCode + ' ' + now_left[i].courseName +' '+ now_left[i].time+ ",餘額" +now_left[i].left + "人\n"
	   for(var j = 0;j<like.length;j++){
	     if(now_left[i].courseCode == like[j]){
           func_odd.autoAddClass(std_no,passwd,'A2',now_left[i].courseCode)
           func_odd.autoAddClass(std_no,passwd,'A2',now_left[i].courseCode)
		   var sendAddClassMsg = '已試著幫 '+std_no+' 搶到 ' + now_left[i].courseName + ' '+now_left[i].courseCode + ' 時間為 ' + now_left[i].time + '\n' 
		   count = count + 1
		   console.log(sendAddClassMsg)
		 }
	   }
     }
     console.log(sendMsg)	
    }
	}
  })
  
  timer = setInterval(course_reload,300)
}
