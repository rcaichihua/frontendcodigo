const api = {
  url: 'https://www.omdbapi.com',
  key: 'e50b7182',
};

export const authUsers = [
  {
    id: '1001',
    perfil: 'Admin',
    username: 'roger',
    name: 'Roger Caichihua',
    pass: '123',
  },
  {
    id: '1002',
    perfil: 'Cobrador',
    username: 'juan',
    name: 'Juan Gonzales',
    pass: '123',
  },
];

const Config = {
  authUsers,
  api,
};

export default Config;
