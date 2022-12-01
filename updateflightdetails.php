<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title></title>
  <style type="text/css">
h2{text-align: center;
  align-items: center;
  align-content: center;
  font-size: 50px;
  margin-top: 400px;
  color: purple;

}
  </style>

</head>
<body>
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
  
  $id=$_POST['id'];
  
$fname = $_POST['fname'];
$source = $_POST['source'];
$destination = $_POST['destination'];
$price = $_POST['price'];

$sql = "UPDATE fdetails SET fname='$fname', source='$source',destination='$destination',price='$price' WHERE id='$id'";


if ($conn->query($sql) === TRUE) {
  // echo "<h2>Record updated successfully</h2>";
} else {
  echo "Error updating record: " . $conn->error;

}
}
include("flightdetails.php");

$conn->close();
?>

</body>
</html>