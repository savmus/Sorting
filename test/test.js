const { expect } = require('chai');
const { merge, mergeSort, quickSort, radixSort, countingSort } = require('../lib/sort');


describe('merge()', () => {
    // it should accept two sorted arrays as args

    it('should return a single array containing elements of the original sorted arrays, in order', () => {
        expect(merge([1, 5, 10, 15], [0, 2, 3, 7, 10])).to.eql([0, 1, 2, 3, 5, 7, 10, 10, 15]);
        expect(merge([10, 13, 15, 25], [])).to.eql([10, 13, 15, 25]);
    });
});

describe('mergeSort()', () => {
    // it should accept an array of numbers as an arg
    context('when the input array contains 0 or 1 elements', () => {
        it('should return the array', () => {
            expect(mergeSort([])).to.eql([]);
            expect(mergeSort([2])).to.eql([2]);
        });
    });

    context('when the input array contains more than 1 element', () => {
        it('should return an array containing the elements in increasing order', () => {
            expect(mergeSort([2, -1, 4, 3, 7, 3])).to.eql([-1, 2, 3, 3, 4, 7]);
        });
    });
});

describe('quickSort()', () => {
    // it should accept an array of numbers as an arg
    context('when the input array contains 0 or 1 elements', () => {
        it('should return the array', () => {
            expect(quickSort([])).to.eql([]);
            expect(quickSort([2])).to.eql([2]);
        });
    });

    context('when the input array contains more than 1 element', () => {
        it('should return an array containing the elements in increasing order', () => {
            expect(quickSort([2, -1, 4, 3, 7, 3])).to.eql([-1, 2, 3, 3, 4, 7]);
        });
    });
});

describe('radixSort', () => {
    let input;
    let expected;

    it('Should exist', () => {
        expect(radixSort).to.exist;
    });

    it('Should be a function', () => {
        expect(radixSort).to.be.a('function');
    });

    it('Should have exactly one input', () => {
        expect(radixSort.length).to.equal(1);
    });

    it('Should return null if input is not an array', () => {
        input = { 'Not': 'an array.' };
        expect(radixSort(input)).to.equal(null);
    });

    it('Should return an array if an array is provided as input', () => {
        input = [1, 3, 2];
        expect(radixSort(input)).to.be.an('array');
    });

    it('Should return an empty array for input arrays of length 0', () => {
        input = [];
        expect(radixSort(input)).to.eql([]);
    });

    it('Should return the input array for input arrays of length 1', () => {
        input = [1];
        expect(radixSort(input)).to.eql([1]);
    });

    it('Should create a new result array, and should NOT mutate the original array, ', () => {
        input = [1, 3, 2];
        expect(radixSort(input)).not.to.equal(input);
    });

    it('Should sort a small array of integers numerically in ascending order', () => {
        input = [4, 9, 0, 23, 15, 100, 66, 41, 5, 10];
        expected = [0, 4, 5, 9, 10, 15, 23, 41, 66, 100];
        expect(radixSort(input)).to.eql(expected);
    });

    it('Should sort a large array of randomly generated integers numerically in ascending order', () => {
        const max = 999999999;  // Max integer
        const length = 1000     // Length of input array
        let number;             // Each individual integer
        let result;             // Result after sorting

        for (let i = 0; i < length; i++) {
            input.push(Math.floor(Math.random() * max));
        }

        result = radixSort(input);
        expected = input.sort((a, b) => a - b);

        for (let i = 0; i < length; i++) {
            expect(result[i]).to.equal(expected[i]);
        }
    });

    it('Should handle pre-sorted arrays', () => {
        input = [0, 4, 5, 9, 10, 15, 23, 41, 66, 100];
        expected = [0, 4, 5, 9, 10, 15, 23, 41, 66, 100];
        expect(radixSort(input)).to.eql(expected);
    });

    it('Should sort reverse-sorted arrays', () => {
        input = [100, 66, 41, 23, 15, 10, 9, 5, 4, 0];
        expected = [0, 4, 5, 9, 10, 15, 23, 41, 66, 100];
        expect(radixSort(input)).to.eql(expected);
    });
});

describe('countingSort', () => {
    let input;
    let expected;

    it('Should exist', () => {
        expect(countingSort).to.exist;
    });

    it('Should be a function', () => {
        expect(countingSort).to.be.a('function');
    });

    it('Should return an empty array for input arrays of length 0', () => {
        input = [];
        expect(countingSort(input, null)).to.eql([]);
    });

    it('Should return the input array for input arrays of length 1', () => {
        input = [1];
        expect(countingSort(input, 1)).to.eql([1]);
    });

    it('Should sort a small array of integers numerically in ascending order', () => {
        input = [4, 9, 0, 23, 15, 100, 66, 41, 5, 10];
        expected = [0, 4, 5, 9, 10, 15, 23, 41, 66, 100];
        expect(countingSort(input, 100)).to.eql(expected);
    });

    it('Should sort a large array of randomly generated integers numerically in ascending order', () => {
        const max = 1000;     // Max integer
        const length = 1000     // Length of input array
        let number;             // Each individual integer
        let result;             // Result after sorting

        for (let i = 0; i < length; i++) {
            input.push(Math.floor(Math.random() * max));
        }

        result = countingSort(input, 1000);
        expected = input.sort((a, b) => a - b);

        for (let i = 0; i < length; i++) {
            expect(result[i]).to.equal(expected[i]);
        }
    });

    it('Should handle pre-sorted arrays', () => {
        input = [0, 4, 5, 9, 10, 15, 23, 41, 66, 100];
        expected = [0, 4, 5, 9, 10, 15, 23, 41, 66, 100];
        expect(countingSort(input, 100)).to.eql(expected);
    });

    it('Should sort reverse-sorted arrays', () => {
        input = [100, 66, 41, 23, 15, 10, 9, 5, 4, 0];
        expected = [0, 4, 5, 9, 10, 15, 23, 41, 66, 100];
        expect(countingSort(input, 100)).to.eql(expected);
    });
});
