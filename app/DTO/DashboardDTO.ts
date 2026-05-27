class DashBoardDTO {
  Notes: NotesDTO[] = [];
}

class NotesDTO {
  text: string = "";
  tag: TagDTO = new TagDTO(); //Current linked tags
}

class TagDTO {
  id: string = "";
  created_at: string = "";
  updated_at: string = "";
  name: string = "";
}
