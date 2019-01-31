const request = require('request')
const cheerio = require('cheerio')

var std_no = 'E94056178'
var login_url = 'https://course.ncku.edu.tw/course/schedule.php'
var head = {
  'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
  'Accept-Encoding':'gzip, deflate, br',
  'Accept-Language':'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
  'Connection':'keep-alive',
  'Cookie':'lang=CHT; c_stu_no=; c_passwd=; _ga=GA1.3.443532666.1543938362; PHPSESSID='+std_no+'7330a98e095e1d3c5c7dceb0da166ffd',
  'Host':'course.ncku.edu.tw',
  'Referer':'https://course.ncku.edu.tw/course/index.php?lang=CHT',
  'Upgrade-Insecure-Requests':'1',
  'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
}

request.get({
	headers:head,
	url: login_url,
	},
	function (error, response, body) {
    	if(error)
        	console.log(error)
    	if (!error && response.statusCode == 200) {
			console.log(body)
			var $ = cheerio.load(body)
      		$('table tr').each(function(i,elem){
         		console.log(elem)
     	 	})

		}
	})
