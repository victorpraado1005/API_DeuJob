const { Router } = require('express');

const UserController = require('./App/controllers/UserController');
const VagaController = require('./App/controllers/VagaController');
const CandidaturaController = require('./App/controllers/CandidaturaController');

const router = Router();

router.get('/', function (req, res){
  res.send("Olá, estamos no ar!");
});

//users
router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);
router.post('/users', UserController.store);
router.put('/users/:id', UserController.update);

//vagas
router.get('/vagas', VagaController.index);
router.get('/vagas/:id', VagaController.show);
router.post('/vagas', VagaController.store);
router.put('/vagas/:id', VagaController.update);

//candidatos
router.get('/candidatos', CandidaturaController.index);
router.get('/candidatos/:vaga_id', CandidaturaController.showCandidatosByVagaId);
router.get('/user/vagas/:candidato_id', CandidaturaController.showByCandidatoId);
router.post('/candidatos', CandidaturaController.store);
router.put('/candidatos/:id', CandidaturaController.update);

module.exports = router;
