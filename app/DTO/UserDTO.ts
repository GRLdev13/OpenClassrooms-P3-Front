//view object
export abstract class Authentification {
  email: string = "";
  password: string = "";
}

export class RegisterUserDTO extends Authentification {
  passwordConfirmation: string = "";
  name: string = "";

  constructor(data: Partial<RegisterUserDTO> = {}) {
    super();
    this.name = data.name || "";
    this.email = data.email || "";
    this.password = data.password || "";
    this.passwordConfirmation = data.passwordConfirmation || "";
  }
}

export class LoginUserDTO extends Authentification {
  constructor(data: Partial<LoginUserDTO> = {}) {
    super();
    this.email = data.email || "";
    this.password = data.password || "";
  }
}

export class LoggedUserDTO extends Authentification {
  name: string = "";
  token: string = "";

  constructor(data: Partial<LoggedUserDTO> = {}) {
    super();
    this.name = data.name || "";
    this.email = data.email || "";
    this.password = data.password || "";
    this.token = data.token || "";
  }
}

export class UpdateUserDTO extends Authentification {
  name: string = "";

  constructor(data: Partial<UpdateUserDTO> = {}) {
    super();
    this.email = data.email || "";
    this.name = data.name || "";
  }
}

export class DeleteUserDTO extends Authentification {
  userId: string = "";
  passwordConfirmation: string = "";

  constructor(data: Partial<DeleteUserDTO> = {}) {
    super();
    this.password = data.password || "";
    this.passwordConfirmation = data.passwordConfirmation || "";
  }
}

export class UpdatePasswordDTO extends Authentification {
  passwordConfirmation: string = "";

  constructor(data: Partial<UpdatePasswordDTO> = {}) {
    super();
    this.email = data.email || "";
    this.password = data.password || "";
    this.passwordConfirmation = data.passwordConfirmation || "";
  }
}
