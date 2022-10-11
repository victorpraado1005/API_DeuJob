const vagasRepository = require('../repositories/VagasRepository');
require('express-async-error');

class VagaController {
  async index(request, response) {
    const vagas = await vagasRepository.findAll();
    response.json(vagas);
  }

  async show(request, response) {
    const { id } = request.params;
    const vaga = await vagasRepository.findById(id);

    if (!vaga) {
      return response.status(404).json({error: 'Vaga não encontrada'})
    }

    response.json(vaga);
  }

  async store (request, response) {
    //Criar novo registro
    const {
      nome, descricao, beneficios, requisitos
    } = request.body;


    const vaga = await vagasRepository.create({
      nome, descricao, beneficios, requisitos
    });

    response.status(201).json(vaga);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      nome, descricao, beneficios, requisitos
    } = request.body;

    const vaga = await vagasRepository.update(id, {
      nome, descricao, beneficios, requisitos
    });

    response.json(vaga);
  }

  async delete(request, response) {
    const { id } = request.params;

    await vagasRepository.delete(id);

    response.sendStatus(204);
  }
}

// Singleton
module.exports = new VagaController();
