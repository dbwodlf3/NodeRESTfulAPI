#Helper function
function test($URI, $Method = "GET", $Header = @{"HTTP"="1.1"}, $Body = @{}, $TimeoutSec = 0){
    try{
        $Response = curl -URI $URI -Headers $Header -Method $Method -Body $Body -TimeoutSec $TimeoutSec
        write-Host $Method $URI $Response.statusCode 
        write-Host $Response.Content
        write-Host
    } catch {
        write-host $_
        write-host $Method $URI $_.Exception.Response.statusCode
        write-Host $_.Exception.Response.COntent
        write-Host
    }
}

#variables
$ComputerHost = "http://localhost:8000"
$BodyPOST = @"
{ "userName": "user", "password": "user", "email":"user@user"}
"@

#Test Cases
write-Host
test $ComputerHost;
test ($ComputerHost+"/api/user/") -Method "DELETE";
test ($ComputerHost+"/api/user/") -Method "POST" -Body $BodyPOST -Header @{"HTTP"="1.1";"Content-Type"="application/json"}
test ($ComputerHost+"/api/user/") -Method "PUT";
test ($ComputerHost+"/api/user/test") -Method "GET";