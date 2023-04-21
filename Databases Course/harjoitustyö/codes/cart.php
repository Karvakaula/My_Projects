<?php
session_start();

// if cart is not initialized, create an empty array
if(!isset($_SESSION['cart'])){
    $_SESSION['cart'] = array();
}

// if an item is added to cart, add it to the cart array
if(isset($_POST['addItem'])){
    $item = array(
        'name' => $_POST['itemName'],
        'price' => $_POST['itemprice'],
    );
    
    array_push($_SESSION['cart'], $item);
}

?>

<!DOCTYPE html>
<html>
<head>
	<title>Cart</title>
</head>
<body>
	<h1>Shopping Cart</h1>
	<table>
		<tr>
			<th>Item Name</th>
			<th>Price</th>
		</tr>
		<?php
		$total = 0;
		// display all items in the cart
		foreach($_SESSION['cart'] as $item){
			echo "<tr>";
			echo "<td>" . $item['name'] . "</td>";
			echo "<td>" . $item['price'] . "</td>";
			echo "</tr>";
			$total += $item['price'];
		}
		?>
		<tr>
			<td>Total:</td>
			<td><?php echo $total; ?></td>
		</tr>
	</table>
	<a href="shop.php">Continue Shopping</a>
</body>
</html>
