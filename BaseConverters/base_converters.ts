/* A Deno module to convert different base to binary and back.
 * Goal was just to learn how to convert between bases, there's probably better algorithms. :)
 * Feel free to take code snippets of your liking, perhaps it can help (if you can manage to
 * decypher it there is :P).
 * By Simon
 */
const
	// Hexadecimal char index. Change if you want to use other characters.
	HEX = "0123456789abcdef",
	// Decimal character for indicating fractal.
	DEC_CHAR = '.';

// A line of zeros, increase if you need more empty space in numbers (Ex. "number 2" with "space=4" in binary becomes "0010").
const ZEROS = repeatStr('0',4);

export {HEX};// Exporting this just in case.

/**
 * Decimal to binary conversion.
 * @param inputNum Input number.
 * @param block Minimum size a block of characters can be (default=1).
 * @return Returns a string of 1s and 0s.
 */
export function dec2bin(inputNum : number, block : number=1) : string {
	let intN : number = Math.trunc(inputNum), decN : number = inputNum-intN;
	let nInt : string = "", nDec : string = decN > 0 ? DEC_CHAR : "";
	let temp : number;

	while (intN > 0) {// Integers
		temp = intN % 2;
		intN = (intN-temp) / 2;
		nInt += temp.toString();
	}
	nInt += ZEROS.substring(0,complBlock(nInt.length,block));// Complete block.

	while (decN > 0) {// Fractals
		decN *= 2;
		temp = Math.trunc(decN);
		decN -= temp;
		nDec += temp.toString();
	}
	return nInt.split("").reverse().join("")+nDec;// Reverse the string.
}
/**
 * Hexadecimal to binary conversion.
 * @param inputNum Input string.
 * @param block Minimum size a block of characters can be (default=1).
 * @return Returns a string of 1s and 0s.
 */
export function hex2bin(inputNum : string, block : number=1) : string {
	let s : number = inputNum.indexOf(DEC_CHAR);// Position of fractal.
	let num : string = "";
	
	for (let i=0;i < (s == -1 ? inputNum.length : s);i++)// Integers
		num += dec2bin(HEX.indexOf(inputNum.charAt(i)),4);

	num = ZEROS.substring(0,complBlock(num.length,block)) + num;// Complete block.

	if (s != -1) {// Fractals
		num += DEC_CHAR
		for (let i=s+1;i<inputNum.length;i++)
			num += dec2bin(HEX.indexOf(inputNum.charAt(i)),4);
	}
	return num;
}
/** 
 * Binary to decimal conversion.
 * @param inputNum Input string.
 * @return Returns a number.
 */
export function bin2dec(inputNum : string) : number {
	let num : number = 0, j : number = 0;
	let s : number = inputNum.indexOf(DEC_CHAR);// Position of fractal.

	for (let i=s==-1 ? inputNum.length-1 : s-1;i>=0;i--) {// Integers
		if (inputNum.charAt(i) == '1')
			num += Math.pow(2,j);
		j++;
	}
	if (s != -1) {// Fractals
		for (let i=1;i<inputNum.length-s;i++) {
			if (inputNum.charAt(i+s) == '1')
				num += Math.pow(2,-i);
		}
	}
	return num;
}
/**
 * Binary to hexadecimal conversion.
 * @param inputNum Input string.
 * @return Returns temp string of chars.
 */
export function bin2hex(inputNum : string) : string {
	let num : string = "";
	let s : number = inputNum.indexOf(DEC_CHAR);// Position of fractal.
	let temp : string = inputNum.substring(0,s == -1 ? inputNum.length : s-1);
	temp += ZEROS.substring(0,complBlock(temp.length,4));// Complete block.

	for (let i=0;i < temp.length;i+=4)// Integers
		num += HEX[bin2dec(temp.substring(i,i+4))];// 4 digits at a time.
	
	if (s != -1) {// Fractals
		num = num+DEC_CHAR;
		temp = inputNum.substring(s+1);
		temp += ZEROS.substring(0,complBlock(temp.length,4));

		for (let i=0;i<temp.length;i+=4)
			num += HEX[bin2dec(temp.substring(i,i+4))];// 4 digits at a time.
	}
	return num;
}
// Returns number needed to make len evenly dividely by block. 0 if already even.
function complBlock(len : number, block : number) : number {
	let a : number = block-(len % block);
	return a == block ? 0 : a;
}
// Will repeat a string n times and returns that string.
function repeatStr(str : string, n : number) : string {
	let a = str;
	for (let i=1;i<n;i++)
		a += str.toString();
	return a;
}