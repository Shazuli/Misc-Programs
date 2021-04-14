import { bin2dec as a } from "./base_converters.ts";

if (Deno.args.length <= 0) {
	console.warn("Usage: bin2dec.ts <string> [<string> ..]")
	Deno.exit(1);
}
for (let i=0;i<Deno.args.length;i++) {

	let n : string = Deno.args[i];

	console.log(n+" -> "+a(n));
}