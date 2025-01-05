#ifndef STRUCTS_H
#define STRUCTS_H

typedef struct {
    char *username;
    char *password;
    char *folder;
    char *command;
    char *server;
    int messageNum;
} Input;

typedef struct {
    char *name;
    int sockfd;
    int messageNum;
    } Command;

#endif 
