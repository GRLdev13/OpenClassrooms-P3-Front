//view object
export abstract class Authentification {
  email: string = "";
  password: string = "";
}

export class RegisterUserDTO extends Authentification {
  passwordConfirmation: string = "";
  name: string = "";
  token:string = "";

  constructor(data: Partial<RegisterUserDTO> = {}) {
    super();
    this.name = data.name || "";
    this.email = data.email || "";
    this.token = data.token || "";
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

export class UpdateUserDTO  {
  name: string = "";
  new_email: string = "";
  old_email: string = "";

  constructor(data: Partial<UpdateUserDTO> = {}) {
    this.new_email = data.new_email || "";
    this.old_email = data.old_email || "";
    this.name = data.name || "";
  }
}

export class UpdateUserPasswordDTO extends Authentification  {
  new_password: string = "";
  confirm_password: string = "";

  constructor(data: Partial<UpdateUserPasswordDTO> = {}) {
    super();
    this.password = data.password || "";
    this.confirm_password = data.confirm_password || "";
    this.new_password = data.new_password || "";
    this.email = data.email || "";
  }
}

export class DeleteUserDTO extends Authentification {
  email: string = "";
  passwordConfirmation: string = "";

  constructor(data: Partial<DeleteUserDTO> = {}) {
    super();
    this.email = data.email || "";
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
