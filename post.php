<?php
if(isset($_POST["submit"]))
{
    echo $email= $_POST["email"];
    echo $password= $_POST["password"];

    if(isset($_POST["g-recaptcha-response"]))
    {
        $recaptcha= $_POST["g-recaptcha-response"]:

        if(!recaptcha)
        {
            echo "<script> alert("please go back check recaptcha")</script>";
            exit;
        }

     else {
        $secret="6Lc-nSUjAAAAAN5ovTTM81PLrdFvHuDOV1olMGXv";
        $url=' https://www.google.com/recaptcha/api/siteverify?secret='.secret.'&response='.$recaptcha;
        $response=file_get_contrents($url);
        $responseKeys=json_decode($response,true);

        print_r($responseKeys);
        
      }    
    }
}

?>