export default class Event {
    constructor(id, title, description, createdBy, invites) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.createdBy = createdBy;
        this.invites = invites;
    }

    inviteUser = (id) => {
        this.invites.push(id);
    };

    cancelInvite = (id) => {
        const index = this.invites.indexOf(id);
        if(index > -1) {
            this.invites.splice(index, 1)
        }
    }
}