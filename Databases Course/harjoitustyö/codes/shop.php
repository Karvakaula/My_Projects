<?php
// database connection code
$con = mysqli_connect('localhost', 'root', '', 'autoomakanta');

session_start();

// check if the cart is empty and initialize it
if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = array();
}

// check if a product has been added to the cart
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['productId'])) {
    // add product id to cart
    $Name = $_POST['itemName'];
    $Cost = $_POST['itemprice'];
    $item = array(
        'name' => $Name,
        'price' => $Cost,
    );
array_push($_SESSION['cart'], $item);
echo "<p>Product added to cart. $Name</p>";
}

// retrieve records from item table
$sql = "SELECT * FROM `list_items` ORDER BY `price`";
$result = mysqli_query($con, $sql);
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" href="style.css">
<title>Shop</title>

</head>

<body>
<nav>
    <ul>
        <li><a href="index.html">home</a></li>
        <li><a href="#">Shop</a></li>
        <li><a href="cart.php">Cart</a></li>

    </ul>
</nav>
<section id="frontpage-shop">
    <div id ="header">
    <h1>Shop</h1>
    <p>you may order stuff here</p>
    </div>

    
</section>

<section id="shopitems">


    
        
        <?php
        // check if query executed successfully
        if ($result) {
            // loop through each row in the result set
            while ($row = mysqli_fetch_assoc($result)) {
                // access the columns in the current row
                $itemId = $row['id'];
                $itemName = $row['name'];
                $itemCost = $row['price'];
               // $itemDescription = $row['ItemDescription'];
                // display the retrieved data in HTML table rows
                
                echo "<div class='item'>";
                echo "<ul>";
                echo "<li>" . $itemName . "</li>";
                echo "<li>" . $itemCost ."€". "</li>";
                echo "</ul>";
                echo "<form method='POST'>";
                echo "<input type='hidden' name='productId' value='$itemId'>";
                echo "<input type='hidden' name='itemprice' value='$itemCost'>";
                echo "<input type='hidden' name='itemName' value='$itemName'>";
                echo "<button type='submit'>Add to cart</button>";
                echo "</form>";
                echo "</div>";
              
                
            }
        } else {
            echo "<tr><td colspan='3'>Error retrieving records: " . mysqli_error($con) . "</td></tr>";
        }
        ?>
    
    


</section>
<script src="script.js"></script>
</body>
</html>

