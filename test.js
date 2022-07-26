function solution(A) {
    for (let i = 0; i < A.length; i++) {
        if (A[i-1] == 'b' && A[i] == 'a') {
            return false;
        }
    }
    return true;
}

let B = "aabbbbab";

// console.log(solution(B));


function solutionA(A) {

    let result = [];
    
    for (let i = 0; i < A.length; i++) {
        if (A[i] > 0 && A[i] != 0) {
            if (result.length < 3) {
                result.push(A[i]);
            }
        }
    }
    
    let total = 0;
    for (let i = 0; i < result.length; i++) {
        total += result[i];
    }

    return total;
}

let C = [4, -2, 0, 5, -2, 1, 6];
let D = [3, -2, 0,]
let E = [-9, -4, -2, -6];

// console.log(solutionA(E));

// Nomor 3
// using System;
// // you can also use other imports, for example:
// // using System.Collections.Generic;

// // you can write to stdout for debugging purposes, e.g.
// // Console.WriteLine("this is a debug message");

// class Solution {
//     public int solution(string S) {
//         // write your code in C# 6.0 with .NET 4.5 (Mono)
//         int counter = 0;
		
// 		//int V = Convert.ToInt32(S,2);
// 		long V = Convert.ToInt64(S,2);
// 		while(V > 0)
// 		{
// 			if(V%2 == 0)
// 			{
// 				V = V/2;
// 			}
// 			else
// 			{
// 				V = V -1;
// 			}
// 			counter++;
// 		}

// 	 	return counter;
//     }
// }


// Nomor 4
// -- write your code in PostgreSQL 9.4
// SELECT task_id, name, 
//     CASE
//         WHEN AVG(score) > 60 THEN 'Easy'
//         WHEN AVG(score) <= 20 THEN 'Hard'
//         ELSE 'Medium'
//     END
//  AS difficulty FROM reports AS r
// JOIN tasks AS t on t.id=r.task_id
// GROUP BY task_id, name
// ORDER BY task_id ASC;


let user = {
    name: 'Widies',
    age: '21',
    gender: 'Male',
}

let status = {
    status: 'active',
}

const tasks = Object.assign(user, status);
console.log(tasks);


let sql = `WHERE books.id LIKE ? OR books.title LIKE ? OR books.author LIKE ? OR books.publisher LIKE ? OR books.year LIKE ? OR books.pages LIKE ? OR books.price LIKE ? OR books.language LIKE ? OR category.category_name LIKE ?;`

let key = '?';
let askArrays = [];
function test(sql) {
    for (let i = count= 0; i < sql.length; count+=+('?' === sql[i++]));
    for (let j = 0; j < count; j++) {
        askArrays.push('Widies');
    }
    return askArrays;
}
let coutnQ = test(sql);
console.log(coutnQ);