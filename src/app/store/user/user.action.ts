export class SetUser {
    static readonly type = '[User] Set';
    constructor(public name: string, public email: string) {}
  }
  