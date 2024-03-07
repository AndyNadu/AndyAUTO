﻿using DealerAUTO.DTO.DTOs;
using DealerAUTO.DTO.Models;
using Microsoft.AspNetCore.Http;

namespace DealerAUTO.Service.Interfaces
{
    public interface ICarService
    {
        public Car? PostCar(IFormCollection form);
        public Car BuildModelFromForm(IFormCollection form);
        public List<CarImage> ConvertImagesToByteArrays(IFormCollection form, int carId);
        public List<CarDTO> GetCars();
        public List<CarDTO> ConvertModelToDTO(List<Car> cars);
    }
}