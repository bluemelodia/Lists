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

## TODO

### Login

1. Users login with an email and password.

### Topics

1. Users should be able to rearrange categories however they want.
2. The first time they use the app, the arrangement will be default.
3. If they rearrange, save their preferences to a database and reload on login.
4. Users can add as many categories as they want, however the default ones won't be deleted.
5. Users can choose an image to upload for the topic.
6. Users can choose the name for their topic, and it shouldn't overlap with an existing one.
7. These topics are displayed on the topics page.
8. When a user selects a topic, a snapshot view will be shown (allowing users to compare topics). This view is scrollable but interactivity is limited.
9. The user has the opportunity to go to full screen view with any topics, where they can now view and interact with all widgets.
10. In both the snapshot and full screen views, users can see a list of imminent tasks.
11. When users decrease the size of the viewport, the column will shift to 2 -> 1 column.
12. The category screen is mainly a place to add new categories and see top-level information. User shouldn't be able to do everything on the categories page.
13. On the tile view users can see - # of upcoming events.
14. Either wrap or shrink long title names.

### Widgets

1. Users should be able to add a money widget that shows them amount due - to whom - and the due date.
2. Users should be able to add a picture of a check or a receipt indicating proof of payment.
3. This widget can be added to any topic.
4. Users should be able to move a particular widget from one topic to another (whilst saving all the data).

5. Users should be able to add a birthday widget that lists the birthdays of each person.
6. The birthday widget should allow for both lunar and solar dates.
7. If the user has a lunar birthday then the reminder will be adjusted based on that.
8. The user should be able to specify what present they have purchased and mark as complete. Links to Amazon/etsy listings allowed.
9. A reminder should be sent a month in advance, a week in advance, three days before, and day of.
10. User should be able to mark each contact by action - ex. call, send text, buy present, throw party.

11. User should be able to add one time events to each topic and also outside any topic. These can also have widgets added to them.
12. One time events will have their own full-screen view.

13. Note-taking view - user should be allowed to paste in any notes and links in here.
14. Standard checklist with check boxes.

## Limited View

Should show:

- List of urgent todos at the top
- List of events
- Opp to go to full screen

## Navigation

User can nav to each topic individually. New option will be dynamically added.
User can go to settings, where they can change reminder frequencies.
User can be taken to a calendar view to see a bird's eye view of all events.

## Alerts

User should be texted when events are coming up.

## Media

Videos, images, and links should all be renderable.

## Event

As we get closer to the due date the color of the item should be changed.
Events markable as one-time or recurring. Can be marked as complete so no more alerts are sent.
These two event types should be displayed differently on the calendar view.
If an item has no deadline, no reminders are sent.
If an item is overdue the number of days overdue will be shown.

## Server-side

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
