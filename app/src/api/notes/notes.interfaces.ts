export interface Note {
  id: number
  title: string
  content: string
}

export interface CreateNotePayload {
  title: string
  content: string
}
