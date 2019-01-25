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
		$uid = $value['id'];
		$company = $value['company'];
		$business = $value['business'];
		$customer = $value['customer'];		
		$qdate = $value['qdate'];
		$xdate = $value['xdate'];
		$qmoney = $value['qmoney'];
		$smoney = $value['smoney'];
		if($value['type']=="WJDH双模"){
			$type = "万(前)";
		}elseif($value['type']=="常规"){
			$type = "常";
		};
		$workload = $value['workload'];
		$programmer = $value['programmer'];
		$designer = $value['designer'];		
		$fee = $value['fee'];	
		$date = $value['feetime'];				
		$cx = mysql_query("SELECT * FROM `ludan` WHERE uid = '$uid'");
		$row = mysql_fetch_assoc($cx);
		if($row){
			mysql_query("update ludan set company='$company',business='$business',customer='$customer',qdate='$qdate',xdate='$xdate',qmoney='$qmoney',smoney='$smoney',type='$type',workload='$workload',programmer='$programmer',designer='$designer',fee='$fee',date='$date' where `uid`=$uid");
		}else{
			mysql_query("insert into ludan(`uid`,`company`,`business`,`customer`,`qdate`,`xdate`,`qmoney`,`smoney`,`type`,`workload`,`programmer`,`designer`,`fee`,`date`)values('$uid','$company','$business','$customer','$qdate','$xdate','$qmoney','$smoney','$type','$workload','$programmer','$designer','$fee','$date')");
		}	
	};
	mysql_close($con);
	
}

?>
