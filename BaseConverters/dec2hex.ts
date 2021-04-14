import { dec2bin as a, bin2hex as b } from "./base_converters.ts";

if (Deno.args.length <= 0) {
	console.warn("Usage: dec2hex.ts <number> [<number> ..]")
	Deno.exit(1);
}
for (let i=0;i<Deno.args.length;i++) {

	let n : number = Number(Deno.args[i]);

	if (isNaN(n)) {
		console.log(Deno.args[i]+" is not a valid number, skipping..");
		continue;
	}

	console.log(n+" -> "+b(a(n)));
}