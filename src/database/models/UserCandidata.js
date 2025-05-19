module.exports = (sequelize, DataTypes) => {
    const alias = "UserCandidata"
    const colms = {
        id_voto: {
            primaryKey:true,
            type: DataTypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
        },
            /* Claves Foraneas*/
        id_user: {
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        id_candidata:{
            type:DataTypes.INTEGER,
            allowNull:false,
        }
}
const config = {
    tableName: "voto_user_candidata",
    timestamps: false,
}

    const UserCandidata = sequelize.define(
        alias,colms,config
    );

    return UserCandidata;

    }
