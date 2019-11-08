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
10000-15000`

/**
 * @return {string}
 */
function CleanData(data) {
    const array = data.split(/\n/)
    const items = array.map(item => {
        return item.split('-')
    });
    
    return items.map(item => {
        if (item.length == 1) {
            return item[0]
        }

        // If it's not one item => 'Geen studieschuld or something',
        // it's a range of numbers (a.k.a. [[1500][2000]])
        let range = item.map(value => {
            // Because quirks
            if (value.includes(', ')) {
                return Number(value.split(', ')[0]) // Throw away second value after ,
            }

            return Number(value) // array of numbers
        })


        return range.reduce((accumulator, currentNumber) => {
            return (accumulator + currentNumber) / range.length
        }).toString().replace('.', ',') //Make string of number + replaces the decimal
    }).join("\r\n") //makes string (with new line) of the items array
}