<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Recaptcha Example</title>
</head>

<body>
<br>
<br>
<form action="2.php" method="post">
  <div class="form-row">
  <input name="name_1" placeholder="Your name" type="text">
  </div>

  <br>

  <div class="form-row">
  <input name="surname_1" placeholder="Your surname" type="text">
  </div>

  <br>

  <div class="form-row">
    <div class="g-recaptcha" data-sitekey="6Lc-nSUjAAAAAG9xhTrvP3yq1TRTJzIyDFVsq9ts"></div>
  </div>

  <br>

  <input name="sendEmail" type="submit" value="Call me back">

  <br>

  <h4 id="response"></h4>
  </form>

    
  <script src='https://www.google.com/recaptcha/api.js'></script>

    <script>

function get_action(form) 
{
    var v = grecaptcha.getResponse();
    if(v.length == 0)
    {
        document.getElementById('captcha').innerHTML="You can't leave Captcha Code empty";
        return false;
    }
    else
    {
         document.getElementById('captcha').innerHTML="Captcha completed";
        return true; 
    }
}

</script>

</body>
</html>