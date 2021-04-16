/* A Deno module to convert different base to binary and back.
 * Goal was just to learn how to convert between bases, there's probably better algorithms. :)
 * By Simon
 */
const
	// Hexadecimal char index. Change if you want to use other characters.
	HEX = "0123456789ABCDEF",
	// Decimal character for indicating fractal.
	DEC_CHAR = '.';
// A line of zeros, increase if you need more empty space in numbers (Ex. "number 2" with "space=4" in binary becomes "0010").
const ZEROS = repeatStr('0',4);

export {HEX}; // Exporting this just in case.

/* @param n Input number.
 * @param block Minimum size a block of characters can be (default=1).
 * @return Returns a string of 1s and 0s.
 */
export function dec2bin(n : number, block : number = 1) : string {
	let intN : number = Math.trunc(n), decN : number = n-intN;
	let nInt : string = "", nDec : string = decN > 0 ? DEC_CHAR : "";
	let v : number;

	while (intN > 0) {
		v = intN % 2;
		intN = (intN-v) / 2;
		nInt += v.toString();
	}
	nInt += ZEROS.substring(0,complBlock(nInt.length,block));

	while (decN > 0) {
		decN *= 2;
		v = Math.trunc(decN);
		decN -= v;
		nDec += v.toString();
	}
	return nInt.split("").reverse().join("")+nDec;
}
/* @param n Input string.
 * @param block Minimum size a block of characters can be (default=1).
 * @return Returns a string of 1s and 0s.
 */
export function hex2bin(n : string, block : number = 1) : string {
	let s : number = n.indexOf(DEC_CHAR);
	let num : string = "";
	
	for (let i=0;i < (s == -1 ? n.length : s);i++)
		num += dec2bin(HEX.indexOf(n.charAt(i)),4);

	num = ZEROS.substring(0,complBlock(num.length,block)) + num;

	if (s != -1) {
		num += DEC_CHAR
		for (let i=s+1;i<n.length;i++)
			num += dec2bin(HEX.indexOf(n.charAt(i)),4);
	}
	return num;
}
/* @param n Input string.
 * @return Returns a number.
 */
export function bin2dec(n : string) : number {
	let num : number = 0;
	let j : number = 0, s : number = n.indexOf(DEC_CHAR);

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
/* @param n Input string.
 * @return Returns a string of chars.
 */
export function bin2hex(n : string) : string {
	let num : string = "";
	let s : number = n.indexOf(DEC_CHAR);
	let a = n.substring(0,s == -1 ? n.length : s-1);
	a += ZEROS.substring(0,complBlock(a.length,4));

	for (let i=0;i < a.length;i+=4)
		num += HEX[bin2dec(a.substring(i,i+4))];
	
	if (s != -1) {
		num = num+DEC_CHAR;
		a = n.substring(s+1);
		a += ZEROS.substring(0,complBlock(a.length,4));

		for (let i=0;i<a.length;i+=4)
			num += HEX[bin2dec(a.substring(i,i+4))];
	}
	return num;
}
function complBlock(charLength : number, block : number) : number {
	let a : number = block-(charLength % block);
	return a == block ? 0 : a;
}
function repeatStr(char : string, length : number) : string {
	let a = char;
	for (let i=1;i<length;i++)
		a += char.toString();
	return a;
}