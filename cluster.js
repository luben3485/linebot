const cheerio = require('cheerio')
const request = require('request')
const url = "http://course-query.acad.ncku.edu.tw/qry/qry001.php?dept_no=A9"

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
    console.log(courses[0].teacher)
  }
})



