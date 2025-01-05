# Email Client

This project implements a simple email client that interacts with a standards-compliant IMAP server to download and parse emails. The program supports multiple commands such as retrieving emails, parsing headers, handling MIME (Multimedia Internet Mail Extensions) messages, and listing email subjects.

## Features
- **Retrieve**: Downloads the latest email or a specified email from the server.
- **Parse**: Displays email headers.
- **MIME**: Decodes and displays the text/plain version of MIME-encoded emails.
- **List**: Lists all email subject lines from the specified folder.

## Error Handling
The program handles various errors, such as incorrect login credentials, invalid folder names, missing emails, or failed commands, and prints appropriate messages.

## Technologies Used
- Programming Language: C
- IMAP Protocol: RFC 3501
- MIME Decoding: RFC 2045, RFC 2046

## My Contribution
I was responsible for developing the Input Command, Retrieve, and MIME functionalities in the project. This included:
### 1. Logging In
    - Establishing a connection with the IMAP server and handling the login process using the provided credentials.
### 2. Retrieve
    - Processing the command-line inputs, connecting to the IMAP server, and retrieving either a specified email or the most recent email. The raw email content, including both headers and body, is then printed to the output.
### 3. MIME
    - Parsing and decoding the MIME headers, extracting the first text/plain body part with UTF-8 encoding, and displaying it in plain ASCII format.
