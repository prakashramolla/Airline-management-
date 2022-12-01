<?php
        $email;$comment;$captcha;
        if(isset($_POST['email'])){
          $email=$_POST['email'];
        }
        if(isset($_POST['comment'])){
          $comment=$_POST['comment'];
        }
        if(isset($_POST['g-recaptcha-response'])){
          $captcha=$_POST['g-recaptcha-response'];
        }
        if(!$captcha){
          echo '
<script> alert("please check the capcha")</script>
';
          exit;
        }
        $secretKey = "6Lf83yUjAAAAAE-C4ifgff5YNHVIEEtsgGUs7jZV";
        $ip = $_SERVER['REMOTE_ADDR'];
        // post request to server
        $url = 'https://www.google.com/recaptcha/api/siteverify?secret=' . urlencode($secretKey) .  '&response=' . urlencode($captcha);
        $response = file_get_contents($url);
        $responseKeys = json_decode($response,true);
        // should return JSON with success as true
        if($responseKeys["success"]) {
                echo '
<center><h2 style="color:green">Thanks for posting comment<h2><center>
';
        } else {
                echo '
You are spammer ! Get the @$%K out
';
        }
?>