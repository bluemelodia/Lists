# List

[Project] Remember upcoming birthdays (both solar and lunar), gifts, meetings, and tasks with this handy app. Users can opt into email and text notifications for upcoming events.

This app provides the user with the ability to keep all gift-giving information, such as a person's solar and/or lunar birthday, mailing address, email, phone number, and maximum budget, in one place. Users can also create records of gifts that they have given out in the past, create meetings and tasks, and receive e-mail and text reminders of upcoming birthdays, meetings, and tasks.

Home
- Provides a top-level view of the user's upcoming birthdays, meetings, and tasks.

Calendar
- A two-year calendar view that displays as a monthly planner on smaller screens.
- Users can see the number of significant events on a particular day, week, or month.
- Clicking on an event type (ex. birthday) routes the user to the corresponding page.

Menu
- The menu is used for navigation between the app's major pages.

Add Recipient
- The Add Recipient form allows the user to provide information related to gift-giving, including the recipient's name, birthdate (including whether the birthday is lunar or solar), email, phone number, mailing address, and budget.
- Users can optionally upload a profile image that best represents the recipient.
- Users can specify how they would like to contact the recipient on their birthday (ex. call, text), and whether they would like to send a gift.

Birthdays
- Users can view and modify a list of solar and lunar birthdays. 
- Each birthday is marked with an indicator of whether the date has already passed in the current calendar year.
- Upcoming birthdays will be marked with an indicator of how close the birthday is.
- On larger screens, the each recipient's profile image (if one was provided) will be displayed.

Settings
- Users who wish to receive e-mail and text notifications of upcoming events can provide their e-mail address and phone number, respectively.
- Users can select which types of events they wish to receive notifications for.

## Architecture



## Build

1. npm i
2. Install node v.16 locally:

   nvm install 16

Output:
v16.14.2 is already installed.
Now using node v16.14.2 (npm v8.5.0)

3.  npm run build --prod
4.  Copy the contents of the dist folder to the www sub-directory:

    cp dist/lists/\* ../www/list/ -r

5.  Set the base href in index.html:

<base href="/list/">

6.  Modify the nginx configuration:

    ### Remove root, then use alias for each Angular app.

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

7.  Visit guacnbean.com/list




## Known Issues

- updateOn: "submit" does not work consistently with all input forms. dateAndTimeValidator runs in-between submits (ex. user updates the Add Meeting datepicker field, and the error will update in real time, instead of on the next submit).

## TODO

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
