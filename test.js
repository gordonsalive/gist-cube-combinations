//algorithm to find values of a, b, c and d below 1000 (and greater than 0)
//where a³ + b³ = c³ + d³, and (a,b) and (c,d) are actually different pairs
let MAX = 1000

function brute(max) {
    //to eliminate reverse pairs ([30,36] is just the reverse of [36,30]), 
    //I will check a <= b
    //However, will still get reverse couples ([1,12]=[9,10] vs [9,10]=[1,12]), which I don't really want
    console.log(`Brute...\nmax=${max}`);
    let output = [];
    for (let a = 1; a <= max; a++) {
        for (let b = 1; b <= max; b++) {
            for (let c = 1; c <= max; c++) {
                for (let d = 1; d <= max; d++) {
                    //are they different pairs
                    if ((a !== c) && (b !== c) && (a <= b) && (c <= d)) {
                        //do the cubes match?
                        if (Math.pow(a, 3) + Math.pow(b, 3) ===
                            Math.pow(c, 3) + Math.pow(d, 3)) {
                            output.push([[a, b], [c, d]]);
                        }
                    }
                }
            }
        }
    }
    console.log(`output=${JSON.stringify(output)}`);
    console.log(`count=${output.length}`);
    return output;
}
//brute(MAX);
//O() of this is O(N⁴)
//first improvement, once we get to d, not need to loop, either a solution exists or it doesn'...
function better1(max) {
    //to eliminate reverse pairs ([30,36] is just the reverse of [36,30]), 
    //I will check a <= b
    //However, will still get reverse couples ([1,12]=[9,10] vs [9,10]=[1,12]), which I don't really want
    console.log(`Better1...\nmax=${max}`);
    let output = [];
    for (let a = 1; a <= max; a++) {
        for (let b = a; b <= max; b++) {
            for (let c = 1; c <= max; c++) {
                if ((a !== c) && (b !== c)) {
                    let d = Math.cbrt(Math.pow(a, 3) + Math.pow(b, 3) - Math.pow(c, 3));
                    //if this gives a whole number, it is a solution to my problem
                    if ((d % 1 === 0) && (d >= c) && (d <= max)) {
                        output.push([[a, b], [c, d]]);
                    }
                }
            }
        }
    }
    console.log(`output=${JSON.stringify(output)}`);
    console.log(`count=${output.length}`);
    return output;
}
//better1(MAX);
//better1 scales better, it scales at O(N³)
//can I do better?  Yes, once I know the sum of cube products on one side, 
//I don't need to calculate them on the other, I can cache them and look them up
function better2(max) {
    //to eliminate reverse pairs ([30,36] is just the reverse of [36,30]), 
    //I will check a <= b
    //I won't get reverse couples ([1,12]=[9,10] vs [9,10]=[1,12])
    console.log(`Better2...\nmax=${max}`);
    let output = [];
    var cache = new Map();
    for (let a = 1; a <= max; a++) {
        for (let b = a; b <= max; b++) {
            let sumCube = Math.pow(a,3) + Math.pow(b,3);
            var matches = cache.get(sumCube);
            if (matches) {
                for (let c = 0; c < matches.length; c++) {
                    output.push([matches[c],[a,b]]);
                }
            } else {
                matches = [];
            }
            //add this pair to the matches
            matches.push([a,b]);
            cache.set(sumCube,matches);
        }
    }
    console.log(`output=${JSON.stringify(output)}`);
    console.log(`count=${output.length}`);
    return output;
}
better2(MAX);
//better2 scales at O(N²), but could end up with a very large Map (N²)
