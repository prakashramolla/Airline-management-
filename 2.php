<?php
  if(isset($_POST['sendEmail'])) {
    $privateKey = "6Lc-nSUjAAAAAN5ovTTM81PLrdFvHuDOV1olMGXv";
    $response = $_POST['g-recaptcha-response'];
    $remoteip = $_SERVER['REMOTE_ADDR'];
    $url = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$privateKey&response=$response&remoteip=$remoteip");

    $result = json_decode($url, true);

echo "hello";
  

?>