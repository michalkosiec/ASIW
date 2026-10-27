using Cars.Application.Cars;
using Cars.Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Cars.API.Controllers;

public class CarsController(ISender sender) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Car>>> GetCars()
    {
        return await sender.Send(new GetCarList.Query());
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<Car>> GetCar(Guid id)
    {
        var car = await sender.Send(new Details.Query { Id = id });

        return car is null ? NotFound() : car;
    }

    [HttpPost]
    public async Task<ActionResult<Car>> CreateCar(Car car)
    {
        var result = await sender.Send(new Create.Command { Car = car });

        return CreatedAtAction(nameof(GetCar), new { id = result.Id }, result);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateCar(Guid id, Car car)
    {
        var result = await sender.Send(new Edit.Command
        {
            Id = id,
            Car = car
        });

        return result ? NoContent() : NotFound();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteCar(Guid id)
    {
        var result = await sender.Send(new Delete.Command { Id = id });

        return result ? NoContent() : NotFound();
    }
}
