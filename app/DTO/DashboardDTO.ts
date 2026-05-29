import { NotesDTO } from "./NotesDTO";
import { Tag, TagDTO } from "./TagDTO";

export class DashBoardDTO {

  notes: NotesDTO[] = [];
  tags: Tag[] = [];
}
