import type { HttpClient } from '@/core/http-client/http-client.ts';
import type { AsyncServiceResult } from '@/core/http-client/interfaces/http-client.interfaces.ts';
import type { CreateNotePayload, Note } from '@/api/notes/notes.interfaces.ts';
export class NotesApiService {
  constructor(private readonly httpClient: HttpClient) {}

  async getNotes(): AsyncServiceResult<Note[]> {
    return this.httpClient.get<Note[]>('/api/notes');
  }

  async createNote(payload: CreateNotePayload): AsyncServiceResult<Note> {
    return this.httpClient.post<Note>('/api/notes', payload);
  }

  async deleteNote(noteId: number): AsyncServiceResult<void> {
    return this.httpClient.delete<void>(`/api/notes/${noteId}`);
  }
}
