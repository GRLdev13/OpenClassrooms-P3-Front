import { AddTagDTO,Tag } from "./TagDTO";

export class NotesDTO {
  id: number = 0;
  tag: Tag = new Tag();
  text: string = "";

  constructor(data: Partial<NotesDTO> = {}) {
    this.id = data.id || 0;
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

export class DeleteNoteDTO {
  id_note: number = 0;

  constructor(data: Partial<DeleteNoteDTO> = {}) {
    this.id_note = data.id_note || 0;
  }
}
