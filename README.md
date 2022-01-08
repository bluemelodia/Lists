# Lists

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

## Known Issues

- updateOn: "submit" does not work consistently with all input forms. dateAndTimeValidator runs in-between submits (ex. user updates the Add Meeting datepicker field, and the error will update in real time, instead of on the next submit).

## TODO

- User logins and session. Modify logic so that users only see their own account information.
- Daily jobs scanning for upcoming birthdays and events. This should be done on the backend.
- Allow users to add reminders (ex. payment reminders/tasks).
- Show users a calendar of upcoming events.
- Ensure that all fields are propagating edits correctly (birthdays/settings).
- Make the app more responsive, adding animations.
- Show a list of upcoming events on the home page (four widgets, so four sections).
- Add ESLinting
- Fix issue with undefined dates sent out in emails.
- Better network error handling.
- Clear session storage on tab close and logout.
- Test in all browsers.

- TODO list: 
	- Status: Not started, in progress, complete
	- Reminder: Every month, every day, every day of week
	- Due date and time (today, tomorrow, etc.)



- Ensure that only necessary fields are serialized - and all fields are coming back with the right values.

## Navigation

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
