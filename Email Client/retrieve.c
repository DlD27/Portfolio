#include <netdb.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

#define LENGTH 1024   // Length of buffer
#define LINELEN 10000 // Length of a response line

void retrieve_command(int sockfd, int messageNum)
{
    // Send retrieve command to server
    char buffer[LENGTH];
    snprintf(buffer, sizeof(buffer), "A03 FETCH %d BODY.PEEK[]\r\n", messageNum);
    if (write(sockfd, buffer, strlen(buffer)) < 0)
    {
        perror("Error writing to socket");
        exit(EXIT_FAILURE);
    }

    // Get response of the command
    char line[LINELEN]; // Line being read
    char c; // One character being read
    ssize_t read_c;
    int nchar = 0; 
    int i = 0;
    int start = 0;
    int end = 0;
    int total = 0; // Number of charcters in the response

    // Read first line to get number of chars in the response
    while ((read_c = read(sockfd, &c, sizeof(char))) > 0)
    {
        line[nchar] = c;
        nchar++;
        if (c == '\n')
        {
            line[nchar] = '\0'; // Make it a string
            break;              // First line found
        }
    }

    // Fail to read from socket
    if (read_c < 0){
        printf("Error reading from socket");
        exit(EXIT_FAILURE);
    }

    // Fail to retrieve the raw mail
    if (strstr(line, "A03 BAD") || strstr(line, "A03 NO"))
    {
        printf("Message not found\n");
        exit(3);
    }

    // Parse total number of characters need to be read
    for (i = 0; i <= strlen(line); i++)
    {
        if (line[i] == '{')
        {
            start = i + 1;
        }
        else if (line[i] == '}')
        {
            end = i;
            break;
        }
    }
    line[end] = '\0';
    total = atoi(line + start); // total chars need to be read

    // Print actual response
    while (total>0){
        read(sockfd, &c, sizeof(char));
        printf("%c", c);
        total -= 1;
    }
}
