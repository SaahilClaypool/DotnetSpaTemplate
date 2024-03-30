using System.Diagnostics;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseStaticFiles(
    new StaticFileOptions()
    {
        ServeUnknownFileTypes = true,
        OnPrepareResponse = ctx =>
        {
            var header = "Cache-Control";
            if (ctx.Context.Response.Headers.Keys.Contains(header))
                return;

            var durationInSeconds = 60 * 5;
            ctx.Context.Response.Headers[header] =
                "public,max-age=" + durationInSeconds;
        }
    }
);
if (app.Environment.IsDevelopment())
{
    app.Use(
        async (context, next) =>
        {
            try
            {
                await next();
            }
            catch (Exception ex)
            {
                void PrintEx(Exception e)
                {
                    Console.WriteLine(
                        "\n\n----------------------- APP Exception -----------------------"
                    );
                    Console.WriteLine(e.ToStringDemystified());
                    Console.WriteLine(
                        "------------------- END APP Exception -----------------------\n\n"
                    );
                }
                if (ex is AggregateException agg)
                {
                    foreach (var x in agg.InnerExceptions)
                    {
                        PrintEx(x);
                    }
                }
                else
                {
                    PrintEx(ex);
                }
                throw;
            }
        }
    );
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing",
    "Bracing",
    "Chilly",
    "Cool",
    "Mild",
    "Warm",
    "Balmy",
    "Hot",
    "Sweltering",
    "Scorching"
};

app.MapGet(
        "/api/weatherforecast",
        () =>
        {
            var forecast = Enumerable
                .Range(1, 5)
                .Select(index => new WeatherForecast(
                    DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                    Random.Shared.Next(-20, 55),
                    summaries[Random.Shared.Next(summaries.Length)]
                ))
                .ToArray();
            return forecast;
        }
    )
    .WithName("GetWeatherForecast")
    .WithOpenApi();

app.MapGet("/", req => { req.Response.Redirect("/app"); return Task.CompletedTask; });
app.MapGet(
        "/app/{**path}",
        (HttpRequest req, IWebHostEnvironment env) =>
        {
            return Task.FromResult(Results.File("index.html", contentType: "text/html"));
        }
    );

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
