# Palette Pals

Palette Pals is a simple Nodejs app made with Express. This project comes from one of the projects part of the Javascript path on The Odin Project. It includes the use of Nodejs (with Express), PUG for templating, bcryptjs for hashing user passwords, and MongoDB for the database. The app is deployed using Heroku

# Membership Status

Upon arriving on the homepage, messages stored in the database will be loaded using different color palettes. In order to actually create messages, the user will need to sign up for an account. After logging in, the header will change to allow for creating messages and for changing member status.

## Creating A Message

Clicking on the anchor for creating a message will take you to a form that requires a title and a message. Any user can create messages, but only members and admins will be able to see who posted the message and when it was posted.

## Becoming a Member

To become a member, The user will need to know the member password. The password is "doYouRemember". After becoming a memeber, the user will be able to see the author and timestamp of when a message was posted. 

## Becoming an Admin

Similar to becoming a member, but the password is different. You will have to guess the password (Hint: It is related to the member password and it contains a number). Upon becoming an admin, messages will show an "X", and upon clicking it, the message will be deleted from the database.