PORT := 8085

.PHONY: run
run:
	tiddlywiki tatami --listen port=${PORT} root-tiddler=$$:/core/save/lazy-images 
