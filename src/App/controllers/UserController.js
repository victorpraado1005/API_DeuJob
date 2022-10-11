const UsersRepository = require('../repositories/UsersRepository');
require('express-async-error');

class UserController {
  async index(request, response) {
    const usuario = await UsersRepository.findAll();
    response.json(usuario);
  }

  async show(request, response) {
    const { id } = request.params;
    const usuario = await UsersRepository.findById(id);

    if (!usuario) {
      return response.status(404).json({error: 'Usuário não encontrado'})
    }

    response.json(usuario);
  }

  async login (request, response) {
    const { email, password } = request.body;
    const user = await UsersRepository.findUserByEmailAndPassword(email, password);

    if (!user){
      return response.status(404).json({ error: 'E-mail or password are incorrect' })
    }

    response.json(user);
  }

  async store (request, response) {
    //Criar novo registro
    const {
      nome, email, senha, telefone, pontos
    } = request.body;


    const usuario = await UsersRepository.create({
      nome, email, senha, telefone, pontos
    });

    response.status(201).json(usuario);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      nome, email, senha, telefone, pontos
    } = request.body;

    const usuario = await UsersRepository.update(id, {
      nome, email, senha, telefone, pontos
    });

    response.json(usuario);
  }
}

// Singleton
module.exports = new UserController();
