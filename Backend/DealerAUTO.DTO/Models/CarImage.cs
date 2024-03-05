#nullable disable

namespace DealerAUTO.DTO.Models
{
    public partial class CarImage
    {
        public int Id { get; set; }
        public int CarId { get; set; }
        public byte[] PhotoAsByteArray { get; set; }
    }
}
