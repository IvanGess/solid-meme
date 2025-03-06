export class AuthValidator {
  static validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  static validatePassword(password: string): boolean {
    return password.length >= 8;
  }

  static validate(
    email: string,
    password: string,
    confirmPassword: string,
    isLogin: boolean
  ): Array<{ field: string; message: string }> {
    const errors: Array<{ field: string; message: string }> = [];

    if (!this.validateEmail(email)) {
      errors.push({
        field: 'email',
        message: 'Пожалуйста, введите корректный email',
      });
    }

    if (!this.validatePassword(password)) {
      errors.push({
        field: 'password',
        message: 'Пароль должен содержать минимум 8 символов',
      });
    }

    if (!isLogin && password !== confirmPassword) {
      errors.push({ field: 'confirmPassword', message: 'Пароли не совпадают' });
    }

    return errors;
  }
}
