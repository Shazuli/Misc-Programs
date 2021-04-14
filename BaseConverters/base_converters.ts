/* A Deno module to convert different base to binary and back.
 * Supports: base 10 (+ decimals) & base 16 (+ decimals).
 * Goal was just to learn how to convert between bases, there's probably better algorithms. :)
 * 
 * By Simon
 */

const
	// Constant for hexadecimal char index. Change if you want to use other characters.
	HEX = "0123456789ABCDEF",
	// Decimal character for indicating fractal.
	DEC_CHAR = '.';
// A line of zeros, increase if you need more empty space in numbers (Ex. "number 2" with "4 space" in bin = 0010).
const ZEROS = createLine('0',4);

/* Convert decimal (10) to binary (2)
 * @param n Input number.
 * @param block Minimum size a block of characters can be (optional).
 * @return Returns a string of 1s & 0s.
 */
export function dec2bin(n : number, block : number = 1) : string {
	let intN : number = Math.trunc(n), decN : number = n - intN;
	let nInt : string = "", nDec : string = decN > 0 ? DEC_CHAR : "";
	let v : number;

	while (intN > 0) {
		v = intN % 2;
		intN = (intN-v) / 2;
		nInt += v.toString();
	}
	nInt += ZEROS.substring(0,getEvenBlocks(nInt.length,block));

	while (decN > 0) {
		decN *= 2;
		v = Math.trunc(decN);
		decN -= v;
		nDec += v.toString();
	}
	return nInt.split("").reverse().join("")+nDec;
}

export function bin2dec(n : string) : number {
	let num : number = 0;
	let s : number = n.indexOf(DEC_CHAR);

	let j : number = 0;
	for (let i = s == -1 ? n.length-1 : s-1; i >= 0;i--) {
		if (n.charAt(i) == '1')
			num += Math.pow(2,j);
		j++;
	}

	if (s != -1) {
		for (let i=1;i<n.length-s;i++) {
			if (n.charAt(i+s) == '1')
				num += Math.pow(2,-i);
		}
	}
	return num;
}

export function hex2bin(n : string, block : number = 1) : string {
	let s : number = n.indexOf(DEC_CHAR);
	let num : string = "";
	
	for (let i=0;i < (s == -1 ? n.length : s);i++)
		num += dec2bin(HEX.indexOf(n.charAt(i)),4);

	num = ZEROS.substring(0,getEvenBlocks(num.length,block)) + num;

	if (s != -1) {
		num += DEC_CHAR
		for (let i=s+1;i<n.length;i++)
			num += dec2bin(HEX.indexOf(n.charAt(i)),4);
	}
	return num;
}

export function bin2hex(n : string) : string {
	let s : number = n.indexOf(DEC_CHAR);
	let num : string = "";

	let a = n.substring(0,s == -1 ? n.length : s-1);
	a += ZEROS.substring(0,getEvenBlocks(a.length,4));

	for (let i=0;i < a.length;i+=4)
		num += HEX[bin2dec(a.substring(i,i+4))];

	
	if (s != -1) {
		num = num+DEC_CHAR;
		a = n.substring(s+1);
		a += ZEROS.substring(0,getEvenBlocks(a.length,4));

		for (let i=0;i<a.length;i+=4)
			num += HEX[bin2dec(a.substring(i,i+4))];
	}
	return num;
}

// Utility Functions
function getEvenBlocks(charLength : number, block : number) : number {
	let a : number = block-(charLength % block);
	return a == block ? 0 : a;
}
function createLine(char : string, length : number) : string {
	let a = "";
	for (let i=0;i<length;i++)
		a += char.toString();
	return a;
}