import { dec2bin as a } from "../base_converters.ts";
if (Deno.args.length <= 0) {
	console.warn("Usage: dec2bin.ts <number> [<number> ..]");
	Deno.exit(1);
}
let n : number;
for (let i=0;i<Deno.args.length;i++) {
	n = Number(Deno.args[i]);
	if (isNaN(n)) {
		console.log(Deno.args[i]+" is not a valid number, skipping..");
		continue;
	}
	console.log(n+" -> "+a(n));
}