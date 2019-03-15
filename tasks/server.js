import { create as browserSync } from "browser-sync";
import gulp from "gulp";
import debuga from "debuga";

const bs = browserSync("server");
const { PORT, OPEN, NODE_ENV, TUNNEL } = process.env;
var proxy = require("http-proxy-middleware");

var apiProxy = proxy("/api", {
	target: "https://api.domoos.ru",
	changeOrigin: true,
	secure: false
});

gulp.task("server", () => {
	bs.init({
		files: ["dist/**/*"],
		open: !!OPEN,
		reloadOnRestart: true,
		port: PORT || 3000,
		snippetOptions: {
			rule: {
				match: /<\/body>/i
			}
		},
		server: {
			baseDir: ["app/resources", "dist"],
			directory: false,
			middleware: NODE_ENV !== "production" ? [debuga(), apiProxy] : []
		},
		tunnel: !!TUNNEL
	});
});
