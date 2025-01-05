#include <netdb.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <ctype.h>

#define LENGTH 1024                 // Length of buffer
#define LINELEN 10000               // Length of a response line
#define MIME_VERSION 1              // Mime version matched
#define CONTENT_TYPE_TOP 2          // Content type in top level matched
#define BOUNDARY_GET 3              // Boundary parameter get from raw email
#define BOUNDARY_MATCH 4            // Boundary parameter matched
#define CONTENT_TYPE_BODY 5         // Content type in body part matched
#define CHARSET 6                   // Charset matched
#define CONTENT_TRANSFER_ENCODING 7 // Content transfer encoding matched
#define IN_BODY 8                   // Reading the boday part
#define CONTENT_TYPE_BODY_LAST 9    // Content transfer encoding matched first

void get_boundary_parameter(char boundary[], char line[], int len);
void to_lowercase(char *str);

void mime_command(int sockfd, int messageNum)
{

    char buffer[LENGTH];           // Read or write buffer
    char prev_line[LINELEN] = {0}; // To store the previous line
    char *match_boundary = " boundary=";
    char boundary[LINELEN] = {0}; // To store boundary
    boundary[0] = '-';
    boundary[1] = '-';
    int first_line = 0; // Flag of reading first line in body part
    int header = -1;    // State of header

    // Send fetch request to get raw email
    snprintf(buffer, sizeof(buffer), "A05 FETCH %d BODY.PEEK[]\r\n", messageNum);
    if (write(sockfd, buffer, strlen(buffer)) < 0)
    {
        printf("Error writing to socket");
        exit(EXIT_FAILURE);
    }

    // Getting from response
    while (1)
    {

        // Read one line at a time
        char line[LINELEN] = {0}; // To store read line
        int count = 0;            // Number of characters in the line
        char c;
        ssize_t read_c;
        while ((read_c = read(sockfd, &c, sizeof(char))) > 0)
        {
            line[count++] = c;
            if (c == '\n')
            {
                if (line[count - 1] == '\r')
                {
                    line[count - 1] = '\0'; // Make it a string
                    break;                  // One line read
                }
                else
                {
                    line[count] = '\0'; // Make it a string
                    break;              // One line read
                }
            }
        }
        // Store the current line in lowercase to match case insensitive header
        char lower_line[LINELEN];
        strcpy(lower_line, line);
        to_lowercase(lower_line);

        // No text found
        if (read_c == 0)
        {
            printf("Body part not found.\n");
            exit(4);
        }
        // Fail to read from socket
        else if (read_c < 0)
        {
            printf("Error reading from socket");
            exit(EXIT_FAILURE);
        }

        // Fail to retrieve the raw mail
        if (strstr(line, "A05 BAD") || strstr(line, "A05 NO"))
        {
            printf("Message not found\n");
            exit(3);
        }

        // MIME version matched
        if (strstr(lower_line, "mime-version: 1.0") && header == -1)
        {
            header = MIME_VERSION;
        }

        // Content type matched
        else if (strstr(lower_line, "content-type: multipart/alternative") &&
                 header == MIME_VERSION)
        {
            header = CONTENT_TYPE_TOP;
        }

        // Get boundary parameter
        if (strstr(lower_line, match_boundary) && header == CONTENT_TYPE_TOP)
        {
            get_boundary_parameter(boundary, line, strlen(match_boundary));
            header = BOUNDARY_GET;
        }

        // Reach the boundary delimiter
        else if (strncmp(line, boundary, strlen(boundary)) == 0 &&
                 header == BOUNDARY_GET)
        {
            header = BOUNDARY_MATCH;
        }

        // Content type header inside body part matched
        else if (strstr(lower_line, "content-type: text/plain") &&
                 (header == BOUNDARY_MATCH || header == CONTENT_TRANSFER_ENCODING))
        {
            if (header == CONTENT_TRANSFER_ENCODING)
            {
                // Charset matched
                if ((strstr(lower_line, "charset=utf-8") ||
                     strstr(lower_line, "charset=\"utf-8\"")))
                {
                    header = IN_BODY;
                }
                else
                {
                    header = CONTENT_TYPE_BODY_LAST;
                }
            }
            else
            {
                // Charset matched
                if ((strstr(lower_line, "charset=utf-8") ||
                     strstr(lower_line, "charset=\"utf-8\"")))
                {
                    header = CHARSET;
                }
                else
                {
                    header = CONTENT_TYPE_BODY;
                }
            }
        }

        // Charset matched
        else if ((strstr(lower_line, "charset=utf-8") || strstr(lower_line, "charset=\"utf-8\"")) && (header == CONTENT_TYPE_BODY || header == CONTENT_TYPE_BODY_LAST))
        {
            if (header == CONTENT_TYPE_BODY_LAST)
            {
                header = IN_BODY;
            }
            else
            {
                header = CHARSET;
            }
        }

        // Content-Transfer-Encoding matched
        else if ((header == CHARSET || header == BOUNDARY_MATCH) &&
                 strstr(lower_line, "content-transfer-encoding:") && (strstr(lower_line, "quoted-printable") || strstr(lower_line, "7bit") || strstr(lower_line, "8bit")))
        {
            if (header == CHARSET)
            {
                header = IN_BODY;
            }
            else
            {
                header = CONTENT_TRANSFER_ENCODING;
            }
        }

        // Reach the final block of body part
        else if (header == IN_BODY && (strncmp(line, boundary, strlen(boundary)) == 0))
        {
            break;
        }

        // The line read is in the body
        else if (header == IN_BODY)
        {
            // Skip printing the header inside body
            if (first_line < 2)
            {
                first_line += 1;
            }
            else if (first_line == 2 && strlen(prev_line) > 0)
            {
                printf("%s", prev_line); // print content of the email
            }
        }
        strcpy(prev_line, line); // Current line becomes prev line
    }
}

// Get boundary parameter without unrelevant characters
void get_boundary_parameter(char boundary[], char line[], int len)
{
    line = line + len; // Parameter start after boundary parameter tag
    int count = 2;     // First two index are -

    // Store the boundary parameter as a string
    for (int i = 0; i < strlen(line); i++)
    {
        if (line[i] != '"' && line[i] != '\'' && line[i] != ';')
        {
            boundary[count] = line[i];
            count++;
        }
    }
    boundary[count] = '\0';
}

// Convert the string to lowercase
void to_lowercase(char *str)
{
    for (; *str; ++str)
        *str = tolower((unsigned char)*str);
}