import type { AsyncServiceResult } from '@/core/http-client/interfaces/http-client.interfaces.ts'
import type { NotesApiService } from '@/api/notes/notes.api.ts'
import type { CreateNotePayload, Note } from '@/api/notes/notes.interfaces.ts'

export class NotesService {
  constructor(private readonly _notesApiService: NotesApiService) {}

  async getList(): AsyncServiceResult<Note[]> {
    return await this._notesApiService.getNotes()
  }
  async createNote(payload: CreateNotePayload): AsyncServiceResult<Note> {
    return await this._notesApiService.createNote(payload)
  }

  async deleteNote(id: number): AsyncServiceResult<void> {
    return await this._notesApiService.deleteNote(id)
  }
}
