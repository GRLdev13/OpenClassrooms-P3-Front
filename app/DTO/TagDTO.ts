//view object
export class Tag {
  id: number = 0;
  created_at: string = "";
  updated_at: string = "";
  name: string = "";
}

//send DTO
export class TagDTO {
  name: string = "";
  constructor(data : TagDTO) {
    this.name = data.name || '';
  }
}

//receive DTO
export class ReceiveTagDTO extends Tag {
}
