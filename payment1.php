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
$date=$_POST['date'];

$name=$_POST['name'];

$email=$_POST['email'];
$phone=$_POST['phone'];
$checkbox=$_POST['chkl'];
// print_r($checkbox);
// exit();
$ch=$checkbox;

$ch=implode(',',$ch);





$sql = "INSERT INTO book (fname,source,destination,price,date,name,email,phone,checkbox)
VALUES ('$fname','$source','$destination','$price','$date','$name','$email','$phone','$ch')";
$sql2="select * from book";

if ($conn->query($sql) === TRUE) {
  echo "<h2>Flight booking is successfull</h2>";
} else{
  echo"Error inserting record: " . $conn->error;

}

}

//$conn->close();
?>

      
        
<?php

$id=$_POST['id'];
 $ret=mysqli_query($conn,"select * from fdetails where id='".$id."'");
 $row=mysqli_fetch_array($ret);
// var_dump($ret);
// while ($row=mysqli_fetch_array($ret)) {
?> 
                        
                     <?php
                     
                     $new=$row['totalseats'];
                    if(sizeof($new)){
                       $hi = explode(",", $new);
                       // print_r($hi);
                       // exit();
                    }
                    $i=0;
                    foreach($hi as $key){
                      if (in_array($key,$checkbox)) {
                        unset($hi[$i]);
                      
                       $b=$hi;
                       } 
                        $i=$i+1;
            
                      
                    }

                    $hi=implode(',',$hi);

          $sql="UPDATE fdetails SET totalseats='$hi'WHERE id='".$id."'";
          

          if ($conn->query($sql) === TRUE) {
      
         }    
          else {
                 echo "Error updating record: " . $conn->error;

               }

                    


                     ?>
                    
                            
                
               

