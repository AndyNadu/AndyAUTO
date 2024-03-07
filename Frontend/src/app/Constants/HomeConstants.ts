export class HomeConstants {

  // members
  carState: string = 'New cars';

  photoURL: string = "./assets/Images/m5.jpg";
  readonly dealerDescription: string = `AndyAUTO has been an authorized car dealer in Romania for over 29 years. We welcome you to our showrooms in Craiova, Bucharest, and Cluj - Napoca with a diverse portfolio of new and pre - owned vehicles of the highest quality, ensuring that you benefit from pre - owned car sales services and post - sales services at the highest standards.`;
  stateDescription: string = `Our company approaches everything with a tremendous passion for cars and a deep sense of responsibility towards you, our customer. The same passion is embedded in every vehicle, and we feel it in our hearts every time we see a model leaving the AndyAUTO gate.<br><br>At AndyAUTO you will find the best models at advantageous prices. All new vehicles in stock are available for immediate delivery. We invite you to explore the new car models available at AndyAUTO. You will find comprehensive information about any model you are already familiar with.`;
  readonly testDriveDescription: string = `A true experience involves all senses. Apply for a Test Drive Session and enjoy the ultimate driving experience behind the wheel of any car.`;
  readonly leasingDescription: string = `Purchase a new Mercedes-Benz car, a Certified pre-owned Mercedes-Benz vehicle, or a fleet of vehicles for your business through the auto financing program offered by AndyAUTO. You will enjoy completely transparent costs, fully deductible expenses and VAT, as well as excellent protection through insurance services integrated into the Mercedes-Benz partner network.`

  // methods
  onStateChanged(_carState: string): void {
    this.carState = _carState;

    this.stateDescription = this.carState === 'New cars' ?
      `Our company approaches everything with a tremendous passion for cars and a deep sense of responsibility towards you, our customer. The same passion is embedded in every vehicle, and we feel it in our hearts every time we see a model leaving the AndyAUTO gate.<br><br>At AndyAUTO you will find the best models at advantageous prices. All new vehicles in stock are available for immediate delivery. We invite you to explore the new car models available at AndyAUTO. You will find comprehensive information about any model you are already familiar with.` :
      `Pre-owned cars of the highest quality available for immediate pick-up, tested in +200 points with transparent history. <br><br> We created the pre-owned cars concept to offer you the perfect car at an advantageous price. If you are a practical person and weigh all aspects when making a decision, AndyAUTO pre-owned cars meets your needs.`;

    this.photoURL = this.carState === 'New cars' ? "./assets/Images/m5.jpg" : "./assets/Images/m4.png";
  }

}
