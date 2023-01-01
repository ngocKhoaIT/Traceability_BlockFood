export interface User{
    userName: string,
    _passwordHash : string,
    _passwordSalt : string,
    _role: string,
    represent: string,
    workingFor: string,
    _status : number,
    date_create : string,
    date_update : string
}