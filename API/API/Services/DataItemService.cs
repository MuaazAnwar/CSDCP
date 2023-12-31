using System.Collections;
using System.Drawing;
using System.Security.Cryptography;
using CoenM.ImageHash;
using CoenM.ImageHash.HashAlgorithms;
using SixLabors.ImageSharp;

namespace API.Services
{
    public class DataItemService
	{
        internal void SaveImage(IFormFile image, string filePath)
        {
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                image.CopyTo(fileStream);
            }
        }

        internal bool AreImagesIdentical(byte[] image1, byte[] image2)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] hash1 = sha256.ComputeHash(image1);
                byte[] hash2 = sha256.ComputeHash(image2);
                return StructuralComparisons.StructuralEqualityComparer.Equals(hash1, hash2);
            }
        }
        internal string GetFileExtension(string contentType)
        {
            string? extension = null;
            switch (contentType.ToLower())
            {
                case "image/jpeg":
                    extension = ".jpg";
                    break;
                case "image/png":
                    extension = ".png";
                    break;
                case "image/gif":
                    extension = ".gif";
                    break;
                case "image/webp":
                    extension = ".webp";
                    break;
                default:
                    throw new NotSupportedException($"File type {contentType} is not supported!");
            }
            return extension;
        }
        
        internal bool IsImagesAreSimilar(byte[] imageBytes1, byte[] imageBytes2)
        {

            using var image1 = SixLabors.ImageSharp.Image.Load<SixLabors.ImageSharp.PixelFormats.Rgba32>(imageBytes1);
            using var image2 = SixLabors.ImageSharp.Image.Load<SixLabors.ImageSharp.PixelFormats.Rgba32>(imageBytes2);

            var hasher = new PerceptualHash();

            // Compute pHash for each image
            var hash1 = hasher.Hash(image1);
            var hash2 = hasher.Hash(image2);

            // Compare hashes
            var similarity = CompareHash.Similarity(hash1, hash2);
            if (similarity > 80)
            {
                return true;
            }
            return false;
        }
        internal ulong GetPHash(byte[] imageBytes)
        {

            using var image = SixLabors.ImageSharp.Image.Load<SixLabors.ImageSharp.PixelFormats.Rgba32>(imageBytes);
            var hasher = new PerceptualHash();
            var hash1 = hasher.Hash(image);
            return hash1;
        }
    }
}

