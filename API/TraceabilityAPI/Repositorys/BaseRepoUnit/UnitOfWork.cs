using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.Interface;
using TraceabilityAPI.Repositorys.Repository;

namespace TraceabilityAPI.Repositorys.BaseRepoUnit
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataDbContext _context;
        public UnitOfWork(DataDbContext context)
        {
            _context = context;
            Farms = new FarmRepository(_context);
            Factorys = new FactoryRepository(_context);
            Stores = new StoreRepository(_context);
            Transports = new TransportRepository(_context);
            UserLogins = new UserRepository(_context);
            Persons = new PersonRepository(_context);
            Seeds = new SeedRepository(_context);
            Fruits = new FruitRepository(_context);
            FruitHarvests = new FruitHarvestRepository(_context);
            TypeProducts = new TypeProductRepository(_context);
            Products = new ProductRepository(_context);
            Inventorys = new InventoryStoreRepository(_context);
            Merchants = new MerchantRepository(_context);
            MerchantFarms = new MerchantFarmRepository(_context);
            TransportPtoPs = new TransportPtoPRepository(_context);
            DetailTransportPtoPs = new DetailTransportPtoPRepository(_context);
            FarmRequests = new FarmRequestRepository(_context);
            InventoryFactories = new InventoryFactoryRepository(_context);
            FactoryRequests = new FactoryRequestRepository(_context);
            UpToTransports = new UpToTransportRepository(_context);
            Notices = new NoticeRepository(_context);
            Addresses= new AddressRepository(_context);
            Orders = new OrderRepository(_context);
            Customers = new CustomerRepository(_context);
        }

        public IFarm Farms { get; private set; }
        public IFactory Factorys { get; private set; }
        public IStore Stores { get; private set; }
        public ITransport Transports { get; private set; }
        public IUser UserLogins { get; private set; }
        public IPerson Persons { get; private set; }
        public ISeed Seeds { get; private set; }
        public IFruit Fruits { get; private set; }
        public IFruitHarvest FruitHarvests { get; private set; }
        public ITypeProduct TypeProducts { get; private set; }
        public IProduct Products { get; private set; }
        public IInventoryStore Inventorys { get; private set; }
        public IMerchant Merchants { get; private set; }
        public IMerchantFarm MerchantFarms { get; private set; }
        public ITransportPtoP TransportPtoPs { get; private set; }
        public IDetailTransportPtoP DetailTransportPtoPs { get; private set; }
        public IFarmRequest FarmRequests { get; private set; }
        public IInventoryFactory InventoryFactories { get; private set; }
        public IFactoryRequest FactoryRequests { get; private set; }
        public IUpToTransport UpToTransports { get; private set; }
        public IAddress Addresses { get; private set; }
        public INotice Notices { get; private set; }
        public IOrder Orders { get; private set; }
        public ICustomer Customers { get; private set; }

        public int Complete()
        {
            return _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
