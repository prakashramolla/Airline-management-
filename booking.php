<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>booking</title>
   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
       <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous"></script>

	<style type="text/css">
	.multiselect {
  width: 200px;
}

.selectBox {
  position: relative;
}

.selectBox select {
  width: 100%;
  font-weight: bold;
}

.overSelect {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

#checkboxes {
  display: none;
  border: 1px #dadada solid;
}

#checkboxes label {
  display: block;
}

#checkboxes label:hover {
  background-color: #1e90ff;
}

/*       form css*/  
#form{
font-size: 20px;
margin-left: 100px;
padding-top: 50px;

} 
input[type=text],[type=date]{
font-size: 20px;
width: 150px;
height: 25px;}

#flight{font-size: 20px;
width: 150px;
height: 25px;
}
input{
border: 5px sold skyblue;}
.text{
width: 500px;
height: 550px;
border: 3px solid black;
border-radius: 20px;
margin-left: 300px;
margin-top: 150px;
background-color: white;}
h3{
color: purple;}


</style>
</head>
<body>
  <div class="row">
  <div class="col-6">
 

	<div class="text">
	<form id="form" name="form" action="" method="post"> 


    <?php
$mysqli = new mysqli("localhost", "root", "kspl@1234", "airport") or die($this->mysqli->error);
$query= $mysqli->query("SELECT fname from fdetails");


?> 
<select name="selected_pcid" id='selected_pcid'>
            <?php 
             while ($rows = $query->fetch_array(MYSQLI_ASSOC)) {
                        $value= $rows['fname'];
                ?>
                 <option value="<?= $value?>"><?= $value?></option>
                <?php } ?>
             </select><br><br>


 

<?php
if($value) {
  
    $query= $mysqli->query("SELECT source,destination FROM fdetails WHERE fname = '$fname'");

    $result = mysqli_fetch_array($query,MYSQLI_ASSOC);
    echo $result;
    
  
}
?>
<label>FROM</label>
      <input type="text" name="source" id="from"><br><br>
      <label>TO</label>
      <input type="text" name="destination" id="to"><br><br>
      <label>Date</label>
      <input type="date" name="date" id="date"><br><br>

      
  <label>Adult</label>
  <input type="number" name="adult" id="adult" min="1" max="10">
  <label>Children</label>
  <input type="number" name="children" id="Children" min="1" max="10"><br><br>

  Select seat:<select name="seat"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option>
    <option value="5">5</option>

<option value="6">6</option>

<option value="7">7</option>

<option value="8">8</option>

<option value="9">9</option>
<option value="10">10</option>

  </select><br>
 
  

  
  <input type="submit" name="submit">
      



  </form>
</div>

</div>
 <div class="col-6"> 
  <img src="4873.jpg" width="700px" height="650px">

 </div>
</div>



		
</form>


 <script>
$(document).ready(function(){
    $('fname').on('change',function(){
        var fname = $('select[name=fname]').val();
        $.ajax({
            url : "check.php",
            dataType: 'json',
            type: 'POST',
            async : false,
            data : { fname:fname,source:source,destination:destination},
            success : function(data) {
                userData = json.parse(data);
                $('#source').val(userData.source);
               
            }
        }); 
    });
});
</script>
  
</body>
</html>