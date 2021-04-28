import { bin2hex as a } from "../base_converters.ts";
if (Deno.args.length <= 0) {
	console.warn("Usage: bin2hex.ts <string> [<string> ..]");
	Deno.exit(1);
}
let n : string;
for (let i=0;i<Deno.args.length;i++) {
	n = Deno.args[i];
	console.log(n+" -> "+a(n));
}