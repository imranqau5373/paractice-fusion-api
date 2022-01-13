const patients = [];

module.exports = class Patient {
    constructor(name,address) {
        this.name = name;
        this.address = address;
    }

    save() {
        patients.push(this);
    }

    static fetchAll() {
        return patients;
    }
}