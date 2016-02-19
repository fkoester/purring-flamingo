# purring-flamingo

**CAUTION: This is a work in progress.**

This project aims to create a standalone server allowing to share (download and upload) a directory with other people over an intuitive but powerful web interface. It is intended to be a replacement for file sharing via E-Mail attachments without its limitations:

* No maximum file size limit
* Encrypted file transfer via HTTPS

Authentication can either be done by logging in via username/password and/or by sending someone a unique URL including an access token. The web app also includes a user management for adding/removing users. The administrator can enable separated folders for each user so they cannot see the other users' files.

For displaying the directory structures we use the fantastic [angular-filemanager](https://github.com/joni2back/angular-filemanager) widget.

As a storage backend we use the [Node.js bridge](https://github.com/fkoester/angular-filemanager-nodejs-bridge).
