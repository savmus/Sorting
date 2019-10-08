# Efficient Sorts

This repository has implementations of several efficient sorting algorithms — Merge, Quick, Radix, and Counting Sort.

## Implementations

### Merge Sort

```js
function mergeSort(array) {
    if (array.length <= 1) {
        return array;
    }

    let midIdx = Math.floor(array.length / 2);
    let leftHalf = array.slice(0, midIdx);
    let rightHalf = array.slice(midIdx);

    let sortedLeft = mergeSort(leftHalf);
    let sortedRight = mergeSort(rightHalf);

    return merge(sortedLeft, sortedRight);
}
```

This implementation of Merge Sort uses a helper function called 'merge,' which merges two sorted arrays into one sorted array. The new array is constructed by comparing the first elements of both input arrays then adding the smallest element to the new array.

An array of length 0 or 1 is already sorted, so this is the base case of the recursive Merge Sort. The input array is split into left and right halves and then recursive calls are made on each half to find their sorted versions. The final step is to merge these two arrays and return the final sorted product.

The number of recursive calls is the number of times the array is split to reach the base case. Since it is split in half each time, the number of recursive calls is O(log(n)). The merge helper function has a time complexity of O(n) by itself. Merge is called in every recursive call, so the total time complexity of Merge Sort is O(n * log(n)).

Merge Sort's space complexity is O(n), because the larger the size of the input array, the greater the number of subarrays that must be created in memory.

### Quick Sort

```js
function quickSort(array) {
    if (array.length <= 1) {
        return array;
    }

    let pivot = array.shift();
    let left = array.filter(el => el < pivot);
    let right = array.filter(el => el >= pivot);

    let leftSorted = quickSort(left);
    let rightSorted = quickSort(right);

    return [...leftSorted, pivot, ...rightSorted];
}
```

Quick Sort works by dividing the input array into two subarrays — one with smaller elements and one with larger elements. It then recursively operates on the two new subarrays, continuing until subarrays of length 1 or smaller(which are already sorted) are reached.

First, a pivot element is selected. In my implementation, this is the first element of the array. All elements smaller than the pivot should be moved to its left, and all elements larger than the pivot to its right. The process is repeated for the left side then for the right side by making recursive calls.

Time complexity: O(n log(n))

Space complexity: O(n)

### Radix Sort

```js
function radixSort(arr) {
    if (!Array.isArray(arr)) {
        return null;
    }

    let maxDigits = getMaxDigits(arr);
    for (let k = 0; k < maxDigits; k++) {
        let buckets = Array.from({ length: 10 }, () => []);

        for (let i = 0; i < arr.length; i++) {
            let digit = getDigitFrom(arr[i], k);
            buckets[digit].push(arr[i]);
        }

        arr = [].concat(...buckets);
    }
    return arr;
}
```

Radix Sort works by keeping track of ten 'buckets,' each representing a digit from 0-9. For each relevant place value, starting from ones, array elements are individually placed in the buckets that correspond to their digit at that place value. The array is then assigned to a new array with each element in the order it appeared in the buckets. This process is repeated until a sorted array is returned.

Since Radix Sort requires iterating over all n elements of the input array, and doing so k times, where k is the length of the longest integer in the array, its time complexity is O(n * k).

Since the amount of memory consumed by Radix Sort increases relative to both the size of the input array and the length of the longest integer, its space complexity is O(n + k).

### Counting Sort

```js
function countingSort(arr, max) {
    const result = [];
    const counters = new Array(max + 1).fill(0);

    for (let i = 0; i < arr.length; i++) {
        counters[arr[i]]++;
    }

    for (let i = 0; i < counters.length; i++) {
        while (counters[i] > 0) {
            result.push(i);
            counters[i]--;
        }
    }

    return result;
}
```

Counting Sort works by allocating an array of counters k elements long, where k is the largest integer in the input. Upon initialization, each element of the new counter array is set to zero. The input array is then iterated across, with the counter at the index equal to the current element incremented by one. The counters array is then iterated across. For each non-zero value found, the current counter's index is pushed into the output array. The output array is now sorted in ascending order and can be returned.

Time complexity: O(n + k)

Space complexity: O(k)