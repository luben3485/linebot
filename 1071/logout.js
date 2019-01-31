const request = require('request')


var login_url = 'https://course.ncku.edu.tw/course/logout.php'
var head = {
  'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
  'Accept-Encoding':'gzip, deflate, br',
  'Accept-Language':'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
  'Cache-Control':'max-age=0',
  'Connection':'keep-alive',
  'Content-Length':'97',
  'Content-Type':'application/x-www-form-urlencoded',
  'Cookie':'lang=CHT; c_stu_no=; c_passwd=; _ga=GA1.3.443532666.1543938362; PHPSESSID=E940561787330a98e095e1d3c5c7dceb0da166ffd',
  'Host':'course.ncku.edu.tw',
  'Origin':'https://course.ncku.edu.tw',
  'Referer':'https://course.ncku.edu.tw/course/index.php?lang=CHT',
  'Upgrade-Insecure-Requests':'1',
  'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
}

request.post({
	headers:head,
	url: login_url,
	},
	function (error, response, body) {
    	if(error)
        	console.log(error)
    	if (!error && response.statusCode == 200) {
			console.log(body)
		}
	})
