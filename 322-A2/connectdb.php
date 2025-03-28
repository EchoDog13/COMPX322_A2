<?php
// Establish's a connection the the PHP server - used by other PHP scripts to avoid connection repetition
try {
    $con = new PDO('mysql:host=learn-mysql.cms.waikato.ac.nz;dbname=kb477', 'kb477', 'my413052sql');
} catch (PDOException $e) {
    echo "Database connection error " . $e->getMessage();
}

