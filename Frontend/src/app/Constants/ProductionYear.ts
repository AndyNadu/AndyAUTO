export class ProductionYear {
  static readonly productionYears: number[] = this.generateYears();

  static generateYears(): number[] {
    let numberlist = [];

    for (let year = 1950; year <= 2024; ++year)
      numberlist.push(year);

    return numberlist;
  }
}
