using DealerAUTO.DTO.Models;
using DealerAUTO.Repository.Interfaces;

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

        public List<Image> PostImages(List<Image> images)
        {
            _dbContext.Images.AddRange(images);
            _dbContext.SaveChanges();

            return images;
        }
    }
}
