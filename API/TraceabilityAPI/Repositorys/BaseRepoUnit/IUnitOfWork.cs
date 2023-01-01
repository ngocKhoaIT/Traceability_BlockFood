using TraceabilityAPI.Repositorys.Interface;

namespace TraceabilityAPI.Repositorys.BaseRepoUnit
{
    public interface IUnitOfWork : IDisposable
    {
        IFarm Farms { get; }
        IFactory Factorys { get; }
        IStore Stores { get; }
        ITransport Transports { get; }
        IUser UserLogins { get; }
        IPerson Persons { get; }
        ISeed Seeds { get; }
        IFruit Fruits { get; }
        IFruitHarvest FruitHarvests { get; }
        ITypeProduct TypeProducts { get; }
        IProduct Products { get; }
        IInventoryStore Inventorys { get; }
        IMerchant Merchants { get; }
        IMerchantFarm MerchantFarms { get; }
        ITransportPtoP TransportPtoPs { get; }
        IDetailTransportPtoP DetailTransportPtoPs { get; }
        IFarmRequest FarmRequests { get; }
        IInventoryFactory InventoryFactories { get; }
        IFactoryRequest FactoryRequests { get; }
        IUpToTransport UpToTransports { get; }
        INotice Notices { get; }
        IAddress Addresses { get; }
        IOrder Orders { get; }
        ICustomer Customers { get; }
        int Complete();
    }
}
