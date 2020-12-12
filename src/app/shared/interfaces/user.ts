export interface IUser {

    constructor(
      objectId: number,
      name: string,
      email: string,
      password: string,
      address: string,
      publisher: boolean
    )
  }