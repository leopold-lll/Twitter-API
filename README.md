### Twitter-API
This repository contain an implementation of some Twitter-inspired APIs.

### Steps to start the application
- git clone https://github.com/leopold-lll/Twitter-API.git
- npm install
- node start.js

### Host of API
The API is hosted on heroku at link:
	https://twitter-stefano-leonardi.herokuapp.com

### HOW TO USE API TWITTER
***URLs***
- Upload new tweets									(POST - /twitter)		 -> body parameter
- Fetching the latest tweets						(GET  - /twitter)
- Fetching the latest tweets of a specific user		(GET  - /twitter?userID=:id)
- Searching for tweets containing specific words	(GET  - /twitter/search?words[]=:words& ... &words[]=:words)

***More details***
Read Apiary documentation at https://app.apiary.io/twitterlike/editor