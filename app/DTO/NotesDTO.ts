import { AddTagDTO,Tag } from "./TagDTO";

export class NotesDTO {
  tag: Tag = new Tag();
  text: string = "";

  constructor(data: Partial<NotesDTO> = {}) {
    this.text = data.text || "";
  }
}

export class AddNotesDTO {
  text: string = "";
  tag_id: number = 0;

  constructor(data: Partial<AddNotesDTO> = {}) {
    this.text = data.text || "";
    this.tag_id = data.tag_id || -1;
  }
}
