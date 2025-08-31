<?php

/**
 * Задача 1: лесенка.
 *
 * Нужно вывести лесенкой числа от 1 до 100.
 * 1
 * 2 3
 * 4 5 6
 * ...
 */

$currentNumber = 1;
$endNumber = 100;
echo "\n";

for ($row = 1; $currentNumber <= $endNumber; $row++) {
    for ($column = 1; $column <= $row && $currentNumber <= $endNumber; $column++) {
        if ($column === $row || $currentNumber === $endNumber) {
            echo $currentNumber++;
        } else {
            echo $currentNumber++ . ' ';
        }
    }

    echo "\n";
}