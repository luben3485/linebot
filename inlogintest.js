var request = require('request')
            var inlogin_url = 'https://course.ncku.edu.tw/course/index.php'
            var indata ={
                'lang':"CHT"
            }
            var inhead = {
                'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                'Accept-Encoding':'gzip, deflate, br',
                'Accept-Language':'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
                'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                'Accept-Encoding':'gzip, deflate, br',
                'Accept-Language':'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
                'Connection':'keep-alive',
                'Cookie':'lang=CHT; c_stu_no=; c_passwd=; PHPSESSID=E940561787330a98e095e1d3c5c7dceb0da166ffd; _ga=GA1.3.1018205750.1517731885; _gid=GA1.3.1824998560.1517731885',
                'Host':'course.ncku.edu.tw',
                'Referer':'https://course.ncku.edu.tw/course/login.php',
                'Upgrade-Insecure-Requests':'1',
                'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'
            } 
            
           request.get({
             headers:inhead,
             url: inlogin_url,
             form:indata,
           },
           function (error, response, body) {
             if(error)
                console.log(error)
             if (!error && response.statusCode == 200) {
                console.log(body)

             }
           })
