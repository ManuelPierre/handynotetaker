Note Taker

## Description

I created an application that can be used to write, save, and delete notes. This application utilizes an express backend and saves and retrieves note data from a JSON file.

I connected the application frontend to a backend I built by building the following HTML routes. The two routes are GET `/notes` which returns the `notes.html` file, and GET `*` which returns the `index.html` file.bbThe application has a `db.json` file on the backend that is used to store and retrieve notes using the `fs` module.

I created the following API routes. They are GET `/api/notes` which reads the`db.json` file and returns all saved notes as JSON. The POST `/api/notes` route which receives a new note to save on the request body, and adds it to the `db.json` file, and then returns the new note to the client. The third route is DELETE `/api/notes/:id` which receives a query parameter containing the id of a note to delete. I gave each note a unique `id` when it's saved. In order to delete a note, I read all notes from the `db.json` file, removed the note with the given `id` property, and then rewrote the notes to the `db.json` file.

Altogether, the user will be able to write and save notes. They can delete notes they wrote before. Users that need to keep track of a lot of information are able to take persistent notes which allow them to have written information available when needed.
