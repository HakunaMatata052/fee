<?php
header("Content-type: text/html; charset=utf-8");
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers:Authorization');
header("Access-Control-Allow-Methods: GET, POST, DELETE");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With, Cache-Control,Authorization");

//连接数据库
$action = $_GET['action'];
if($action=="get"){
	$con=mysql_connect("localhost","root","root");// or die('Error:'.mysql_error());
	if(!$con){
		die("连接失败!".mysql_errno());
	}else{
		$time = $_GET['date'];
		$customer = $_GET['customer'];
		$mm = $_GET['mm'];
		if($mm=='lq9588'){
			$name = '李强';
		}elseif($mm=='gyl'){
			$name = '郭玉兰';
		}elseif($mm=='3.3'){
			$name = '马利丽';
		}elseif($mm=='石婧'){
			$name = '411323';
		}elseif($mm=='fengyanru123'){
			$name = '冯燕';
		}elseif($mm=='950410'){
			$name = '王卓';
		}else{
			$name = '王八蛋';
		};
		$customer = rawurldecode($customer); //中文
		mysql_select_db("ludan",$con);
		if($mm=='hakunamatata'){
			$result=mysql_query("select * from ludan WHERE date Like '%$time%' && fee != ''  && customer like '%$customer%'");
		}else {
			$result=mysql_query("select * from ludan WHERE fee like '%$name%' && complete != 1  && customer like '%$customer%'");
		}
		
		$res['code'] = 0;
		$res['msg'] = '成功';
		$res['data'] = array();
		while($row=mysql_fetch_array($result)){
			$fileinfo['uid'] = $row["uid"];						
			$fileinfo['fee'] = $row["fee"];
			$fileinfo['company'] = $row["company"];			
			$fileinfo['programmer'] = $row["designer"].'/'.$row["programmer"];
			$fileinfo['business'] = $row["business"];
			$fileinfo['customer'] = $row["customer"];
			$fileinfo['qdate'] = $row["qdate"];
			$fileinfo['xdate'] = $row["xdate"];
			$fileinfo['qmoney'] = $row["qmoney"];
			$fileinfo['smoney'] = $row["smoney"];
			$fileinfo['caiwu'] = '';
			$fileinfo['type'] = $row["type"];
			$fileinfo['workload'] = $row["workload"];
			$fileinfo['complete'] = $row["complete"];
			$fileinfo['date'] = $row["date"];
			array_push($res['data'], $fileinfo);
		}
		echo json_encode($res);
		mysql_close($con);
		
	}
}else{
	echo '你想干什么？';
}
