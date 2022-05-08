# List

# TODO:

- change password
- forgot password

[Project] Remember upcoming birthdays (both solar and lunar), gifts, meetings, and tasks with this handy app. Users can opt into email and text notifications for upcoming events.

This app provides the user with the ability to keep all gift-giving information, such as a person's solar and/or lunar birthday, mailing address, email, phone number, and maximum budget, in one place. Users can also create records of gifts that they have given out in the past, create meetings and tasks, and receive e-mail and text reminders of upcoming birthdays, meetings, and tasks.

Login / Sign Up

- Users can create an account using an e-mail address and password.
- Once the account is created, users can log in with their credentials.

<img src="./screenshots/sign-up.png"/>
<img src="./screenshots/sign-up-small.png"/>

Home

- Provides a top-level view of the user's upcoming birthdays, meetings, and tasks.

<img src="./screenshots/home.png"/>

Calendar

- A two-year calendar view that displays as a monthly planner on smaller screens.
- Users can see the number of significant events on a particular day, week, or month.
- Clicking on an event type (ex. birthday) routes the user to the corresponding page.

<img src="./screenshots/calendar.png"/>
<img src="./screenshots/calendar-small.png"/>

Menu

- The menu is used for navigation between the app's major pages.

<img src="./screenshots/menu.png"/>

Add Recipient

- The Add Recipient form allows the user to provide information related to gift-giving, including the recipient's name, birthdate (including whether the birthday is lunar or solar), email, phone number, mailing address, and budget.
- Users can optionally upload a profile image that best represents the recipient.
- Users can specify how they would like to contact the recipient on their birthday (ex. call, text), and whether they would like to send a gift.

<img src="./screenshots/create-recipient.png"/>
<img src="./screenshots/country-selector.png"/>
<img src="./screenshots/lunar-cal.png"/>
<img src="./screenshots/lunar-cal-small.png"/>

Add Gift

- The Add Gift form allows users to record a gift that was previously given to a recipient, or track future gifts they plan to give. Only recipients that were added through the Add Recipient form will appear on the recipients drop-down.
- The user can specify additional information about the gift, such as the occasion and the year it was gifted.
- The user can optionally upload an image of the gift and provide a description of the gift.

<img src="./screenshots/add-gift.png">
<img src="./screenshots/add-gift2.png">

Add Meeting

- The Add Meeting form allows users to create a meeting.
- Users can specify the name of the event, the location (including whether it is virtual), the start and end dates/times, and optionally provide a description of the meeting.

<img src="./screenshots/create-meeting.png">

Add Task

- The Add Task form allows users to create a task.
- Users can specify the name of the task, its recurrence, and optionally provide a description of the task.
- Depending on the task recurrence, users can specify the status of the task (ex. whether it is completed or in progress), and the due date/time.

<img src="./screenshots/create-task.png"/>

Birthdays

- Users can add (if no solar and/or lunar birthdays have been added), view, and modify a list of solar and lunar birthdays through this page.
- Each birthday is marked with an indicator of whether the date has already passed in the current calendar year.
- Upcoming birthdays will be marked with an indicator of how close the birthday is.
- On larger screens, the each recipient's profile image (if one was provided) will be displayed.

<img src="./screenshots/birthdays.png"/>
<img src="./screenshots/birthdays-small.png"/>

Gifts

- Users can view and modify (edit, delete) a list of gifts they've registered.
- There are options to sort by the recpient name, occasion, price, and year gifted.
- Users can also filter the list of gifts by recipient.

<img src="./screenshots/gift.png">
<img src="./screenshots/gift2.png">

Meetings

- Users can view and modify (edit, delete) their list of meetings.
- Meetings with an imminent start date will show a badge based on their proximity to the current date and time.
- Virtual meetings will be shown with a special badge.

<img src="./screenshots/meetings.png">

Tasks

- Users can view and modify (edit, delete) their list of tasks.
- Tasks will show a badge based on their recurrence (ex. one-time) and status (ex. not started).
- Users can filter tasks based on recurrence and status.

<img src="./screenshots/task.png"/>

Settings

- Users who wish to receive e-mail and text notifications of upcoming events can provide their e-mail address and phone number, respectively.
- Users can select which types of events they wish to receive notifications for.

<img src="./screenshots/settings.png">

Session

- Users will be shown a dialog if they have been inactive for 4 minutes. If they do not action the dialog, or choose not to prolong their session, the session will be ended.
- The idle timeout is reset each time a service request is completed. Once the session timeout warning is shown, the idle timeout will be cleared, with no option to renew it for the remainder of this session.
- Users will recieve a dialog warning once the session is about to end. The session will automatically end after 15 minutes, or after 5 minutes of inactivity.

<img src="./screenshots/session.png">

## Architecture

The client and server apps are hosted on the same server.

The Node server is responsible for:

- Handling calls to fetch the Chinese calendar (http://ccal.chinesebay.com/cgi-bin/ccal.cgi/).
- Login / registration.
- CRUD calls for the recipient, meeting, and task-related operations.

This server, along with a cron job that is run every 24 hours to send emails and/or texts about upcoming events to subscribed users, is kept active using the PM2 process manager.

A SQLite database is used to store user data.

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
