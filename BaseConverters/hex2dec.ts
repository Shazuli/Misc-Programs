import { bin2dec as a, hex2bin as b } from "./base_converters.ts";

if (Deno.args.length <= 0) {
	console.warn("Usage: hex2dec.ts <string> [<string> ..]")
	Deno.exit(1);
}
for (let i=0;i<Deno.args.length;i++) {

	let n : string = Deno.args[i];
	console.log(n+" -> "+a(b(n)));
}