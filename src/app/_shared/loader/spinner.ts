export class Spinner {
    show: boolean;
    showSpinner: boolean;
  
    constructor(init?: Partial<Spinner>) {
      Object.assign(this, init);
    }
  
    static create(init?: Partial<Spinner>): Spinner {
      return new Spinner(init);
    }
}
  