const request = require('request')



var func = {
	autoAddClass: function(stdno,depno,seqno){
		//var cookie = 'lang=CHT; c_stu_no=; c_passwd=; PHPSESSID='+stdno+'7330a98e095e1d3c5c7dceb0da166ffd; _ga=GA1.3.1018205750.1517731885; _gid=GA1.3.1824998560.1517731885'
		var cookie = 'c_stu_no=; c_passwd=; lang=CHT; _ga=GA1.3.443532666.1543938362; PHPSESSID='+stdno+'7330a98e095e1d3c5c7dceb0da166ffd'
		//var cookie = 'lang=CHT; c_stu_no=; c_passwd=; PHPSESSID='+stdno+'7330a98e095e1d3c5c7dceb0da166ffd'
		var login_url = 'https://course.ncku.edu.tw/course/second2.php'
		var head = {
               		'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                    'Accept-Encoding':'gzip, deflate, br',
                    'Accept-Language':'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
					'Cache-Control': 'max-age=0', 
                   'Connection':'keep-alive',
					'Content-Length':'34',
					'Content-Type':'application/x-www-form-urlencoded',
                    'Cookie':cookie,
                    'Host':'course.ncku.edu.tw',
					'Origin':'https://course.ncku.edu.tw',
                    'Referer':'https://course.ncku.edu.tw/course/second2.php',
                    'Upgrade-Insecure-Requests':'1',
                    'User-Agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
        }
		var data = {
			"STEP":"0",
			"depNo":depno,
			"seqNo":seqno,
			"cer":"FUCK",

		}
        request.post({
			url:login_url,
			headers : head,
			form:data
		},function(error,response,body){
        	if(error)
            	console.log(error)
            if (!error && response.statusCode == 200) {
            	console.log("已經試著去搶課......")
				console.log(body)
			}
		})
		

	},
	logout: function(stdno){
	
var login_url = 'https://course.ncku.edu.tw/course/logout.php'
var head = {
  'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
  'Accept-Encoding':'gzip, deflate, br',
  'Accept-Language':'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
  'Cache-Control':'max-age=0',
  'Connection':'keep-alive',
  'Content-Length':'97',
  'Content-Type':'application/x-www-form-urlencoded',
  'Cookie':'lang=CHT; c_stu_no=; c_passwd=; _ga=GA1.3.443532666.1543938362; PHPSESSID='+stdno+'7330a98e095e1d3c5c7dceb0da166ffd',
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
	}
}

module.exports = func;












