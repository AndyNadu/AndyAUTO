using DealerAUTO.DTO.Models;

namespace DealerAUTO.Repository.Interfaces
{
    public interface ICarRepository
    {
        public Car PostCar(Car car);
        public List<CarImage> PostImages(List<CarImage> images);
        public List<Car> GetCars();
    }
}
