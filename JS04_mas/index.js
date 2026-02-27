// Задание 1.
function generateRandomArray(count, n, m) {
  const array = [];
  const min = Math.min(n, m);
  const max = Math.max(n, m);
  const range = max - min + 1;
  
  for (let i = 0; i < count; i++) {
    array.push(Math.floor(Math.random() * range) + min);
  }
  
  return array;
}
console.log("Задача 1:");
console.log(generateRandomArray(100, 0, 100));    // от 0 до 100
console.log(generateRandomArray(50, 2, 5));       // от 2 до 5
console.log(generateRandomArray(70, 100, -5));    // от -5 до 100
console.log(generateRandomArray(42, -3, -10));    // от -10 до -3

// Задание 2.
function createAndShuffleArray(count) {
  const array = [];
  for (let i = 1; i <= count; i++) {
    array.push(i);
  }
  
  // Перемешивание массива (алгоритм Фишера-Йетса)
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  
  return array;
}
console.log("\nЗадача 2:");
console.log(createAndShuffleArray(5));  // [2,5,1,3,4] или подобное
console.log(createAndShuffleArray(7));  // [5,1,3,2,7,6,4] или подобное
console.log(createAndShuffleArray(3));  // [2,1,3] или подобное

// Задание 3.
function findElementIndex(array, n) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === n) {
      return i;  
    }
  }
  return -1;  
}

function printSearchResult(array, n) {
  const index = findElementIndex(array, n);
  
  if (index !== -1) {
    console.log(`Индекс элемента ${n}: ${index}`);
  } else {
    console.log(`Элемент ${n} не найден в массиве`);
  }
}
console.log("\nЗадача 3:");
printSearchResult([2, 5, 1, 3, 4], 3);    
printSearchResult([5, 1, 3, 2, 7, 6, 4], 1);  
printSearchResult([2, 1, 3], 7);          // Элемент 7 не найден в массиве

// Задание 4.
function mergeArrays(arr1, arr2) {
  const merged = [];
  const totalLength = arr1.length + arr2.length;
  
  for (let i = 0; i < totalLength; i++) {
    if (i < arr1.length) {
      // Берём элементы из первого массива
      merged.push(arr1[i]);
    } else {
      // Берём элементы из второго массива
      merged.push(arr2[i - arr1.length]);
    }
  }
  
  return merged;
}

// Исходные массивы
const arr1 = [2, 2, 17, 21, 45, 12, 54, 31, 53];
const arr2 = [12, 44, 23, 5];

// Объединение и вывод результата
console.log("\nЗадача 4:");
console.log(mergeArrays(arr1, arr2));
const testArr1 = [1, 2, 3];
const testArr2 = [4, 5, 6, 7, 8];
console.log(mergeArrays(testArr1, testArr2)); // [1, 2, 3, 4, 5, 6, 7, 8]