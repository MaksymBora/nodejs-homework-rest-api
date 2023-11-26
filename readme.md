## Node.js Web Server + MongoDB

A brief Guide for my Node.js web server's API endpoints:

## 1. User Registration

``
Path: POST https://www.web4you.space/users/register Request Body (JSON): ``
<br>``
{ "password": "your password", "email": "example@email.com" } 
``
<br>
## 2. User Verification

Path: POST https://www.web4you.space/users/register/users/verify Request Body
(JSON): { "email": "email used during registration" }

<br>
## 3.User Login

Path: POST https://www.web4you.space/users/login Request Body (JSON): {
"password": "your password", "email": "your email" };

<br>
## 4. User Logout

Path: POST https://www.web4you.space/users/logout - Token is passed within the
request.

<br>
## 5. Update user's Avatar

Path: PATCH https://www.web4you.space/users/avatars Form-Data => key = "avatar"
value = image file; and Authorization Token;

<br>
## 6. Update type of Subscription

Path: PATCH https://www.web4you.space/users Request Body (JSON): {
"subscription": "'starter', 'pro', 'business'"}; and Authorization Token;

<br>
## 7. Get Current User Data

Path: GET https://www.web4you.space/users/current Request Body (JSON): none;
Token is passed within the request.
