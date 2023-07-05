// make a user model with params : name, email, password

class User  {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;

  }
}

module.exports = User;