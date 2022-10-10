const { v4 } = require("uuid");

const db = require("../../database");

class CandidaturasRepository {
  async findAll() {
    const rows = await db.query(`
    SELECT candiatura.id, candiatura.id_vaga,
    candiatura.id_candidato, usuario.email,
    usuario.telefone, vagas.nome, vagas.descricao,
    vagas.beneficios, vagas.requisitos,
    usuario.nome AS nome_candidato, vagas.nome AS nome_vaga
    FROM candiatura
    LEFT JOIN usuario ON usuario.id = candiatura.id_candidato
    LEFT JOIN vagas ON vagas.id = candiatura.id_vaga
    `);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(
      `
      SELECT candiatura.id, candiatura.id_vaga,
      candiatura.id_candidato, usuario.email,
      usuario.telefone, vagas.nome, vagas.descricao,
      vagas.beneficios, vagas.requisitos,
      usuario.nome AS nome_candidato, vagas.nome AS nome_vaga
      FROM candiatura
      LEFT JOIN usuario ON usuario.id = candiatura.id_candidato
      LEFT JOIN vagas ON vagas.id = candiatura.id_vaga
      WHERE id = $1
    `,
      [id]
    );
    return row;
  }

  async findByVagaId(vaga_id) {
    const rows = await db.query(
      `
      SELECT candiatura.*, usuario.email,
      usuario.telefone, vagas.nome,
      usuario.nome AS nome_candidato
      FROM candiatura
      LEFT JOIN usuario ON usuario.id = candiatura.id_candidato
      LEFT JOIN vagas ON vagas.id = candiatura.id_vaga
      WHERE id_vaga = $1
    `,
      [vaga_id]
    );
    return rows;
  }

  async findCandidaturaByUserIdAndVagaId(vaga_id, user_id) {
    const rows = await db.query(
      `
      select * from candiatura
      where id_vaga = $1
      and id_candidato = $2
    `,
      [vaga_id, user_id]
    );
    return rows;
  }

  async findByCandidatoId(candidato_id) {
    const rows = await db.query(
      `
      SELECT candiatura.id, candiatura.id_vaga,
      candiatura.id_candidato, usuario.email,
      usuario.telefone, vagas.nome,
      usuario.nome AS nome_candidato, vagas.nome AS nome_vaga
      FROM candiatura
      LEFT JOIN usuario ON usuario.id = candiatura.id_candidato
      LEFT JOIN vagas ON vagas.id = candiatura.id_vaga
      WHERE id_candidato = $1
    `,
      [candidato_id]
    );
    return rows;
  }

  async create({ id_vaga, id_candidato }) {
    const [row] = await db.query(
      `
      INSERT INTO candiatura(id_vaga, id_candidato)
      VALUES($1, $2)
      RETURNING *
    `,
      [id_vaga, id_candidato]
    );

    return row;
  }

  async update(id, { id_vaga, id_candidato }) {
    const [row] = await db.query(
      `
      UPDATE candiatura
      SET id_vaga = $1, id_candidato = $2
      WHERE id = $3
      RETURNING *
    `,
      [id_vaga, id_candidato, id]
    );

    return row;
  }
}

// Singleton
module.exports = new CandidaturasRepository();
