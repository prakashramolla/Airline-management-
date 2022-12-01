<html>  
<head>  
<title> PHP Form<</title> 
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script> 
</head>  
<body bgcolor="pink">  
<h3>Insert Value From Checkboxes</h3>  
 <div class="test" id="test">
<input type="checkbox" name="chkl[ ]" value="A1">a1<br />  
<input type="checkbox" name="chkl[ ]" value="Ravi Sharma">Ravi Sharma<br />  
<input type="checkbox" name="chkl[ ]" value="Rahul Dube">Rahul Dube<br />  
<input type="checkbox" name="chkl[ ]" value="Rajesh Verma">Rajesh Verma<br />  
<input type="checkbox" name="chkl[ ]" value="Priyanka Sachan"> Priyanka Sachan<br /> 
</div> 
<br>  
<input type="submit" name="Submit" value="Submit">  

</body> 
<script type="text/javascript">
$(document).ready(function(){
$("h3").click(function(){
	$("#test").hide();
});

});

</script>

</html>  
