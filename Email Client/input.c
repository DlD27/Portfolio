#include "structs.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

// Function to check for newline or carriage return in strings
int contains_newline_or_carriage_return(const char *str) {
    while (*str) {
        if (*str == '\n' || *str == '\r') {
            return 1;
        }
        str++;
    }
    return 0;
}

// Function to check for valid characters - Safe injection 
int is_safe_input(const char *str) {
    while (*str) {
        if (!isalnum((unsigned char)*str) && *str != '@' && *str != '.' && *str != '_' && *str != '-') {
            return 0;
        }
        str++;
    }
    return 1;
}

// Parse in command line and assign to input struct
Input parseInput(int argc, char **argv)
{
    Input input = {NULL, NULL, "INBOX", NULL, NULL, 0}; // Default values as per specification
    int positionalArgs = 0;

    for (int i = 1; i < argc; i++)
    {
        if (strcmp(argv[i], "-u") == 0 && i + 1 < argc)
        {
            if (!contains_newline_or_carriage_return(argv[i + 1]) && is_safe_input(argv[i + 1])) {
                input.username = argv[++i];
            } else {
                fprintf(stderr, "Invalid username\n");
                exit(1);
            }
        }
        else if (strcmp(argv[i], "-p") == 0 && i + 1 < argc)
        {
            if (!contains_newline_or_carriage_return(argv[i + 1])) {
                input.password = argv[++i];
            } else {
                fprintf(stderr, "Invalid password\n");
                exit(1);
            }
        }
        else if (strcmp(argv[i], "-f") == 0 && i + 1 < argc)
        {
            if (!contains_newline_or_carriage_return(argv[i + 1])) {
                input.folder = argv[++i];
            } else {
                fprintf(stderr, "Invalid folder name\n");
                exit(1);
            }
        }
        else if (strcmp(argv[i], "-n") == 0 && i + 1 < argc)
        {   
            char *str = argv[i + 1];
            int allDigits = 1;
            int mNum = atoi(argv[i + 1]);

            for (int j = 0; str[j] != '\0'; j++) {
                if (!isdigit((unsigned char)str[j])) {
                    allDigits = 0;
                    break;
                }
            }

            if (mNum > 0 && allDigits) {
                input.messageNum = atoi(argv[++i]);
            } else {
                fprintf(stderr, "Invalid message number\n");
                exit(1);
            }
        }
        else if (argv[i][0] != '-')
        {
            if (positionalArgs == 0)
            {
                input.command = argv[i];
                positionalArgs++;
            }
            else if (positionalArgs == 1)
            {
                input.server = argv[i];
                positionalArgs++;
            }
        }
        else
        {
            fprintf(stderr, "Login failure\n");
            exit(1);
        }
    }

    if (!input.username || !input.password || !input.command || !input.server)
    {
        fprintf(stderr, "Incomplete input\n");
        exit(1);
    }

    return input;
}
