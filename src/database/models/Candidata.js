module.exports = (sequelize,DataTypes)=>{
    Alias = "Candidata"
    cols ={
        num_candidata:{
            primaryKey:true,
            type:DataTypes.INTEGER,
            allowNull : false,
            autoIncrement: true,
        },
        nombre:{
            type:DataTypes.STRING(100),
            allowNull:false,
        },
        edad:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        correo:{
            type:DataTypes.STRING(255),
            allowNull:false,
        },
        tel:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        provincia:{
            type:DataTypes.STRING(45),
            allowNull:false,
        },
        ciudad:{
            type:DataTypes.STRING(45),
            allowNull:false,
        },
        img_candidata:{
            type:DataTypes.STRING(50),
            allowNull:false,
        },
        curso:{
            type:DataTypes.STRING(45),
            allowNull:false,
        },
        DNI:{
            type:DataTypes.INTEGER,
            allowNull:false,
            unique:true,
        }
    }
    config = {
        tableName: "candidata",
        timestamps: false,
    }
    const Candidata = sequelize.define(Alias,cols,config);

    Candidata.associate = (modelo) => {
    
        Candidata.belongsTo(modelo.Rol,{
            as:"rol",
            foreignKey:"id_rol",
            timestamps:false,
            onDelete:"CASCADE",
            onUpdate:"CASCADE",
        })

    }

    return Candidata;
}