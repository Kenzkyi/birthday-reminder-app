class Users {
  constructor() {
    this.users = [];
  }

  validateUser(username, email, dob) {
    let result = {
      isValid: true,
      error: null,
    };
    if (!username || !email || !dob) {
      result = {
        isValid: false,
        error: "All fields are required",
      };
    }
    if (username.length <= 1) {
      result = {
        isValid: false,
        error: "Username must be at least 2 characters long",
      };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      result = {
        isValid: false,
        error: "Invalid email address",
      };
    }

    if (this.users.find((user) => user.email === email)) {
      result = {
        isValid: false,
        error: "Email already exists",
      };
    }

    const dobRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    if (!dobRegex.test(dob)) {
      result = {
        isValid: false,
        error: "Invalid date of birth",
      };
    }

    const date = new Date(dob);
    if (isNaN(date.getTime())) {
      result = {
        isValid: false,
        error: "Invalid date of birth",
      };
    }
    return result;
  }

  addUser(user) {
    const result = this.validateUser(user.username, user.email, user.dob);
    if (result.isValid) {
      this.users.push(user);
    }
    return result.error;
  }

  getUsers() {
    return this.users;
  }
}

const user = new Users();
module.exports = user;
