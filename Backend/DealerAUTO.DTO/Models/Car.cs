﻿#nullable disable

namespace DealerAUTO.DTO.Models
{
    public partial class Car
    {
        public int Id { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public int Year { get; set; }
        public int Mileage { get; set; }
        public string Description { get; set; }
        public string Fuel { get; set; }
        public int CubicCapacity { get; set; }
        public int Power { get; set; }
        public string Transmission { get; set; }
        public string Traction { get; set; }
        public string Body { get; set; }
        public string Wheel { get; set; }
        public int Price { get; set; }
    }
}
