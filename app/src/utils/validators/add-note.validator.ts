export class AddNoteValidator {
  static validate(
    title: string,
    content: string
  ): Array<{ field: string; message: string }> {
    const errors: Array<{ field: string; message: string }> = [];

    if (!title.trim()) {
      errors.push({ field: 'title', message: 'Заголовок обязателен' });
    }

    if (!content.trim()) {
      errors.push({
        field: 'content',
        message: 'Текст заметки не может быть пустым',
      });
    }

    return errors;
  }
}
