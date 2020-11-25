# Eventor



## Description
If you enjoy making plans, Eventor is your App. Here you will be able to create or join events, where you can meet new people, enjoy the events created by the users and try new things.



## User Stories

- **Signup:** As an anon I can sign up in the platform so that I can start searching for events
- **Login:** As a user I can login to the platform so that I can search, create and join new events
- **Logout:** As a user I can logout from the platform so no one else can use it
- **List of Events** As a user I can see the list of all the events.
- **Filter Events** As a user I can search events by name of event or filter the list of events by the creator of the event, the capacity, where is it going to be and when, having the possibility to filter by Today, Tomorrow, This weekend, This week and All.
- **Details of the event** As a public user I can see the details of each event but not the profiles of the participants.
- **Joining events** As a registered user I can Join an event and see the participant's profile.
- **Add an event** As a user I can create new events.
- **Edit an event** As a user and owner of the event, I can modify the details of it.
- **User profile** As a logged user I can see, edit or delete my profile, and see other rider profiles. 
- **User Calendar** As a user I can see a calendar with the events I joined previously.
- **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist



## Repository links

**Eventor client:** https://github.com/adrimual/Eventor-cli

**Eventor server:** https://github.com/adrimual/Eventor-server

## Backlog

• Fix the map function.

• Add an internal chat.

• Add comment section.

## Endpoints table (REST API)

| Method | Path                                | Body                                                         | Description                          |
| ------ | ----------------------------------- | ------------------------------------------------------------ | ------------------------------------ |
| post   | /signup                             |                                                              | Register a new user                  |
| post   | /login                              |                                                              | Signin                               |
| post   | /logout                             |                                                              | Sign out                             |
| get    | /loggedin                           |                                                              | Check if an user is logged in        |
| post   | /api/files/upload                   |                                                              | Upload pictures to cloudinary        |
| get    | /api/user/event/join/:eventId/:id   |                                                              | Allows an user to join an event      |
| put    | /api/user/event/leave/:eventId/:id  |                                                              | Allows an user to leave an event     |
| get    | /api/user/event/getAllEvents        |                                                              | Get all the events                   |
| get    | /api/user/event/getAllFutureEvents  | via req.query                                                | Get all future events                |
| get    | /api/user/event/getOwner/:eventId   |                                                              | Get the owner of an event            |
| get    | /api/user/event/:userId/owned       |                                                              | Get events where user is owner       |
| get    | /api/user/event/:userId/all/future  |                                                              | Get all future events of a user      |
| put    | /api/user/event/:userId/all         |                                                              | Get all events of a user             |
| get    | /api/user/event/:userId/participant |                                                              | Get events where user is participant |
| post   | /api/user/event/create/:id          | {name, avatar, description, startTime, endTime, city, participants} | Create an event                      |
| delete | /api/user/event/delete/:eventId/:id |                                                              | Delete an event                      |
| get    | /api/user/event/:userId             |                                                              | Get one event                        |
| get    | /api/user/event/name/:eventName     |                                                              | Get event by name                    |
| put    | /api/user/event/:eventId/:id        | {name, avatar, description, startTime, endTime, city, participants} | Update event                         |
| get    | /api/user/event/:userId             |                                                              | Get all events of a person           |
| put    | /api/user/profile/edit/:id          |                                                              | Edit profile                         |
| get    | /api/user/profile/:id               |                                                              | Get user details                     |

## Components

• **Pages:** **-->** auth-page (contains auth-form), calendar-page (contains calendar), events-page (contains event-details, event-form, 					 event-list, event-searchbar), home-page, profile-page (contains personProfile that contains person-form)

• **Ui** 		**-->** Footer, Modal, NavBar, Spinner, Toast

• **App**

## Models

Person model

```javascript
{
    age: {
        type: Number,
        min: 18
    },
    genre: {
        type: String,
        enum: ['Male', 'Female']
    },
    calendar: [Date],

}
```

User model

```javascript
{
    username: {
    	type: String,
    	required: true,
    	minlength: 3,
    	maxlength: 20
    },
    password: {
        type: String,
        required: true,
        minlength: 3
    },
    avatar: {
        type: String, 
        default: "https://res.cloudinary.com/duimkcb6n/image/upload/v1598482424/cuenta-3_qbvhaf.png"
    },
    personDetails: { type: Schema.Types.ObjectId, ref: "Person" }
}
```

Event model

```javascript
{
	owner: { type: Schema.Types.ObjectId, ref: "User" },
    name: {
        type: String,
        required: true,
        maxlength: 40,
        minlength: 2,
        unique: true, 
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/duimkcb6n/image/upload/v1599647919/calendar_icon_jjrlca.png"
    },

    description: {
        type: String,
        required: true,
        maxlength: 500
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }]

}
```



## Links

### Trello/Kanban

[Link to my Trello](https://trello.com/b/ekUkw2Vw/eventor) 

### Git/Deploy



### Prezi
