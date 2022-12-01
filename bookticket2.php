
      
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
				<h3>Booking Information</h3>
				
				<form id="form" name="prakash" onsubmit="return validateForm()" action="admin.php" method="post">


					 <div class="mb-3 mt-3">
                           <label for="name" class="form-label">User Name:</label>
                            <input type="text" class="form-control" id="name" placeholder="Enter Username" name="name">
                       </div>

                      <div class="mb-3 mt-3">
                           <label for="email" class="form-label">Email:</label>
                            <input type="email" class="form-control" id="email" placeholder="Enter email" name="email">
                       </div>
                        <div class="mb-3 mt-3">
                           <label for="phone" class="form-label">Phone Number:</label>
                            <input type="text" class="form-control" id="phone" placeholder="Enter Phone number" name="phone">
                       </div>
                       <div class="mb-3 mt-3">
                       <input type="radio" id="male" name="fav_language" value="male">
                       <label for="male">Male</label><br>
                       <input type="radio" id="female" name="fav_language" value="female">
                       <label for="female">Female</label><br>
                       <input type="radio" id="other" name="fav_language" value="other">  
                        <label for="other">Other</label>
                </div>
                     <div class="mb-3">
                         <?php 

                         ?> 
                      </div>
                      
                            
                      <input type="submit" name="submit" id="submit" class="btn btn-primary">
               </form>

			</div>

		</div>
	</div>
	<script>
    function validateForm() {
  let a = document.forms["prakash"]["name"].value;
  if (a == "") {
    alert("Name must be filled out");
    return false;
  }
  let  b= document.forms["prakash"]["email"].value;
  if (b == "") {
    alert("Email must be filled out");
    return false;
  }
  let c = document.forms["prakash"]["phone"].value;
  if (c == "") {
    alert("phone must be filled out");
    return false;
  }
  let x = document.forms["prakash"]["seatno"].value;
  if (x == "") {
    alert("Seat number must be filled out");
    return false;
  }
}


</script>
</body>
</html>