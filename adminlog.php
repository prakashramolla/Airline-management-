<?php
$servername = "localhost";
$username = "root";
$password = "kspl@1234";
$db="airport";

// Create connection
$conn = new mysqli($servername, $username, $password, $db);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}


if(isset($_POST['submit'])){
$email = $_POST['email'];

$password = $_POST['password'];


$sql = "SELECT * FROM admin WHERE email='".$email."' AND password='".$password."'";

$result= $conn->query($sql);

$row=mysqli_fetch_array($result);

if ($row != null) {
  header('location:admindashbord.html');
}
}


$conn->close();
?>
