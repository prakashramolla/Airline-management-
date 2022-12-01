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

$sql = "SELECT * FROM book WHERE fname='Air india'";

$result = $conn->query($sql);


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

  <script src="https://kit.fontawesome.com/f8125a8314.js" crossorigin="anonymous"></script>
  <!-- -----------------jquery cdn link----------------- -->

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

<!-- ------------------------google fonts---------------------- -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Trirong">
  <title></title>
  <style type="text/css">
    .fa{
      font-size: 40px;
      }
    
  </style>
    
</head>
<body>
  <div class="ticket">
    <div class="head">
     
      <h3> <i class="fa-solid fa-plane"></i>Flight Ticket</h3>
    </div>
    <!-- name:<input type="text" name="name" value="">
    Date:<input type="text" name="date" value=""><br>
    Source:<input type="text" name="source" value="">
    Destination:<input type="text" name="desination" value=""><br>

 -->


  
  <?php
  if ($result->num_rows > 0) {
   while($row = $result->fetch_assoc()) { 
  ?>
   <h4 class="fname"> Name: <?= $row['fname'] ?></h4>
   <h4 class="fname"> Date: <?= $row['date'] ?></h4>
   <h4 class="fname"> Source: <?= $row['source'] ?></h4>
   <h4 class="fname"> Destination: <?= $row['destination'] ?></h4>
   <h4 class="fname"> Name: <?= $row['name'] ?></h4>
   <h4 class="fname"> Email:<?= $row['email'] ?></h4>
   <h4 class="fname">Phone number:<?= $row['phone'] ?></h4>
   <h4 class="fname"> Seat Number:<?= $row['checkbox'] ?></h4>


  <?php
}
}
  ?>
  
</div>
</body>
</html>