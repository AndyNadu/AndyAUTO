﻿using DealerAUTO.DTO.DTOs;
using DealerAUTO.DTO.Models;
using DealerAUTO.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Migrations;
using System.ComponentModel.DataAnnotations;
using System.Drawing;

namespace DealerAUTO.Controllers
{
    [ApiController]
    [Route("car")]
    public class CarController : ControllerBase
    {
        ICarService _carService;

        public CarController(ICarService carService) { 
            _carService = carService;
        }

        [HttpPost("post")]
        public IActionResult PostCar([FromForm] IFormCollection form)
        {
            IActionResult result;

            try
            {
                Car? car = _carService.PostCar(form);

                result = car != null ? Ok(car) : BadRequest("error");
            }
            catch (Exception ex) { 
                result = BadRequest(ex.Message);
            }

            return result;
        }

        [HttpGet("get")]
        public IActionResult GetCars()
        {
            IActionResult result;

            try
            {
                List<CarDTO> cars = _carService.GetCars();

                result = cars.Count != 0 ? Ok(cars) : BadRequest("No cars found!");
            }
            catch (Exception ex)
            {
                result = BadRequest(ex.Message);
            }

            return result;
        }
    }
}