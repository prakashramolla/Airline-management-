<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Customerlog</title>
	<!-- CSS only -->

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">

<!-- JavaScript Bundle with Popper -->

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous"></script>

<!-- -----------------jquery cdn link----------------- -->

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

<!-- ------------------------google fonts---------------------- -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Trirong">

<style type="text/css">
	.register{
	       margin: 200px;
	   }
	h3{
		color: purple;}

</style>


</head>
<body>

	<div class="register">
		<div class="row">
			<div class="col-md-6">
				<img src="31202.jpg" width="600px" height="600px">

			</div>

			<div class="col-md-6">
				<h3>Add Flight Details</h3>
				
				<form id="form" name="prakash" onsubmit="return validateForm()" action="updateflightdetails.php" method="post">
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
$id=$_GET['id'];
 $ret=mysqli_query($conn,"select * from fdetails where id='".$id."'");
 $row=mysqli_fetch_array($ret);

?> <input type="text" name="id" id="id" value="<?php  echo $row['id'];?>" hidden>
    
					 <div class="mb-3 mt-3">
                          <label for="flightname" class="form-label">Flight Name:</label>
                            <input type="text" class="form-control" id="fname" value="<?php  echo $row['fname'];?>"placeholder="Enter Flight name" name="fname">
                       </div>

                      <div class="mb-3 mt-3">
                           <label for="source" class="form-label">Source:</label>
                            <input type="text" class="form-control" id="source" value="<?php  echo $row['source'];?>"placeholder="Enter source" name="source">
                       </div>
                        <div class="mb-3 mt-3">
                           <label for="destination" class="form-label">Destination:</label>
                            <input type="text" class="form-control" id="destination" value="<?php  echo $row['destination'];?>"placeholder="Enter Destination" name="destination">
                       </div>
                     <div class="mb-3">
                           <label for="price" class="form-label">Price:</label>
                           <input type="text" class="form-control" id="price"  value="<?php  echo $row['price'];?>"placeholder="Enter price" name="price">
                      </div>
                      
                     
                            
                  <input type="submit" name="submit" id="submit" class="btn btn-primary">
               </form>

			</div>

		</div>
	</div>
	<script type="text/javascript">
function validateForm() {
  let a = document.forms["prakash"]["fname"].value;
  if (a == "") {
    alert("Flight Name must be filled out");
    return false;
  }
  let  b= document.forms["prakash"]["source"].value;
  if (b == "") {
    alert("source must be filled out");
    return false;
  }
  let c = document.forms["prakash"]["destination"].value;
  if (c == "") {
    alert("Destination must be filled out");
    return false;
  }
  let x = document.forms["prakash"]["price"].value;
  if (x == "") {
    alert("price must be filled out");
    return false;
  }
}
  </script>

</body>
</html>