<?php

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");
// audio/wav
$result = new stdClass();
$game_id = $_GET["game-id"];
$pathname = "../test-data/" . $game_id . ".ts";

$result->pathname = $pathname;

if (file_exists($pathname)) {
    unlink($pathname);
}

$data = file_get_contents('php://input');
$data = json_decode($data);
$contents = json_encode($data, JSON_PRETTY_PRINT);
$contents = "export const game = $contents";
if (strlen($contents) === 0) {
    $result->error = "No data received";
    echo json_encode($result);

    return;
}

file_put_contents($pathname, $contents);

echo json_encode($result);
