using DealerAUTO.DTO.Models;
using DealerAUTO.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DealerAUTO.Repository.Repositories
{
    public class CarRepository : ICarRepository
    {
        readonly DealerAUTOContext _dbContext = new DealerAUTOContext();

        public Car PostCar(Car car)
        {
            _dbContext.Cars.Add(car);
            _dbContext.SaveChanges();

            return car;
        }

        public List<CarImage> PostImages(List<CarImage> images)
        {
            _dbContext.Images.AddRange(images);
            _dbContext.SaveChanges();

            return images;
        }

        public List<Car> GetCars()
        {
            return _dbContext.Cars.Include(e => e.Images).ToList();
        }
    }
}
