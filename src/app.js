import module from './scripts/module';

class App {
  constructor() {
    this.greet = module.greet;
    console.log(this.greet());
  }
}
