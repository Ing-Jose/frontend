export class Usuario{
    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public img?: string,
        public rol: string='USER_ROLE',
        public _id?: string,
    ){}
}