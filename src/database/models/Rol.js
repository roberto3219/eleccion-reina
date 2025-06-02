module.exports =  (sequelize, DataTypes) => {
    const alias = "Rol"
    const cols = {
        id_rol:{
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
    const Rol = sequelize.define(alias,cols,config);

    Rol.associate =function (modelo){
        Rol.hasMany(modelo.Candidata,{
            as: "candidata",
            foreignKey: "id_rol",
            timestamps: false,
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        })
    }
    return Rol
}
