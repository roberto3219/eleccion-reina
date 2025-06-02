module.exports =  (sequelize, DataTypes) => {
    const Alias = "Usuario"
    const colms = {
        id:{
            primaryKey:true,
            autoIncrement:true,
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        nombre:{
            type:DataTypes.STRING(100),
            allowNull:false,
        },
        correo:{
            type:DataTypes.STRING(100),
            allowNull:false,
        },
        contraseña:{
            type:DataTypes.STRING(255),
            allowNull:false,
        },
        id_rol:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        voto:{
            type:DataTypes.BOOLEAN,
            allowNull:true,
        },
        DNI:{
            type:DataTypes.INTEGER,
            allowNull:false,
            unique: true,
        },
        num_jurado:{
            type:DataTypes.INTEGER,
        }
    };
    const config = {
        tableName:"usuario",
        timestamps:false,
    }
    const Usuario = sequelize.define(Alias,colms,config);
    
    Usuario.associate = (modelo) => {
        Usuario.belongsTo(modelo.Rol,{
            as: "roles",
            foreignKey: "id_rol",
            timestamps:false,
        })
    }

    return Usuario
}