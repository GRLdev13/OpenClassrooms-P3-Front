export class DashBoardDTO {
  Notes: NotesDTO[] = [];

// Helper function to map API response to DashboardDTO
public static MapData (data: any): DashBoardDTO {
  const dashboard = new DashBoardDTO();

  if (Array.isArray(data)) {
    dashboard.Notes = data.map((item) => ({
      text: item.content || item.text || "",
      tag: {
        id: item.tag?.id || item.id || "",
        created_at: item.tag?.created_at || item.created_at || "",
        updated_at: item.tag?.updated_at || item.updated_at || "",
        name: item.tag?.name || item.name || "",
      },
    }));
  } else if (data.Notes) {
    dashboard.Notes = data.Notes;
  }

  return dashboard;
};

}

export class NotesDTO {
  text: string = "";
  tag: TagDTO = new TagDTO();
}

export class TagDTO {
  id: string = "";
  created_at: string = "";
  updated_at: string = "";
  name: string = "";
}


