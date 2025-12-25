PORT := 8085

.PHONY: run
run:
	tiddlywiki wiki --listen port=${PORT} root-tiddler=$$:/core/save/lazy-images 
