import { DataTypes, Model, Sequelize } from "sequelize";

export default class User extends Model {
    declare id: number
    declare email: string
    declare password: string
    declare refreshToken: string

    static initTable(sequelize: Sequelize) {
        User.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            refreshToken: {
                type: DataTypes.STRING,
                allowNull: true
            }
        }, {
            sequelize,
            tableName: "users",
            timestamps: false,
        })
    }
}