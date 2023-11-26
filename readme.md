## Node.js Web Server + MongoDB

A brief Guide for my Node.js web server's API endpoints:

## 1. User Registration

`Path: POST https://www.web4you.space/users/register Request Body (JSON):`
<br>`{ "password": "your password", "email": "example@email.com" } ` <br>

## 2. User Verification

`Path: POST https://www.web4you.space/users/register/users/verify Request Body (JSON):`
<br>`{ "email": "email used during registration" }` <br>

## 3. User Login

`Path: POST https://www.web4you.space/users/login Request Body (JSON):`
<br>`{"password": "your password", "email": "your email" };`

<br>

## 4. User Logout

`Path: POST https://www.web4you.space/users/logout - Token is passed within the request.`

<br>

## 5. Update user's Avatar

`Path: PATCH https://www.web4you.space/users/avatars`
<br>`Form-Data => key = "avatar" value = image file; and Authorization Token;`
<br>

## 6. Update type of Subscription

`Path: PATCH https://www.web4you.space/users Request Body (JSON):`
<br>`{"subscription": "'starter', 'pro', 'business'"}; and Authorization Token;`
<br>

## 7. Get Current User Data

`Path: GET https://www.web4you.space/users/current`
<br>`Request Body (JSON): none; Token is passed within the request.`

## 8. Get All Contacts

`Path: GET https://www.web4you.space/api/contacts`
<br>`Request Body (JSON): none; Token is passed within the request.`

## 9. Get Contact by ID

`Path: GET https://www.web4you.space/api/contacts/:contactId`
<br>`Request Body (JSON): none; Token is passed within the request.`

## 10. Add new Contact

`Path: POST https://www.web4you.space/api/contacts`
<br>`{"name": "contact name", "email": "example@email.com", "phone": "max 10 figures"}; and Authorization Token;`
<br>

## 11. Update contact's information

`Path: PUT https://www.web4you.space/api/contacts/:contactId`
<br>`{"name": "contact name", "email": "example@email.com", "phone": "max 10 figures"}; and Authorization Token;`
<br>

## 12. Update contact's Status (favorite)

`Path: PATCH https://www.web4you.space/api/contacts/:contactId/favorite`
<br>`{"favorite": "true OR false", }; and Authorization Token;` <br>

## 13. Delete Contact

`Path: PATCH https://www.web4you.space/api/contacts/:contactId`
<br>`Request Body (JSON): none; Token is passed within the request.` <br>
