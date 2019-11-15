let datastring = `Hoe hoog is je studieschuld op dit moment?
1000-5000
Geen studieschuld
5000-10000
Geen studieschuld
1000-5000
Geen studieschuld
20000-25000
Geen studieschuld
Geen studieschuld

Geen studieschuld
15000-20000
10000-15000
Geen studieschuld
Geen studieschuld
Geen studieschuld
5000-10000
15000-20000
15000-20000

Meer dan 25000
5000-10000
15000-20000
Geen studieschuld
5000-10000
5000-10000, 15000-20000
Geen studieschuld
Geen studieschuld
Geen studieschuld
10000-15000
5000-10000
20000-25000
10000-15000
1000-5000
1000-5000
Geen studieschuld
1000-5000

Geen studieschuld
Geen studieschuld
Geen studieschuld
10000-15000
Meer dan 25000
10000-15000
Geen studieschuld
15000-20000
5000-10000
1000-5000
Geen studieschuld
Meer dan 25000
1000-5000
Meer dan 25000
15000-20000
10000-15000
5000-10000
5000-10000
15000-20000
5000-10000
Geen studieschuld
Meer dan 25000
20000-25000
20000-25000
1000-5000
10000-15000
Geen studieschuld
Geen studieschuld
Geen studieschuld
Geen studieschuld
1000-5000
1000-5000

Geen studieschuld
5000-10000
20000-25000
1000-5000
15000-20000
Geen studieschuld
Geen studieschuld
Meer dan 25000
Geen studieschuld
Geen studieschuld
10000-15000`;

function cleanData(data) {
	// make an array of the string and split it on new line
    const array = data.split(/\n/);
    // make a new array in the array that splits on '-' to separate 2 values
    const items = array.map(item => {
        return item.split('-')
    });

    // make a new array of the item array
    return items.map(item => {
    	//check the length of each array, if it's 1 do more checks
        if (item.length == 1) {
        	// if value is empty or 'geen studieschuld' return 0
	        if (item == "" || item == "Geen studieschuld") {
		        return item = 0;
	        }
	        // keep this text
	        else if (item == "Hoe hoog is je studieschuld op dit moment?") {
	        	return item;
	        }
	        // else return 27500 (more then 25000)
	        return item = 27500
        }

        // If it's more than 1 item, it's a range of numbers [[1500][2000]]
        let range = item.map(value => {
            // Because quirks (like more then 2 values seperated with ',' in the range)
            if (value.includes(', ')) {
                return Number(value.split(', ')[0]) // Throw away second value after ,
            }
            return Number(value) // array of numbers
        });

        // here gets the average calculated.
	    // accumulating the values and dividing by the length of the range
        return range.reduce((accumulator, currentNumber) => {
            let average = (accumulator + currentNumber) / range.length;
            // check if it's a whole number, if it's not fix to max 2 decimals
            if (average % 1 !== 0) {
	            return average.toFixed(2)
            }
            return average
        })
	        .toString() //Make strings of numbers
	        .replace('.', ',') //] + replaces all decimals
    })
	    .join("\r\n") //makes one string (with new line) of the items array
}

console.log(cleanData(datastring));