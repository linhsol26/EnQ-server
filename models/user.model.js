class User {
  constructor(options) {
    this.displayName = options.displayName; //string
    this.email = options.email; //string
    this.id = options.id; //string
    this.photoURL = options.photoURL; //string
    this.rank = options.rank; //string
    this.point = options.point; //string
    this.testHistory = options.testHistory; // Array<TestExamHistory.id> (<=5)
  }
}

module.exports.User = User;