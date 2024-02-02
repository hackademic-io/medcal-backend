module.exports = class UserDto {
  email;
  name;
  last_name;
  role;
  id;
  isActivated;

  constructor(model) {
    this.email = model.email;
    this.id = model.user_id;
    this.role = model.role;
    this.name = model.name;
    this.last_name = model.last_name;
    this.isActivated = model.isactivated;
  }
};
