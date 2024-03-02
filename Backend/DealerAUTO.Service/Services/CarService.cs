using DealerAUTO.DTO.DTOs;
using DealerAUTO.DTO.Models;
using DealerAUTO.Repository.Interfaces;
using DealerAUTO.Service.Interfaces;
using Microsoft.AspNetCore.Http;

namespace DealerAUTO.Service.Services
{
    public class CarService : ICarService
    {
        ICarRepository _carRepository;

        public CarService(ICarRepository carRepository)
        {
            _carRepository = carRepository;
        }

        public Car? PostCar(IFormCollection form)
        {
            Car car = BuildModelFromForm(form);
            car = _carRepository.PostCar(car);

            List<Image> PhotosAsByteArrays = ConvertImagesToByteArrays(form, car.Id);

            PhotosAsByteArrays = _carRepository.PostImages(PhotosAsByteArrays);

            return car;
        }

        public Car BuildModelFromForm(IFormCollection form)
        {
            return new Car
            {
                Make = form["make"],
                Model = form["model"],
                Year = Convert.ToInt32(form["year"]),
                Mileage = Convert.ToInt32(form["mileage"]),
                Description = form["description"],
                Fuel = form["fuel"],
                CubicCapacity = Convert.ToInt32(form["cubicCapacity"]),
                Power = Convert.ToInt32(form["power"]),
                Transmission = form["transmission"],
                Traction = form["traction"],
                Body = form["body"],
                Wheel = form["wheel"],
                Price = Convert.ToInt32(form["price"])
            };
        }

        public List<Image> ConvertImagesToByteArrays(IFormCollection form, int carId)
        {
            List<Image> Images = new List<Image>();

            foreach (IFormFile file in form.Files)
            {
                Image image = new Image();

                image.CarId = carId;

                using (var memoryStream = new MemoryStream())
                {
                    file.OpenReadStream().CopyTo(memoryStream);
                    image.PhotoAsByteArray = memoryStream.ToArray();
                }

                Images.Add(image);
            }

            return Images;
        }
    }
}
