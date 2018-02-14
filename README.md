### Twitter-API
This repository contain an implementation of some API inspirated to twitter.

### Steps to start the application
- git clone https://github.com/leopold-lll/Twitter-API.git
- npm install
- node start.js

### HOW TO USE API TWITTER
***URLs***
- Upload new tweets									(POST - /twitter)		 -> body parameter
- Fetching the latest tweets						(GET  - /twitter)
- Fetching the latest tweets of a specific user		(GET  - /twitter?userID=:id)
- Searching for tweets containing a specific word	(GET  - /twitter/search1/:word)
- Searching for tweets containing specific words	(GET  - /twitter/search) -> body parameter

***More details***
Read Apiary documentation at https://app.apiary.io/twitterlike/editor