export class SellACarConstants {
  checksCategory1: { title: string, checks: string[] } = {
    title: 'Best offers for the following cars:',
    checks: [
      'Maximum age: 10 years',
      'Maximum mileage: 150,000 miles',
      'No major damages in the past'
    ]
  };

  checksCategory2 : { title: string, checks: string[] } = {
    title: 'Included services:',
    checks: [
      'Quick and safe sale',
      'Buy-Back & Trade-In',
      'Test drive'
    ]
  };

  afterSubmitDetails: string[] = [
    '* Your post will be revised in maximum 48 hours by one of our employees. Please be patient!',
    '** AndyAUTO reserves the right to decide which posts will be accepted.',
    '*** The payment of the car is made only after receiving the documents certifying the fiscal cancellation of the car.'
  ];
}