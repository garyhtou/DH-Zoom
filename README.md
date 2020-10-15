# DH Zoom

A dashboard for ever-changing Zoom links.

For Bellevue College, Dale Hoffman, Math 153, Fall 2020.

![DH-Zoom Example](https://user-images.githubusercontent.com/20099646/95352712-58dde680-0877-11eb-89db-d4819fc95e66.JPG)

## How it Works

This is a Create React App that uses the Ant Design framework and a Firebase Realtime Database to store the zoom links. A set of zoom links is sent out each day (which is manually inputed into the database). The static website pulls today's zoom links from the database and displays them as easy to click buttons. This website also features class updates and upcoming due dates.

## Built With

`React` `Firebase` `Ant Design` `moment`

### Firebase Realtime Database Rules

```JSON
{
  "rules": {
    ".read": false,
    ".write": false,
    "links": {
      ".read": true,
    }
  },
}
```
