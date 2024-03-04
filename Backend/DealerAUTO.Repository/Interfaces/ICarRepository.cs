using DealerAUTO.DTO.Models;

namespace DealerAUTO.Repository.Interfaces
{
    public interface ICarRepository
    {
        public Car PostCar(Car car);
        public List<Image> PostImages(List<Image> images);
        public List<Car> GetCars();
    }
}
