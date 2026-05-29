//view object
export class Tag {
  id: number = 0;
  created_at: string = "";
  updated_at: string = "";
  name: string = "";
}

//send DTO
export class AddTagDTO {
  name: string = "";
  constructor(data: Partial<AddTagDTO> = {}) {
    this.name = data.name || '';
  }
}

//receive DTO
export class ReceiveTagDTO extends Tag {
}
