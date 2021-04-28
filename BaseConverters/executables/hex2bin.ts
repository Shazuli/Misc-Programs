import { hex2bin as a } from "../base_converters.ts";
let l : number = Deno.args.length;
if (l <= 0) {
	console.warn("Usage: hex2bin.ts <string> [<string> ..]");
	Deno.exit(1);
}
let n : string;
for (let i=0;i<l;i++) {
	n = Deno.args[i];
	console.log(n+" -> "+a(n));
}