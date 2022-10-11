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

  async findUserByEmailAndPassword(email, password) {
    const [ row ] = await db.query(`
      SELECT id, name
      FROM usuario
      WHERE email = $1 AND senha = $2
    `, [ email, password ]);
    return row;
  }

  async findUserByEmailAndPassword(email, password) {
    const [ row ] = await db.query(`
      SELECT id, name
      FROM usuario
      WHERE email = $1 AND password = $2
    `, [ email, password ]);
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

}

// Singleton
module.exports = new usuarioRepository();
