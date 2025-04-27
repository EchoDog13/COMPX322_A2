<?php

include 'connectdb.php'; // Include the PDO connection

// SQL query to get all commodities and all their other fields
$sql = "SELECT * FROM commodities"; // 
$result = $con->query($sql);

$commoditiesList = []; // Store results in an array
while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    $commoditiesList[] = $row; // Add each row to the array
}

// Send JSON response
header('Content-Type: application/json');
echo json_encode($commoditiesList);
?>