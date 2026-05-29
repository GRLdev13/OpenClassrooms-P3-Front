//view object
export abstract class Authentification {
  name: string = "";
  email: string = "";
  password: string = "";
}

export class RegisterUserDTO extends Authentification{
  passwordConfirmation: string = "";

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
      this.name = data.name || "";
      this.email = data.email || "";
      this.password = data.password || "";
  }
}
