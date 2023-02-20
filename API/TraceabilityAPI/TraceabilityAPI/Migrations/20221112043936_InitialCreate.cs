    using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TraceabilityAPI.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DetailTransportPtoP",
                columns: table => new
                {
                    billId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    itemBillId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    status_request = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetailTransportPtoP", x => x.billId);
                });

            migrationBuilder.CreateTable(
                name: "Factory",
                columns: table => new
                {
                    factoryId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    factoryName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    note = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    personInCharge = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    addressFactory = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    _status = table.Column<int>(type: "int", nullable: false),
                    date_create = table.Column<DateTime>(type: "datetime2", nullable: false),
                    date_update = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Factory", x => x.factoryId);
                });

            migrationBuilder.CreateTable(
                name: "FactoryRequest",
                columns: table => new
                {
                    productId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    factoryId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    placeId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    unit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    status_request = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    _status = table.Column<int>(type: "int", nullable: false),
                    date_create = table.Column<DateTime>(type: "datetime2", nullable: false),
                    date_update = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FactoryRequest", x => x.productId);
                });

            migrationBuilder.CreateTable(
                name: "Farm",
                columns: table => new
                {
                    farmId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    farmName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    addressFarm = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    note = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    farmerId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    _status = table.Column<int>(type: "int", nullable: false),
                    date_create = table.Column<DateTime>(type: "datetime2", nullable: false),
                    date_update = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Farm", x => x.farmId);
                });

            migrationBuilder.CreateTable(
                name: "FarmRequest",
                columns: table => new
                {
                    harvestId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    farmId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    placeId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    unit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    status_request = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    _status = table.Column<int>(type: "int", nullable: false),
                    date_create = table.Column<DateTime>(type: "datetime2", nullable: false),
                    date_update = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FarmRequest", x => x.harvestId);
                });

            migrationBuilder.CreateTable(
                name: "Fruit",
                columns: table => new
                {
                    fruitId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    fruitName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    farmId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    seedId = table.Column<int>(type: "int", nullable: false),
                    technology = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    land = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    amount = table.Column<int>(type: "int", nullable: false),
                    unit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    fertilizer = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    pesticides = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    status_activity = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    date_plant = table.Column<DateTime>(type: "datetime2", nullable: false),
                    _status = table.Column<int>(type: "int", nullable: false),
                    date_create = table.Column<DateTime>(type: "datetime2", nullable: false),
                    date_update = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fruit", x => x.fruitId);
                });

            migrationBuilder.CreateTable(
                name: "FruitHarvest",
                columns: table => new
                {
                    harvestId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    fruitId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    date_harvest = table.Column<DateTime>(type: "datetime2", nullable: false),
                    weight_harvest = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    unit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    status_request = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    _status = table.Column<int>(type: "int", nullable: false),
                    date_create = table.Column<DateTime>(type: "datetime2", nullable: false),
                    date_update = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FruitHarvest", x => x.harvestId);
                });

            migrationBuilder.CreateTable(
                name: "InventoryFactory",
                columns: table => new
                {
                    id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    factoryId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    harvestId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    unit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    _status = table.Column<int>(type: "int", nullable: false),
                    date_create = table.Column<DateTime>(type: "datetime2", nullable: false),
                    date_update = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InventoryFactory", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "InventoryStore",
                columns: table => new
                {
                    id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    storeId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    productId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    amount = table.Column<int>(type: "int", nullable: false),
                    unit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    _status = table.Column<int>(type: "int", nullable: false),
                    date_create = table.Column<DateTime>(type: "datetime2", nullable: false),
                    date_update = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InventoryStore", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Merchant",
                columns: table => new
                {
                    merchantId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    merchantName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    addressMerchant = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    note = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    traderId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    _status = table.Column<int>(type: "int", nullable: false),
                    date_create = table.Column<DateTime>(type: "datetime2", nullable: false),
                    date_update = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Merchant", x => x.merchantId);
                });

            migrationBuilder.CreateTable(
                name: "MerchantFarm",
                columns: table => new
                {
                    billId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    farmId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    merchantId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    harvestId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    weight_mf = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    unit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    toPlace = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    status_request = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    _status = table.Column<int>(type: "int", nullable: false),
                    date_create = table.Column<DateTime>(type: "datetime2", nullable: false),
                    date_update = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MerchantFarm", x => x.billId);
                });

            migrationBuilder.CreateTable(
                name: "Person",
                columns: table => new
                {
                    identification = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    firstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    lastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    birthDay = table.Column<DateTime>(type: "datetime2", nullable: false),
                    phoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    addressPerson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    sex = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    imagePerson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    working = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    _status = table.Column<int>(type: "int", nullable: false),
                    date_create = table.Column<DateTime>(type: "datetime2", nullable: false),
                    date_update = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Person", x => x.identification);
                });

            migrationBuilder.CreateTable(
                name: "Product",
                columns: table => new
                {
                    productId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    productName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    factoryId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    harvestId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    amountProduct = table.Column<int>(type: "int", nullable: false),
                    typeProductId = table.Column<int>(type: "int", nullable: false),
                    mfg_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    exp_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    net_weight = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    unit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    temperature = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    humidity = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    procedureOfProduct = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    elementOfProduct = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    _status = table.Column<int>(type: "int", nullable: false),
                    date_create = table.Column<DateTime>(type: "datetime2", nullable: false),
                    date_update = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Product", x => x.productId);
                });

            migrationBuilder.CreateTable(
                name: "Seed",
                columns: table => new
                {
                    seedId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    seedName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    _status = table.Column<int>(type: "int", nullable: false),
                    date_create = table.Column<DateTime>(type: "datetime2", nullable: false),
                    date_update = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Seed", x => x.seedId);
                });

            migrationBuilder.CreateTable(
                name: "Store",
                columns: table => new
                {
                    storeId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    storeName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    phoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    addressStore = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    _status = table.Column<int>(type: "int", nullable: false),
                    date_create = table.Column<DateTime>(type: "datetime2", nullable: false),
                    date_update = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Store", x => x.storeId);
                });

            migrationBuilder.CreateTable(
                name: "Transport",
                columns: table => new
                {
                    transportId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    transportName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    note = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    personInCharge = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    addressTransport = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    _status = table.Column<int>(type: "int", nullable: false),
                    date_create = table.Column<DateTime>(type: "datetime2", nullable: false),
                    date_update = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transport", x => x.transportId);
                });

            migrationBuilder.CreateTable(
                name: "TransportPtoP",
                columns: table => new
                {
                    billId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    transportId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    placeId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    temperature = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    humidity = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    status_request = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    _status = table.Column<int>(type: "int", nullable: false),
                    date_create = table.Column<DateTime>(type: "datetime2", nullable: false),
                    date_update = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TransportPtoP", x => x.billId);
                });

            migrationBuilder.CreateTable(
                name: "TypeProduct",
                columns: table => new
                {
                    typeProductId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    typeName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    info = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    _status = table.Column<int>(type: "int", nullable: false),
                    date_create = table.Column<DateTime>(type: "datetime2", nullable: false),
                    date_update = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypeProduct", x => x.typeProductId);
                });

            migrationBuilder.CreateTable(
                name: "UpToTransport",
                columns: table => new
                {
                    billId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    placeId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    goodsId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    unit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    toPlace = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    status_request = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    _status = table.Column<int>(type: "int", nullable: false),
                    date_create = table.Column<DateTime>(type: "datetime2", nullable: false),
                    date_update = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UpToTransport", x => x.billId);
                });

            migrationBuilder.CreateTable(
                name: "UserLogin",
                columns: table => new
                {
                    userName = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    pass = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    represent = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    _role = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    workingFor = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    _status = table.Column<int>(type: "int", nullable: false),
                    date_create = table.Column<DateTime>(type: "datetime2", nullable: false),
                    date_update = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserLogin", x => x.userName);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DetailTransportPtoP");

            migrationBuilder.DropTable(
                name: "Factory");

            migrationBuilder.DropTable(
                name: "FactoryRequest");

            migrationBuilder.DropTable(
                name: "Farm");

            migrationBuilder.DropTable(
                name: "FarmRequest");

            migrationBuilder.DropTable(
                name: "Fruit");

            migrationBuilder.DropTable(
                name: "FruitHarvest");

            migrationBuilder.DropTable(
                name: "InventoryFactory");

            migrationBuilder.DropTable(
                name: "InventoryStore");

            migrationBuilder.DropTable(
                name: "Merchant");

            migrationBuilder.DropTable(
                name: "MerchantFarm");

            migrationBuilder.DropTable(
                name: "Person");

            migrationBuilder.DropTable(
                name: "Product");

            migrationBuilder.DropTable(
                name: "Seed");

            migrationBuilder.DropTable(
                name: "Store");

            migrationBuilder.DropTable(
                name: "Transport");

            migrationBuilder.DropTable(
                name: "TransportPtoP");

            migrationBuilder.DropTable(
                name: "TypeProduct");

            migrationBuilder.DropTable(
                name: "UpToTransport");

            migrationBuilder.DropTable(
                name: "UserLogin");
        }
    }
}
