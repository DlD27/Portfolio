#include "client.h"
#include <string.h>
#include <stdio.h>
#include "retrieve.h"
#include "parse.h"
#include "mime.h"
#include "list.h"

int main(int argc, char **argv)
{
    ignore_sigpipe();
    Command command = setup_connection(argc, argv);

    // Handle given command
    if (strcmp(command.name, "retrieve") == 0)
    {
        // Retrieve task 2.3
        retrieve_command(command.sockfd, command.messageNum);
    }
    else if (strcmp(command.name, "parse") == 0)
    {
        // Parse task 2.4
        parse_email(command.sockfd, command.messageNum);
    }
    else if (strcmp(command.name, "mime") == 0)
    {
        // Mime task 2.5
        mime_command(command.sockfd, command.messageNum);
    }
    else if (strcmp(command.name, "list") == 0)
    {
        // List task 2.6
        list_subjects(command.sockfd);
    }

    if (command.sockfd != -1)
    {
        close(command.sockfd);
    }
    return 0;
}