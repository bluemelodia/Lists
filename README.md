# Lists

## Build

1. npm i
2. Install node v.16 locally:
   nvm install 16

Output:
v16.14.2 is already installed.
Now using node v16.14.2 (npm v8.5.0)

3. npm run build --prod
4. Copy the contents of the dist folder to the www sub-directory:
   cp dist/lists/* ../www/list/ -r
5. Set the base href in index.html:
	<base href="/list/">
6. Modify the nginx configuration:

	# Remove root, then use alias for each Angular app.

	location ^~ / {
		alias /home/guac/www/;		

		# First attempt to serve request as file, then
		# as directory, then fall back to displaying a 404.
		try_files $uri $uri/ /index.html =404;
	}

	location ^~ /list/ {
		alias /home/guac/www/list/;
		try_files $uri $uri/ /list/index.html =404;
	}

7. Visit guacnbean.com/list

## Architecture

## Known Issues

- updateOn: "submit" does not work consistently with all input forms. dateAndTimeValidator runs in-between submits (ex. user updates the Add Meeting datepicker field, and the error will update in real time, instead of on the next submit).

## TODO

- Ensure that all fields are propagating edits correctly (birthdays/settings).
- Test in mobile.
- Make sure that cron jobs are scheduled for multiple users.

## Credit

Icons made by:
<a href="https://www.flaticon.com/authors/dmitri13" title="dmitri13">dmitri13</a>
<a href="https://www.freepik.com" title="Freepik">Freepik</a>

from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>

Tutorials:
<a href="https://www.freecodecamp.org/news/how-to-make-image-upload-easy-with-angular-1ed14cb2773b/">
How to make image upload easy with Angular
</a> by Filip Jerga

<a href="https://blog.angular-university.io/angular-push-notifications/">
	Angular Push Notifications: a Complete Step-by-Step Guide
</a>

<a href="https://dev.to/clairecodes/why-its-important-to-give-your-html-button-a-type-58k9">
	Why it's important to give your HTML button a type
</a>
