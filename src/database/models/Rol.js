module.exports =  (sequelize, DataTypes) => {
    const alias = "Rol"
    const cols = {
        id:{
            primaryKey:true,
            autoIncrement:true,
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        nombre:{
            type:DataTypes.STRING(45),
            allowNull:false,
        },
    }
    const config = {
        tableName:"rols",
        timestamps: false,
    }
    const Rol = sequelize.define(alias,cols,config)
    return Rol
}
