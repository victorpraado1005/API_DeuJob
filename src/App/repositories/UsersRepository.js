const { v4 } = require('uuid');

const db = require('../../database');

class usuarioRepository {
  async findAll() {
    const rows = await db.query(`
    SELECT *
    FROM usuario
    `);
    return rows;
  }

  async findById(id) {
    const [ row ] = await db.query(`
      SELECT * FROM usuario
      WHERE id = $1
    `, [ id ]);
    return row;
  }

  async findByEmail(email){
    const [ row ] = await db.query(`
      SELECT email
      FROM usuario
      WHERE email = $1
    `, [ email ]);
    return row;
  }

  async findUserByEmailAndPassword(email, senha) {
    const [ row ] = await db.query(`
      SELECT id, nome
      FROM usuario
      WHERE email = $1 AND senha = $2
    `, [ email, senha ]);
    return row;
  }

  async create({
    nome, email, senha, telefone, pontos
  }) {
    const [ row ] = await db.query(`
      INSERT INTO usuario(nome, email, senha, telefone, pontos)
      VALUES($1, $2, $3, $4, $5)
      RETURNING *
    `, [nome, email, senha, telefone, pontos]);

    return row;
  }

  async updateInfoPessoal(id,{
    nome, email, telefone, genero, cidade, estado
  }) {
    const [ row ] = await db.query(`
      UPDATE usuario
      SET nome = $1, email = $2, telefone = $3, genero = $4, cidade = $5, estado = $6
      WHERE id = $7
      RETURNING *
    `, [ nome, email, telefone, genero, cidade, estado, id ]);

    return row;
  }

  async updateInfoProfissional(id,{
    formacao_academica, habilidades, historico_profissional, pretensao_salarial
  }) {
    const [ row ] = await db.query(`
      UPDATE usuario
      SET formacao_academica = $1, habilidades = $2, historico_profissional = $3, pretensao_salarial = $4
      WHERE id = $5
      RETURNING *
    `, [ formacao_academica, habilidades, historico_profissional, pretensao_salarial, id ]);

    return row;
  }

  async update(id,{
    nome, email, senha, telefone, pontos
  }) {
    const [ row ] = await db.query(`
      UPDATE usuario
      SET nome = $1, email = $2, senha = $3, telefone = $4, pontos = $5
      WHERE id = $6
      RETURNING *
    `, [ nome, email, senha, telefone, pontos, id ]);

    return row;
  }

  async updatePontos(id,{
    pontos
  }) {
    const [ row ] = await db.query(`
      UPDATE usuario
      SET pontos = $1
      WHERE id = $2
      RETURNING *
    `, [ pontos, id ]);

    return row;
  }

}

// Singleton
module.exports = new usuarioRepository();
