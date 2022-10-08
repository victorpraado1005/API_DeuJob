const CandidaturasRepository = require('../repositories/CandidaturasRepository');
require('express-async-error');

class CandidaturaController {
  async index(request, response) {
    const candidaturas = await CandidaturasRepository.findAll();
    response.json(candidaturas);
  }

  async show(request, response) {
    const { id } = request.params;
    const candidatura = await CandidaturasRepository.findById(id);

    if (!candidatura) {
      return response.status(404).json({error: 'Candidatura não encontrada'})
    }

    response.json(candidatura);
  }

  async showByCandidatoId(request, response) {
    const { candidato_id } = request.params;
    const vagas = await CandidaturasRepository.findByCandidatoId(candidato_id);

    response.json(vagas);
  }

  async showCandidatosByVagaId(request, response) {
    const { vaga_id } = request.params;
    const candidatos = await CandidaturasRepository.findByVagaId(vaga_id);

    response.json(candidatos);
  }

  async verificarCandidatura(request, response) {
    const { vaga_id, user_id } = request.params;
    const candidato = await CandidaturasRepository.findCandidaturaByUserIdAndVagaId(vaga_id, user_id);

    response.json(candidato);
  }

  async store (request, response) {
    //Criar novo registro
    const {
      id_vaga, id_candidato
    } = request.body;


    const candidatura = await CandidaturasRepository.create({
      id_vaga, id_candidato
    });

    response.status(201).json(candidatura);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      id_vaga, id_candidato
    } = request.body;

    const candidatura = await CandidaturasRepository.update(id, {
      id_vaga, id_candidato
    });

    response.json(candidatura);
  }
}

// Singleton
module.exports = new CandidaturaController();
