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

            List<CarImage> PhotosAsByteArrays = ConvertImagesToByteArrays(form, car.Id);
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
                Price = Convert.ToInt32(form["price"]),
                State = Convert.ToInt32(form["mileage"]) < 100 ? "New" : "Used",
                PostTime = DateTime.Now
            };
        }

        public List<CarImage> ConvertImagesToByteArrays(IFormCollection form, int carId)
        {
            List<CarImage> Images = new List<CarImage>();

            foreach (IFormFile file in form.Files)
            {
                CarImage image = new CarImage();

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

        public List<CarDTO> GetCars()
        {
            List<Car> cars = _carRepository.GetCars();

            List<CarDTO> carDTOs = ConvertModelToDTO(cars);

            return carDTOs;
        }

        public List<CarDTO> ConvertModelToDTO(List<Car> cars)
        {
            List<CarDTO> carDTOs = new List<CarDTO>();

            cars.ForEach(car =>
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

                carDTO.ImagesAsBase64Strings = Convert.ToBase64String(car.Images[0].PhotoAsByteArray);

                //carDTO.ImagesAsBase64Strings.Add(Convert.ToBase64String(car.Images[0].PhotoAsByteArray));

                //foreach (DTO.Models.Image image in car.Images)
                //    carDTO.ImagesAsBase64Strings.Add(Convert.ToBase64String(image.PhotoAsByteArray));



                carDTOs.Add(carDTO);
            });

            return carDTOs;
        }
    }
}
