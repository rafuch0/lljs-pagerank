<?php

function fch($csm)
{
    if($csm < 0)
        $csm += 4294967296.0;
 
    $a = (int)fmod($csm, 10);
    $t = 1;
    $b = (int)($csm / 10);
    while($b) {
        $c = $b % 10;
        if($t)
            $c = (int)($c / 5) + ($c * 2) % 10;
        $b = (int)($b / 10);
        $a += $c;
        $t ^= 1;
    }
     
    $a = 10 - $a % 10;
    if($a == 10)
        return ord('0');
     
    if($t)
        return ord('0') + (int)(($a & 1 ? $a + 9 : $a) / 2);
 
    return ord('0') + $a;
}
 
function checksum($str)
{
    if(strlen($str) == 0)
        return 0x1000;
         
    /* the floating point hacks are due to PHP's bugs when handling integers */
 
    $a = 5381.0;
    for($i = 0; $i < strlen($str); $i++)
        $a = fmod($a + ($a * 32) + ord($str[$i]), 4294967296.0);
    if($a > 2147483647.0)
        $a -= 4294967296.0;
    $a = (int)$a;
 
    $b = 0.0;
    for($i = 0; $i < strlen($str); $i++)
        $b = fmod(($b * 64) + ($b * 65536) - $b + ord($str[$i]), 4294967296.0);
    if($b > 2147483647.0)
        $b -= 4294967296.0;
    $b = (int)$b;
     
    $a = (($a >> 6) & 0x3ffffc0) | (($a >> 2) & 0x3f);
    $c = (($a >> 4) & 0x3ffc00) | ($a & 0x3ff);
    $d = (($c >> 4) & 0x3c000) | ($c & 0x3fff);
    $c = ((($d & 0x3c0) << 4) | ($d & 0x3c)) << 2;
    $a = $b & 0x0f0f;
    $e = $b & 0x0f0f0000;
    $b = (($d & 0xffffc000) << 4) | ($d & 0x3c00);
 
    return ($b << 10) | $c | $a | $e;
}
 
$PR_SERVER = "http://toolbarqueries.google.com/tbr?client=navclient-auto&features=Rank&q=info:";
 
$page = "http://en.wikipedia.org/wiki/Cypherpunk";
$csm = checksum($page);
printf($PR_SERVER . "%s&ch=7%c%u\n", $page, fch($csm), $csm);
 
?>
