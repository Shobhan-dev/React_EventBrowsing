import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin',
        email: 'admin@dash.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: true
    },
    {
        name: 'user1',
        email: 'user1@dash.com',
        password: bcrypt.hashSync('123456',10)
    },
    {
        name: 'user2',
        email: 'user2@dash.com',
        password: bcrypt.hashSync('123456',10)
    }
]

export default users