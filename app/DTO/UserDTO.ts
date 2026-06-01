//view object
export abstract class Authentification {
  email: string = "";
  password: string = "";
}

export class RegisterUserDTO extends Authentification{
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

export class LoginUserDTO extends Authentification{
  constructor(data: Partial<LoginUserDTO> = {}) {
      super();
      this.email = data.email || "";
      this.password = data.password || "";
  }
}
