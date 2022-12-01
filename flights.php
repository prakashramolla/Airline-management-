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
}else{
if(isset($_POST['submit'])){
  
  $fname=$_POST['fname'];
  $source=$_POST['source'];
  $destination=$_POST['destination'];
  $date=$_POST['date'];
  $adults=$_POST['adults'];
  $children=$_POST['children'];


$sql = "SELECT * FROM fdetails WHERE source='$source'AND destination='$destination'";
$result = $conn->query($sql);
$row = mysqli_fetch_all($result,MYSQLI_ASSOC);

$sql2= 
"INSERT INTO `details`(`source`, `destination`, `date`, `adults`, `children`) VALUES ('$source','$destination','$date','$adults','$children')";


if ($conn->query($sql2) === TRUE) {
  echo " insertion successfull";
} else {
  echo "Error: " . $sql2 . "<br>" . $conn->error;
}
}
}
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- ---------------boostrap styles-------------- -->

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

  <!-- ---------------------boostrap script----------------- -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
<!-- ----------------------fonts/icons---------------------- -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <!-- -----------------jquery cdn link----------------- -->

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

<!-- ------------------------google fonts---------------------- -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Trirong">
  <title></title>
  <style type="text/css">
    .fa{
      font-size: 40px;
      }
      .details{
        margin-top: 200px;
        align-items: center;
        align-content: center;
        text-align: center;
      }

      tr,th{
        align-content: center;
        align-items: center;
        text-align: center;} 

  </style>
    
</head>
<body> 
  <table class="table container" style="margin-top: 100px;">
    
<tbody class="details">
 <?php foreach ($row as $key) {
    
  ?>
<tr>

  <td><img src="31202.jpg" width="200px" height="200px"></td>
  
  <td>Flight name :</td>
 
  <td><?php echo $key["fname"]; ?></td>
  <td>Source</td>
  <td> :</td>
  <td><?php echo $key["source"] ?></td>
  <td><i class="fa-solid fa-right-left"></i></td>
  <td>Destination</td>
  <td>:</td>
  <td><?php echo $key["destination"]?></td>
  <td>Price</td>
  <td>:</td>
  <td><?php echo $key["price"]?></td>
  <td><a a href="customerform.php?id=<?php echo htmlentities ($key['id']);?>" class="btn btn-info" role="button">Book Ticket</a></td>
  
    
  </tr>

  <?php 
  }

    ?>
  </tbody>
  </table>
  

</body>
</html>