
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Bootstrap Example</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
  <script src='https://www.google.com/recaptcha/api.js' async defer></script>

</head>
<body>
<div class="container">
<h1>Google Recapcha Demo</h1>
  <form action="p2.php" method="post">
    <div class="form-group">
      <label for="email">Email:</label>
      <input type="email" class="form-control" id="email" placeholder="Enter email" name="email">
    </div>
    <div class="form-group">
      <label for="comment">Message:</label>
      <textarea name="comment" rows="8" cols="39" class="form-control" id="comment"></textarea>
    </div>
    <div class="g-recaptcha" data-sitekey="6Lf83yUjAAAAAAgQa13XrKgB8mwlLSn4Z7y005wy"></div>
    <div class="form-group">
    <input type="submit" name="submit" value="Post comment">
</div>
    
  </form>
</div>

</body>
</html>
