# DH Zoom

A Dashboard for ever changing zoom links.

Made for Bellevue College, Dale Hoffman, Math 153, Fall 2020

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
