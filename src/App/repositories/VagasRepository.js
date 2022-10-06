const { v4 } = require('uuid');

const db = require('../../database');

class vagasRepository {
  async findAll() {
    const rows = await db.query(`
    SELECT *
    FROM vagas
    `);
    return rows;
  }

  async findById(id) {
    const [ row ] = await db.query(`
      SELECT * FROM vagas
      WHERE id = $1
    `, [ id ]);
    return row;
  }

  async create({
    nome, descricao, beneficios, requisitos
  }) {
    const [ row ] = await db.query(`
      INSERT INTO vagas(nome, descricao, beneficios, requisitos)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `, [nome, descricao, beneficios, requisitos]);

    return row;
  }

  async update(id,{
    nome, descricao, beneficios, requisitos
  }) {
    const [ row ] = await db.query(`
      UPDATE vagas
      SET nome = $1, descricao = $2, beneficios = $3, requisitos = $4
      WHERE id = $5
      RETURNING *
    `, [ nome, descricao, beneficios, requisitos, id ]);

    return row;
  }

}

// Singleton
module.exports = new vagasRepository();
