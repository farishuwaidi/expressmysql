module.exports = (sequelize, DataType) => {
    const Products =  sequelize.define(
        "Products",
        {
            id: {
                type: DataType.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
              },
              name: {
                type: DataType.STRING,
                allowNull:false
              },
              price: {
                type: DataType.INTEGER,
                allowNull: false
              },
              stock: {
                type: DataType.INTEGER,
                allowNull: false 
              },
        },
        {
            tableName: "products",
        }
    )
    return Products
}