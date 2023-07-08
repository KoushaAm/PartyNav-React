class Event {
    constructor(title, description, date, time, location, messages) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.time = time;
        this.location = location;
        this.messages = messages; // array of chat objects
    }
}
