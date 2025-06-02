module.exports = (sequelize, DataTypes) => {
    const alias = "CalificacionCandidata"
    const cols = {
        id_calificacion :{
            primaryKey:true,
            type: DataTypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
        },
        Apellido_Nombre:{
            type:DataTypes.STRING(45),
            allowNull:false,
        },
        Curso:{
            type: DataTypes.STRING(45),
            allowNull:false,
        },
        id_candidata : {
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        jurado_N:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        belleza:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        Elegancia:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        Simpatia:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        fotografia:{
            type:DataTypes.STRING(255),
            allowNull:false,
        },
    }
    const config = {
        tableName:"calificacion_candidatas",
        timestamps: false,
    }
    const CalificacionCandidatas = sequelize.define(alias,cols,config);

    CalificacionCandidatas.associate = function (models){
        CalificacionCandidatas.belongsTo(models.Candidata,{
            as: "candidata",
            foreignKey: "id_candidata",
            timestamps: false,
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        })
    }
    return CalificacionCandidatas;
}