using DealerAUTO.DTO.DTOs;
using DealerAUTO.DTO.Models;
using DealerAUTO.Repository.Interfaces;
using DealerAUTO.Service.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Schema;

namespace DealerAUTO.Service.Services
{
    public class CarService : ICarService
    {
        ICarRepository _carRepository;

        public CarService(ICarRepository carRepository)
        {
            _carRepository = carRepository;
        }

        public Car? PostCar(Car _car, IFormCollection _form)
        {
            Car car = _carRepository.PostCar(_car);

            List<CarImage> PhotosAsByteArrays = ConvertImagesToByteArrays(_form, car.Id);
            PhotosAsByteArrays = _carRepository.PostImages(PhotosAsByteArrays);

            return car;
        }

        public bool HasEmptyFields(Car _car)
        {
            if (string.IsNullOrEmpty(_car.Make) ||
                string.IsNullOrEmpty(_car.Model) ||
                string.IsNullOrEmpty(_car.Description) ||
                string.IsNullOrEmpty(_car.Fuel) ||
                string.IsNullOrEmpty(_car.Transmission) ||
                string.IsNullOrEmpty(_car.Traction) ||
                string.IsNullOrEmpty(_car.Body) ||
                string.IsNullOrEmpty(_car.Wheel) ||
                string.IsNullOrEmpty(_car.State) ||
                string.IsNullOrEmpty(_car.Body) ||
                _car.Year <= 0 || _car.Year >= 2030 ||
                _car.Mileage <= 0 || _car.Mileage >= 1000000 ||
                _car.CubicCapacity <= 0 || _car.CubicCapacity >= 10000 ||
                _car.Power <= 0 || _car.Power >= 100000 ||
                _car.Price <= 0 || _car.Price >= 100000000)
                return true;
            return false;
        }

        public Car BuildModelFromForm(IFormCollection _form)
        {
            return new Car
            {
                Make = _form["make"],
                Model = _form["model"],
                Year = Convert.ToInt32(_form["year"]),
                Mileage = Convert.ToInt32(_form["mileage"]),
                Description = _form["description"],
                Fuel = _form["fuel"],
                CubicCapacity = Convert.ToInt32(_form["cubicCapacity"]),
                Power = Convert.ToInt32(_form["power"]),
                Transmission = _form["transmission"],
                Traction = _form["traction"],
                Body = _form["body"],
                Wheel = _form["wheel"],
                Price = Convert.ToInt32(_form["price"]),
                State = Convert.ToInt32(_form["mileage"]) < 100 ? "New" : "Used",
                PostTime = DateTime.Now
            };
        }

        public List<CarImage> ConvertImagesToByteArrays(IFormCollection _form, int _carId)
        {
            List<CarImage> Images = new List<CarImage>();

            foreach (IFormFile file in _form.Files)
            {
                CarImage image = new CarImage();

                image.CarId = _carId;

                using (var memoryStream = new MemoryStream())
                {
                    file.OpenReadStream().CopyTo(memoryStream);
                    image.PhotoAsByteArray = memoryStream.ToArray();
                }

                Images.Add(image);
            }

            return Images;
        }

        public List<CarDTO> GetCars()
        {
            List<Car> cars = _carRepository.GetCars();

            List<CarDTO> carDTOs = ConvertModelToDTO(cars);

            return carDTOs;
        }

        public List<CarDTO> ConvertModelToDTO(List<Car> _cars)
        {
            List<CarDTO> carDTOs = new List<CarDTO>();

            _cars.ForEach(car =>
            {
                CarDTO carDTO = new CarDTO();
                carDTO.Id = car.Id;
                carDTO.Make = car.Make;
                carDTO.Model = car.Model;
                carDTO.Year = car.Year;
                carDTO.Mileage = car.Mileage;
                carDTO.Description = car.Description;
                carDTO.Fuel = car.Fuel;
                carDTO.CubicCapacity = car.CubicCapacity;
                carDTO.Power = car.Power;
                carDTO.Transmission = car.Transmission;
                carDTO.Traction = car.Traction;
                carDTO.Body = car.Body;
                carDTO.Wheel = car.Wheel;
                carDTO.Price = car.Price;
                carDTO.State = car.State;
                carDTO.PostTime = car.PostTime;

                carDTO.ImagesAsBase64Strings = new List<string>();
                foreach (CarImage image in car.Images)
                    carDTO.ImagesAsBase64Strings.Add(Convert.ToBase64String(image.PhotoAsByteArray));

                carDTOs.Add(carDTO);
            });

            return carDTOs;
        }
    }
}
