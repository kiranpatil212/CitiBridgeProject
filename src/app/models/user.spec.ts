import { User } from './user';

describe('User', () => {
  it('should create an instance', () => {
    var user = new User ;
    user.userId = "ABC"
    user.password = "ABC123"
    expect(user.userId).toBe("ABC");
    expect(user.password).toBe("ABC123");
  });
});
