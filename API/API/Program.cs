using Microsoft.EntityFrameworkCore;
using API.Models;
using AutoMapper;
using Amazon.S3;
using Amazon;
using Amazon.Runtime;
using API;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "MyPolicy",
                      builder =>
                      {
                          //builder.WithOrigins("http://localhost:8100", "http://localhost:4200")
                          //       .AllowAnyHeader()
                          //       .AllowAnyMethod()
                          //       .AllowCredentials();
                          builder.AllowAnyOrigin() // Allow any origin
                                 .AllowAnyHeader()  // Allow any header
                                 .AllowAnyMethod(); // Allow any method
                      });
});

builder.Services.AddControllers();
builder.Services.AddSingleton<IAmazonS3>(sp =>
{
    var configuration = sp.GetRequiredService<IConfiguration>();
    var awsAccessKeyId = configuration["AWS:AccessKeyId"];
    var awsSecretAccessKey = configuration["AWS:SecretAccessKey"];
    var awsRegion = configuration["AWS:Region"];
    return new AmazonS3Client(awsAccessKeyId, awsSecretAccessKey,RegionEndpoint.GetBySystemName(awsRegion));
});
//builder.Services.Configure<JsonOptions>(options =>
//{
//    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;

//});

//builder.Services.AddControllers().AddNewtonsoftJson(options =>
//{
//    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
//    // Additional configuration as needed
//});

builder.Services.Configure<AppConfig>(builder.Configuration.GetSection("AppConfig"));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DevContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.Use(async (context, next) =>
{
    context.Response.Headers.Add("ngrok-skip-browser-warning", "69420");
    await next();
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors("MyPolicy");

app.Run();

//res.header('Access-Control-Allow-Origin', '*'); // Adjust '*' to your trusted origins
//res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');