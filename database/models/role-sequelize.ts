import { DataTypes, Model, Sequelize } from "sequelize";
export default class Role extends Model {
    declare id: number
    declare name: string

    static initTable(sequelize: Sequelize) {
        Role.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            sequelize,
            tableName: "roles",
            timestamps: false,
        })
    }

}