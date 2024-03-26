<?php
$n-$_POST['firstname'];

$c=$_POST['secondname'];

$d=$_POST['pass'];

$e=$_POST['age'];

$f=$_POST['gender'];

$con-new mysqli("localhost","root","", "pooja");

if($con->connect_error){
    die('connection failed' : '.$con->connect_error');
}
else{
    $stmt=$conn->prepare("insert into registration(n,c,d,e,f) 
           values(?,?,?,?,?,?)");
    $stmt->bind_param("sssis",$n,$c,$d,$e,$f);
    $stmt->execute();
    echo "registration successfully....";
    $stmt->close();
    $con->close();
}