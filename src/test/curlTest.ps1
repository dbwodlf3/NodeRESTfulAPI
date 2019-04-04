$ComputerHost = "http://localhost:8000"

#Test Cases
$test0 = curl $computerHost #홈페이지에 대한 Get 요청.
$test1 = curl ($computerHost + "/api/user") -Method "DELETE"
# $test2 = curl ($computerHost + "/api/user") -Method "POST"
# $test3 = curl ($computerHost + "/api/user") -Method "PUT"
# $test4 = curl ($computerHost + "/api/user/test") -Method "GET"

#write results into CLI screen.
write-host test0 $test0.statusCode $test0.Content 
write-host test1 $test1.statusCode $test1.Content
write-host test2 $test2.statusCode $test2.Content
write-host test3 $test3.statusCode $test3.Content
write-host test4 $test4.statusCode $test4.Content

#curl http://localhost:8000/api/user/test