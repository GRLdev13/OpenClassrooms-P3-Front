import { TagDTO } from "./TagDTO";

export class NotesDTO {
  text: string = "";
  tag: TagDTO = new TagDTO();
}