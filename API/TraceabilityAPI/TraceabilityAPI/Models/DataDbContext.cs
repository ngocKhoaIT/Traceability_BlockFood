using TraceabilityAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace TraceabilityAPI.Models
{
    public class DataDbContext : DbContext
    {
        public DataDbContext()
        {

        }

        public DataDbContext(DbContextOptions<DataDbContext> options) : base(options)
        {

        }

        public DbSet<Farm> Farms { get; set; }
        public DbSet<Factory> Factorys { get; set; }
        public DbSet<Transport> Transports { get; set; }
        public DbSet<Store> Stores { get; set; }
        public DbSet<Person> Persons { get; set; }
        public DbSet<UserLogin> UserLogins { get; set; }
        public DbSet<Fruit> Fruits { get; set; }
        public DbSet<Seed> Seeds { get; set; }
        public DbSet<FruitHarvest> FruitHarvests { get; set; }
        public DbSet<TypeProduct> TypeProducts { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<InventoryStore> Inventories { get; set; }
        public DbSet<Merchant> Merchants { get; set; }
        public DbSet<MerchantFarm> MerchantFarms { get; set; }
        public DbSet<TransportPtoP> TransportPtoPs { get; set; }
        public DbSet<DetailTransportPtoP> DetailTransportPtoPs { get; set; }
        public DbSet<FarmRequest> FarmRequests { get; set; }
        public DbSet<InventoryFactory> InventoryFactories { get; set; }
        public DbSet<FactoryRequest> FactoryRequests { get; set; }
        public DbSet<UpToTransport> UpToTransports { get; set; }
        public DbSet<Province> Provinces { get; set; }
        public DbSet<District> Districts { get; set; }
        public DbSet<Ward> Wards { get; set; }
        public DbSet<Notice> Notices { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<OrderBill> OrderBills { get; set; }
        public DbSet<DetailOrder> DetailOrders { get; set; }
        public DbSet<Blockchain> Blocks { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<FarmRequest>().HasKey(table => new {
                table.harvestId,
                table.farmId,
                table.placeId
            });
            builder.Entity<FactoryRequest>().HasKey(table => new {
                table.productId,
                table.factoryId,
                table.placeId
            });
            builder.Entity<DetailOrder>().HasKey(table => new {
                table.billId,
                table.goodsId
            });
            builder.Entity<DetailTransportPtoP>().HasKey(table => new {
                table.billId,
                table.itemBillId
            });
        }


        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    string conn = "Data Source=NGOCKHOA\\SQLEXPRESS;Initial Catalog=db_Traceability;User Id=sa;password=123456; Integrated Security=True; Encrypt=True;TrustServerCertificate=True;";
        //    if (!optionsBuilder.IsConfigured)
        //    {
        //        optionsBuilder.UseSqlServer(conn);
        //    }
        //}
    }

}
