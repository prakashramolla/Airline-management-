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

$sql = "SELECT * FROM book WHERE fname='Air India'";

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
  <!-- <a href="addflight.html" class="btn btn-primary" style="margin-left: 1400px; margin-top: 100px; border: 1px solid darkblue; color: white; background-color: purple;">Add Flight details</a> -->
  
  <table class="table table-bordered container" style="color: darkblue; border: 2px solid blue;margin-top: 50px;">
    <thead>
<tr>
  <th>  </th>

  <th> fname</th>
  <th> source</th>
  <th> destination</th>
  <th> price</th>
  <th>Date</th>
  <th> Customer Name</th>
  <th>email</th>
  <th>phone number</th>
  <th>seat number</th>
  
  
</tr>
</thead>
<tbody>
  <?php
  if ($result->num_rows > 0) {
   while($row = $result->fetch_assoc()) { 
  ?>
<tr>
  <td> <i class="fa-solid fa-plane"></i></td>
  <td><?php echo $row["fname"] ?></td>
  <td><?php echo $row["source"] ?></td>
  <td><?php echo $row["destination"]?></td>
  <td><?php echo $row["price"]?></td>
  <!--  <td><a href="edit.php?id=<?php echo htmlentities ($row['id']);?>"><i class="fa fa-edit"></a></td> -->
      <td><?php echo $row["date"] ?></td>
       <td><?php echo $row["name"] ?></td>
      <td><?php echo $row["email"] ?></td>
        <td><?php echo $row["phone"] ?></td>
        <td><?php echo $row["checkbox"] ?></td>
  </tr>

  <?php
}
}
  ?>
  </tbody>
  </table>
  

</body>
</html>