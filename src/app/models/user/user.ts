export interface IUser {
    userInfo: {
        userId: number,
        userName: string,
        userAvatar: string,
        userRole: number
    },
    tokens: {
        token: string,
        refreshToken: string
    }
}
