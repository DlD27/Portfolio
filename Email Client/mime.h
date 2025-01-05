#ifndef MIME_H
#define MIME_H
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>

void mime_command(int sockfd, int messageNum);
void get_boundary_parameter(char boundary[], char line[], int len);

#endif