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

- Daily jobs scanning for upcoming birthdays and events. This should be done on the backend.
- Show users a calendar of upcoming events.
- Ensure that all fields are propagating edits correctly (birthdays/settings).
- Fix issue with undefined dates sent out in emails.
- Better network error handling.
- Test in all browsers.
- Users should be reminded of tasks (both recurring and one-time with due date).
- Encrypt usernames/passwords? Expire the session after 15 minutes.
- Confirm that user sessions are lasting the expected amount of time.
- Sort tasks by due date. Only show the upcoming ones (not all - limit to 10), filter out past ones. (Nah, let's show overdue and mark it as such until it's completed).
  - Only the ones with due dates should be shown on the dashboard...
- Title bar sometimes disappears after user logs back in.
- Fix this issue on home: ERROR TypeError: object null is not iterable (cannot read property Symbol(Symbol.iterator))
- Show user session warnings? The countdown would have to be on the client side from the time of login.
- When the user clicks on the calendar date, show the list of events (if they exist).
- The start date is incorrectly said to be after end date, even though it's correct - Meeting.

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
