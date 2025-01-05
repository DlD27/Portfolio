EXE=fetchmail

$(EXE): main.c input.c retrieve.c parse.c client.c list.c
	cc -Wall -g -o $(EXE) main.c input.c retrieve.c parse.c client.c mime.c list.c

format:
	clang-format -style=file -i *.c

clean:
	rm -f $(EXE)
