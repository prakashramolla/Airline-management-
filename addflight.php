<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title></title>
</head>
<body>
	<?php

$servername = "localhost";
$username = "root";
$password = "kspl@1234";
$db="airport";

//
$conn = new mysqli($servername, $username, $password, $db);


if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
else{

if(isset($_POST['submit'])){
$fname = $_POST['fname'];
$source = $_POST['source'];
$destination= $_POST['destination'];
$price = $_POST['price'];
$check=$_POST['chk'];

$ch=$check;
$ch=implode(',',$ch);

$sql = "INSERT INTO fdetails (fname,source,destination,price,totalseats)
VALUES ('$fname','$source','$destination','$price','$ch')";




if ($conn->query($sql) === TRUE) {
  echo " insertion successfull";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}


// for ($i=0; $i <sizeof($check) ; $i++) { 
// 	$sql = "INSERT INTO fdetails (fname,source,destination,price,totalseats)
// VALUES ('$fname','$source','$destination','$price','$check[$i]')";
// if ($conn->query($sql) === TRUE) {
//   echo " insertion successfull";
// } else {
//   echo "Error: " . $sql . "<br>" . $conn->error;
// }
// }


}
}
include("flightdetails.php");
$conn->close();
?>

</body>
</html>