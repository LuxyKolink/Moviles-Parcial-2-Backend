export default interface IUser {
    id?: number
    email: string
    password: string
    photoUrl?: string
    firstName: string
    lastName: string
    phoneNumber: string
    roleId?: number
    refreshToken?: string
}