# stories

**About:**
A server side rendered, message-board style app with login, user sessions, and an
integrated postgres database.

**Technologies:**
Backend: Node.js, Express, Postgres, EJS template engine (edited) 

**Login:** Session information was handled by Express.js session storage and stored in a postgres database. Bcrypt node package was 
used to hash the password. I used RegEx for server side validation.

**Database:** User credentials, posts and comments are stored in a Postgres database with relational tables.
	
**View:** EJS was used as the template language.
Deployed: https://mrbutak-story-app.herokuapp.com/
