const cheerio = require('cheerio')
const request = require('request')
const url = "http://course-query.acad.ncku.edu.tw/qry/qry001.php?dept_no=A9"
const func = require('./logintest')
const config = require('./config.json')
var timer
course_reload()
like = ['105']
function course_reload(){
    clearTimeout(timer)
    request(url, (err, res, body) => {
      if(err || !body){
        console.log("error: " + err)
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
          teacher:course[13].substring(1),
        }))

	var now_left = []
	for(var i = 0 ;i<courses.length;i++){
	    if(courses[i].left != '額滿' && parseInt(courses[i].left) < 20){
		now_left.push(courses[i])	
	    }
	}

        console.log('現在有' + now_left.length + '堂')
      	for(var  i =0 ; i < now_left.length ;i++)
	    for(var j =0 ;j < like.length ; j++)
		if(now_left[i].courseCode == like[j]){	
		    //var stu_no = config.stu_no
		    //var passwd = config.passwd
		    var stu_no = 'E94056013'
		    var passwd = '01c63696dbb5a0de0390d281966e28bd81354da4039d2ee386efa121ab1d288f' 
		    func.autoAddClass(stu_no,passwd,'A9',like[j])
		    console.log('搶到' + now_left[i].courseName + ' ' + now_left[i].courseCode + '  Time:' + now_left[i].time)
		}
        
	}	
    })
    
    timer = setInterval(course_reload,5000)
}





