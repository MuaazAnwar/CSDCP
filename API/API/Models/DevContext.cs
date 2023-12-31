using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace API.Models;

public partial class DevContext : DbContext
{
    public DevContext()
    {
    }

    public DevContext(DbContextOptions<DevContext> options)
        : base(options)
    {
    }

    public virtual DbSet<DataItem> DataItems { get; set; }

    public virtual DbSet<DataItemDetail> DataItemDetails { get; set; }

    public virtual DbSet<DataItemHash> DataItemHashes { get; set; }

    public virtual DbSet<DataLabel> DataLabels { get; set; }

    public virtual DbSet<DataReview> DataReviews { get; set; }

    public virtual DbSet<Dataset> Datasets { get; set; }

    public virtual DbSet<PlatformShare> PlatformShares { get; set; }

    public virtual DbSet<PlatformUser> PlatformUsers { get; set; }

    public virtual DbSet<UserContribution> UserContributions { get; set; }

  
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<DataItem>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__data_ite__3213E83FDEA119FF");

            entity.ToTable("data_items");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AssignedLabel).HasColumnName("assigned_label");
            entity.Property(e => e.ContributedBy).HasColumnName("contributed_by");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.EarningAmount)
                .HasDefaultValueSql("((0.00))")
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("earning_amount");
            entity.Property(e => e.ImageLink1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("image_link1");
            entity.Property(e => e.ImageLink2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("image_link2");
            entity.Property(e => e.ImageLink3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("image_link3");
            entity.Property(e => e.Label).HasColumnName("label");
            entity.Property(e => e.Rating)
                .HasColumnType("decimal(3, 1)")
                .HasColumnName("rating");

            entity.HasOne(d => d.AssignedLabelNavigation).WithMany(p => p.DataItemAssignedLabelNavigations)
                .HasForeignKey(d => d.AssignedLabel)
                .HasConstraintName("FK__data_item__assig__05D8E0BE");

            entity.HasOne(d => d.ContributedByNavigation).WithMany(p => p.DataItems)
                .HasForeignKey(d => d.ContributedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__data_item__contr__03F0984C");

            entity.HasOne(d => d.LabelNavigation).WithMany(p => p.DataItemLabelNavigations)
                .HasForeignKey(d => d.Label)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__data_item__label__04E4BC85");
        });

        modelBuilder.Entity<DataItemDetail>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("DataItemDetails");

            entity.Property(e => e.AssignedLabel)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.ContributedBy)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.ContributionDate).HasColumnType("datetime");
            entity.Property(e => e.ImageLink1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("image_link1");
            entity.Property(e => e.ImageLink2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("image_link2");
            entity.Property(e => e.ImageLink3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("image_link3");
        });

        modelBuilder.Entity<DataItemHash>(entity =>
        {
            entity.HasKey(e => new { e.DataItemId, e.HashValue }).HasName("PK__data_ite__77B5466CC5879ED3");

            entity.ToTable("data_item_hashes");

            entity.HasIndex(e => e.HashValue, "UQ__data_ite__91819E3C8A6CC5C8").IsUnique();

            entity.Property(e => e.DataItemId).HasColumnName("dataItemId");
            entity.Property(e => e.HashValue)
                .HasColumnType("decimal(20, 0)")
                .HasColumnName("hashValue");

            entity.HasOne(d => d.DataItem).WithMany(p => p.DataItemHashes)
                .HasForeignKey(d => d.DataItemId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__data_item__dataI__489AC854");
        });

        modelBuilder.Entity<DataLabel>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__data_lab__3213E83F99641CDB");

            entity.ToTable("data_labels");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.LabelName)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("label_name");
            entity.Property(e => e.ParentId).HasColumnName("parent_id");

            entity.HasOne(d => d.Parent).WithMany(p => p.InverseParent)
                .HasForeignKey(d => d.ParentId)
                .HasConstraintName("FK__data_labe__paren__76969D2E");
        });

        modelBuilder.Entity<DataReview>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__data_rev__3213E83F755FE5BE");

            entity.ToTable("data_reviews");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.DataItem).HasColumnName("data_item");
            entity.Property(e => e.EarningAmount)
                .HasDefaultValueSql("((0.00))")
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("earning_amount");
            entity.Property(e => e.IssueDetails)
                .HasColumnType("text")
                .HasColumnName("issue_details");
            entity.Property(e => e.Label).HasColumnName("label");
            entity.Property(e => e.Rating)
                .HasDefaultValueSql("((0.0))")
                .HasColumnType("decimal(3, 1)")
                .HasColumnName("rating");
            entity.Property(e => e.ReportedIssueType)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("reported_issue_type");
            entity.Property(e => e.ReviewedBy).HasColumnName("reviewed_by");

            entity.HasOne(d => d.DataItemNavigation).WithMany(p => p.DataReviews)
                .HasForeignKey(d => d.DataItem)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__data_revi__data___0C85DE4D");

            entity.HasOne(d => d.LabelNavigation).WithMany(p => p.DataReviews)
                .HasForeignKey(d => d.Label)
                .HasConstraintName("FK__data_revi__label__0D7A0286");

            entity.HasOne(d => d.ReviewedByNavigation).WithMany(p => p.DataReviews)
                .HasForeignKey(d => d.ReviewedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__data_revi__revie__0B91BA14");
        });

        modelBuilder.Entity<Dataset>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__dataset__3213E83F33896DCE");

            entity.ToTable("dataset");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.DataItemsCount).HasColumnName("data_items_count");
            entity.Property(e => e.DownloadDate)
                .HasColumnType("datetime")
                .HasColumnName("download_date");
            entity.Property(e => e.Labels).HasColumnName("labels");
            entity.Property(e => e.OwnerId).HasColumnName("owner_id");
            entity.Property(e => e.SoldDate)
                .HasColumnType("datetime")
                .HasColumnName("sold_date");
            entity.Property(e => e.SoldPrice)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("sold_price");

            entity.HasOne(d => d.Owner).WithMany(p => p.Datasets)
                .HasForeignKey(d => d.OwnerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__dataset__owner_i__1332DBDC");

            entity.HasMany(d => d.DataItems).WithMany(p => p.DataSets)
                .UsingEntity<Dictionary<string, object>>(
                    "DatasetDataItem",
                    r => r.HasOne<DataItem>().WithMany()
                        .HasForeignKey("DataItemId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__dataset_d__data___17036CC0"),
                    l => l.HasOne<Dataset>().WithMany()
                        .HasForeignKey("DataSetId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__dataset_d__data___160F4887"),
                    j =>
                    {
                        j.HasKey("DataSetId", "DataItemId").HasName("PK__dataset___0E98E1B4FB1813D8");
                        j.ToTable("dataset_data_items");
                    });
        });

        modelBuilder.Entity<PlatformShare>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__platform__3213E83F79576357");

            entity.ToTable("platform_share");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.DataItemId).HasColumnName("data_item_id");
            entity.Property(e => e.DatasetId).HasColumnName("dataset_id");
            entity.Property(e => e.EarningAmount)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("earning_amount");

            entity.HasOne(d => d.DataItem).WithMany(p => p.PlatformShares)
                .HasForeignKey(d => d.DataItemId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__platform___data___43D61337");

            entity.HasOne(d => d.Dataset).WithMany(p => p.PlatformShares)
                .HasForeignKey(d => d.DatasetId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__platform___datas__44CA3770");
        });

        modelBuilder.Entity<PlatformUser>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__platform__B9BE370F6C5922AB");

            entity.ToTable("platform_users");

            entity.HasIndex(e => e.Username, "UQ__platform__F3DBC57292EAD493").IsUnique();

            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("name");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("password");
            entity.Property(e => e.Rating)
                .HasDefaultValueSql("((0.0))")
                .HasColumnType("decimal(3, 1)")
                .HasColumnName("rating");
            entity.Property(e => e.UserType)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("user_type");
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("username");
            entity.Property(e => e.WalletAmount)
                .HasDefaultValueSql("((0.00))")
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("wallet_amount");
        });

        modelBuilder.Entity<UserContribution>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("UserContributions");

            entity.Property(e => e.AssignedLabel)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.ContributionType)
                .HasMaxLength(11)
                .IsUnicode(false);
            entity.Property(e => e.Earning).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.ImageLink1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("image_link1");
            entity.Property(e => e.ImageLink2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("image_link2");
            entity.Property(e => e.ImageLink3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("image_link3");
            entity.Property(e => e.Rating).HasColumnType("decimal(3, 1)");
            entity.Property(e => e.UploadedDate).HasColumnType("datetime");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
