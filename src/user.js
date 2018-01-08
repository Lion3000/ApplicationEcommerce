class User {

  constructor(name, firstName) {
    this.name = name;
    this.firstName = firstName;
  }

  sayHi() {
    alert(this.name + this.firstName);
  }
};
module.exports = User;

