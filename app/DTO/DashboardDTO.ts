import { NotesDTO } from "./NotesDTO";
import { Tag, AddTagDTO } from "./TagDTO";

export class DashBoardDTO {

  notes: NotesDTO[] = [];
  tags: Tag[] = [];
}
