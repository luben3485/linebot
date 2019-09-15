const func_odd = require('./thirdAutoAddOdd')
const config = require('./config.json')
std_no = config.std_no
passwd = config.passwd
console.log(std_no)
//func.logout(std_no)
//func.logout(std_no)
func_odd.autoAddClass(std_no,passwd,'P7','003')
//func_odd.autoAddClass(std_no,passwd,'E9','120')
//func.logout(std_no)
console.log(passwd)
