
<?php
// database connection code
// $con = mysqli_connect('localhost', 'database_user', 'database_password','database');

$con = mysqli_connect('localhost', 'root', '','autoomakanta');



$txtFirstName = filter_input(INPUT_POST, 'txtFirstName');
$txtLastName =filter_input(INPUT_POST, 'txtLastName');
$txtEmail = filter_input(INPUT_POST, 'txtEmail');
$txtPhone = filter_input(INPUT_POST, 'txtPhone');
$txtModel = filter_input(INPUT_POST, 'txtModel');
$txtMaker = filter_input(INPUT_POST, 'txtMaker');
$txtmeter = filter_input(INPUT_POST, 'txtMeter');
$date = date("Y-m-d");

// database insert SQL code
$sql = "INSERT INTO `customer` (`FirstName`, `LastName`, `Email`, `Phone`) 
VALUES ('$txtFirstName', '$txtLastName', '$txtEmail', '$txtPhone')";



// insert in database 
$rs1 = mysqli_query($con, $sql);

if ($rs1) {
    // Get the CustomerID of the inserted row
    $customerID = mysqli_insert_id($con);
    // Insert data into car table with CustomerID as foreign key
    $sql2 = "INSERT INTO `car` (`customer_id`, `model`, `make`, `odometer`) 
    VALUES ('$customerID', '$txtModel', '$txtMaker', '$txtmeter')";
    $rs2 = mysqli_query($con, $sql2);
    if ($rs2){
    $carID = mysqli_insert_id($con);
    // Insert data into repairjob table with CustomerID as foreign key
    $sql3 = "INSERT INTO `service` (`Car_id`, `date`) 
    VALUES ('$carID', '$date')";
    $rs3 = mysqli_query($con, $sql3);
    }
    if ($rs2 && $rs3) {
      // Success, data inserted into all tables
        echo " repair booked succesfully. returning to home page...";
        header("refresh:3;url=index.html");
        } else {
        // Error inserting data into car or repairjob table
        echo " error while booking :( ";
        header("refresh:3;url=index.html");
        }
    }
    mysqli_close($con);
?>