<?php
$servername="localhosts";
$username="root";
$password="kspl@1234";
$db="airport";

$conn=new mysqli($servername,$username,$password,$db);
if($conn->connect_error){
echo "connection failed";}
else{

if(isset($_POST['submit'])){
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$password = $_POST['password'];


$sql = "INSERT INTO customers (name,email,phone,password)
VALUES ('$name', '$email', '$phone', '$password')";

if ($conn->query($sql) === TRUE) {
  echo "<p> Registration sucessfully completed </p>";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}
}
}
include("customerlog.html");
$conn->close();
?>