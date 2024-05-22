import { DataTypes, Model, Sequelize } from "sequelize";
import Role from "./role-sequelize";

export default class User extends Model {
    declare id: number
    declare email: string
    declare password: string
    declare photoUrl: string
    declare firstName: string
    declare lastName: string
    declare phoneNumber: string
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
                unique: true,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            photoUrl: {
                type: DataTypes.STRING,
                defaultValue: 'http://localhost:3000/profile_icon.png'
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            phoneNumber: {
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

    static association(){
        User.belongsTo(Role, {
            foreignKey: "roleId",
            targetKey: "id",
            as: "role"
        });
        Role.hasMany(User, {
            foreignKey: "roleId",
            sourceKey: "id"
        });
    }
}