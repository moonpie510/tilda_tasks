<?php

/**
 * Задача 2: массивы.
 *
 * Нужно заполнить массив 5 на 7 случайными уникальными числами от 1 до 1000.
 * Вывести получившийся массив и суммы по строкам и по столбцам.
 */

$rows = 5;
$columns = 7;
$totalNumbers = $rows * $columns;
$uniqueNumbers = [];
$hash = []; // Хэш для проверки уникальности чисел
$numberCounter = 0;

// Заполняем массив уникальными числами
while ($numberCounter < $totalNumbers) {
    $number = random_int(1, 1000);

    if (!isset($hash[$number])) {
        $hash[$number] = $number;
        $uniqueNumbers[] = $number;
        $numberCounter++;
    }
}

unset($hash);

// Заполняем матрицу 5 на 7 и считаем ее суммы
$matrix = [];
$index = 0;
$rowSums = []; // Суммы по строкам
$columnSums = []; // Суммы по столбцам

for ($row = 0; $row < $rows; $row++) {
    $rowSum = 0;

    for ($column = 0; $column < $columns; $column++) {
        $rowSum += $uniqueNumbers[$index];
        $columnSums[$column] = $columnSums[$column] ?? 0;
        $columnSums[$column] += $uniqueNumbers[$index];
        $matrix[$row][$column] = $uniqueNumbers[$index++];
    }

    $rowSums[] = $rowSum;
}

// Выводим матрицу и суммы
for ($row = 0; $row < $rows; $row++) {
    for ($column = 0; $column < $columns; $column++) {
        echo $matrix[$row][$column] . ' ';
    }

    echo "| $rowSums[$row]\n";
}

echo "\n -------------------------------------- \n";
for ($column = 0; $column < $columns; $column++) {
    echo $columnSums[$column] . ' ';
}

echo "\n";