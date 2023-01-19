<?php

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");
// audio/wav
$result = new stdClass();
$game_id = $_GET["game-id"];
$pathname = "./scripts/test-data/" . $game_id . ".json";

echo $pathname;
$result->pathname = $pathname;

if (file_exists($pathname)) {
    unlink($pathname);
}

$data = file_get_contents('php://input');
$data = json_decode($data);
$contents = json_encode($data, JSON_PRETTY_PRINT);

if (strlen($contents) === 0) {
    return;
}

file_put_contents($pathname, $contents);

echo json_encode($result);
