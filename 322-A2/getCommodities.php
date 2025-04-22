<?php

include 'connectdb.php'; // Include the PDO connection

// SQL query to get all events and thier id
$sql = "SELECT * FROM commodities"; // SQL query to get all events
$result = $con->query($sql);

$commoditiesList = []; // Store results in an array
while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    $commoditiesList[] = $row; // Add each row to the array
}

// Send JSON response
header('Content-Type: application/json');
echo json_encode($commoditiesList);
?>