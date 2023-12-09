const startinput =document.querySelector('#start')
const endinput=document.querySelector('#end');
const list=document.querySelector('#list');
const benchmark=document.querySelector('#benchmark');
const detailButton=document.querySelector('#detailButton');
const allView=document.querySelector('#All-view');
const allViewTable=document.querySelector('#All-view-table');
const primeView=document.querySelector('#Prime-view');
const primeViewTable=document.querySelector('#Prime-view-table');

/*
* Time complexity of the program in O(n^2)
* Space Complexity of program is O(n)
*/

let result=[];
const resultButton=document.querySelector('#result');
primeViewTable.style.display='none'
detailButton.disabled=true
resultButton.addEventListener('click', () => {
    console.log(!isNaN(startinput.value) , !isNaN(endinput.value))
    if(startinput.value.trim().length<1 || endinput.value.trim().length<1){
        window.alert('please enter number');
        return;
    }
    const leftLimit = parseInt(startinput.value.trim());
    const rightLimit = parseInt(endinput.value.trim());
    if(isNaN(leftLimit) || isNaN(rightLimit) || leftLimit>rightLimit){
        window.alert('please enter valid number');
        return;
    }
    benchmark.innerHTML = `Loading...`
    resultButton.disabled=true;
    detailButton.disabled=true;
    setTimeout(() => {
        result=getPrimesInRange(leftLimit, rightLimit);
        console.log(result)
        resultButton.disabled=false;
        detailButton.disabled=false;
        console.log(result)
        benchmark.innerHTML = `Average Time for each number: ${result.reduce((accumulator, currentValue) => accumulator + currentValue.timeTakeninms, 0)/result.length} miliseconds. Total Time is
        ${result.reduce((accumulator, currentValue) => accumulator + currentValue.timeTakeninms, 0)} miliseconds`
        let allTableBody = allViewTable.querySelector('tbody');
        let primeTableBody = primeViewTable.querySelector('tbody');
        let allBody='';
        let primeBody='';
        result.map((value, index) => {
            allBody+=`
            <tr>
                <td>${value.num}</td>
                <td>${value.prime ? 'Prime' : 'Normal'}</td>
                <td>${value.timeTakeninms}</td>
            </tr>
            `
        })
        result.filter((value) => {
            return value.prime;
        }).map((value, index) => {
            primeBody+=`
            <tr>
                <td>${value.num}</td>
                <td>${value.timeTakeninms}</td>
            </tr>
            `
        })
        allTableBody.innerHTML=allBody;primeTableBody.innerHTML=primeBody

    },10)
})

allView.addEventListener('click', () => {
    allViewTable.style.display='inline-table';
    primeViewTable.style.display='none';
    if(!allView.classList.contains('active')){
        allView.classList.add('active');
    }
    if(primeView.classList.contains('active')){
        primeView.classList.remove('active');
    }
})
primeView.addEventListener('click', () => {
    allViewTable.style.display='none';
    primeViewTable.style.display='inline-table';
    if(!primeView.classList.contains('active')){
        primeView.classList.add('active')
    }
    if(allView.classList.contains('active')){
        allView.classList.remove('active');
    }
})

function getPrimesInRange(leftLimit, rightLimit){
    const functionResult=[];
    for (let i = leftLimit; i <= rightLimit; i++) {
        const nowTimestamp = window.performance.now();
        let flag=true;
        for (let j = 2; j < i; j++) {
            if(i%j==0){
                flag=false;
            }
        }
        
        if(flag == true){
            if(i != 1){
                functionResult.push({
                    num: i,
                    timeTakeninms: window.performance.now()-nowTimestamp,
                    prime: true
                })
            }
        } else {
            functionResult.push({
                    num: i,
                    timeTakeninms: window.performance.now()-nowTimestamp,
                    prime: false
                })
        }
    }
    return functionResult;
}