module.exports = (sequelize, DataTypes) => {
    const Alias = "CalificacionTotal"
    const cols = {
        idcalificacion_total:{
            primaryKey:true,
            type:DataTypes.INTEGER,
            allowNull : false,
            autoIncrement: true,
        },
        id_candidata:{
            type: DataTypes.INTEGER,
            allowNull:false,
            references: {
                model: 'Candidata',
                key: 'num_candidata'
            }
        },
        Apellido_nombre:{
            type:DataTypes.STRING(45),
            allowNull:false
        },
        Curso:{
            type:DataTypes.STRING(45),
            allowNull:false
        },
        total_J1:{
            type: DataTypes.INTEGER,
        },
        total_J2:{
            type: DataTypes.INTEGER,
        },
        total_J3:{
            type: DataTypes.INTEGER,
        },
        total_J4:{
            type: DataTypes.INTEGER,
        },
        total_gral:{
            type: DataTypes.INTEGER,
        },
    }
    const config = {
        tableName: "calificacion_Total",
        timestamps: false,
    }
    const CalificacionTotal = sequelize.define(Alias,cols,config);
    
    CalificacionTotal.associate = function(models){
        CalificacionTotal.belongsTo(models.Candidata,{
            as: "candidata",
            foreignKey: "id_candidata",
            timestamps: false,
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        })
    }
    return CalificacionTotal;
}