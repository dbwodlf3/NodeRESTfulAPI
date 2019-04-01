test = /^\/api/i

case1 = '/api/hehe'
case2 = '/hehe/api'

console.log(test.test(case1))
console.log(test.test(case2))