function mergeSort(arr){
    if (arr.length <=1) return arr;
    let mid = Math.floor(arr.length / 2);

    let leftArr=mergeSort(arr.slice(0,mid));
    let rightArr=mergeSort(arr.slice(mid));

    return merge(leftArr,rightArr);
}

function merge(leftArr,rightArr){
    let sortedArr = [];

    while(leftArr.length && rightArr.length){
        if(leftArr[0]<=rightArr[0]){
            sortedArr.push(leftArr.shift());
        } else{
            sortedArr.push(rightArr.shift());
        }
    }

    return [...sortedArr,...leftArr,...rightArr];
}

export default mergeSort;