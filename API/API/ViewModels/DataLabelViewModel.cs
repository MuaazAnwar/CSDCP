namespace API.ViewModels
{
	public class DataLabelViewModel
	{
        public int Id { get; set; }

        public string LabelName { get; set; } = null!;

        public DateTime? CreatedAt { get; set; }

        public int? ParentId { get; set; }
    }
}

