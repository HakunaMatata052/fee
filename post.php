<?php
header("Content-type: text/html; charset=utf-8");
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers:Authorization');
header("Access-Control-Allow-Methods: GET, POST, DELETE");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With, Cache-Control,Authorization");

//连接数据库
$con=mysql_connect("localhost","root","root");// or die('Error:'.mysql_error());
if(!$con){
die("连接失败!".mysql_errno());
}else{
	mysql_select_db("ludan",$con);
	$result=mysql_query("select * from ludan");
	$request_body = file_get_contents('php://input');
    $data = json_decode($request_body, true);
	$arr =  $data['data'];
	foreach ($arr as &$value) {
		$uid = $value['uid'];
		mysql_query("update ludan set complete='1' where `uid`=$uid");
		
	};
	mysql_close($con);
}

?>
