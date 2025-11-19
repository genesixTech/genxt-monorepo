const { body, param, query } = require('express-validator');

// Validadores para registro de usuário
const validateRegister = [
  body('nome')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Nome deve ter entre 2 e 100 caracteres')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
    .withMessage('Nome deve conter apenas letras e espaços'),

  body('email')
    .trim()
    .isEmail()
    .withMessage('Email deve ter um formato válido')
    .normalizeEmail()
    .isLength({ max: 255 })
    .withMessage('Email muito longo'),

  body('senha')
    .isLength({ min: 8, max: 128 })
    .withMessage('Senha deve ter entre 8 e 128 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Senha deve conter pelo menos: 1 letra minúscula, 1 maiúscula e 1 número'),

  body('confirmar_senha')
    .custom((value, { req }) => {
      if (value !== req.body.senha) {
        throw new Error('Confirmação de senha não confere');
      }
      return true;
    }),
];

// Validadores para login
const validateLogin = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Email deve ter um formato válido')
    .normalizeEmail(),

  body('senha')
    .notEmpty()
    .withMessage('Senha é obrigatória'),
];

// Validadores para atualização de perfil básico
const validateUpdateProfile = [
  body('nome')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Nome deve ter entre 2 e 100 caracteres')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
    .withMessage('Nome deve conter apenas letras e espaços'),

  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Email deve ter um formato válido')
    .normalizeEmail(),
];

// Validadores para perfil detalhado
const validateDetailedProfile = [
  body('area_atuacao')
    .optional()
    .isIn([
      'tecnologia', 'marketing', 'vendas', 'produto', 'design',
      'financeiro', 'recursos_humanos', 'operacoes', 'consultoria',
      'educacao', 'saude', 'outros'
    ])
    .withMessage('Área de atuação inválida'),

  body('tamanho_empresa')
    .optional()
    .isIn([
      'freelancer', 'startup_1_10', 'pequena_11_50', 'media_51_200',
      'grande_201_1000', 'corporacao_1000_plus'
    ])
    .withMessage('Tamanho da empresa inválido'),

  body('nivel_conhecimento')
    .optional()
    .isIn(['iniciante', 'intermediario', 'avancado', 'especialista'])
    .withMessage('Nível de conhecimento inválido'),

  body('objetivo_principal')
    .optional()
    .isIn([
      'criar_primeiro_produto', 'melhorar_produto_existente', 'validar_ideia',
      'estruturar_processo', 'capacitar_equipe', 'consultoria_clientes', 'outros'
    ])
    .withMessage('Objetivo principal inválido'),

  body('whatsapp')
    .optional()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('WhatsApp deve ter um formato válido'),

  body('origem_conhecimento')
    .optional()
    .isIn([
      'google', 'linkedin', 'instagram', 'youtube', 'indicacao',
      'evento', 'blog', 'podcast', 'outros'
    ])
    .withMessage('Origem de conhecimento inválida'),

  body('bio')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Bio deve ter no máximo 500 caracteres'),

  body('linkedin_url')
    .optional()
    .isURL()
    .withMessage('URL do LinkedIn inválida'),

  body('github_url')
    .optional()
    .isURL()
    .withMessage('URL do GitHub inválida'),

  body('website_url')
    .optional()
    .isURL()
    .withMessage('URL do website inválida'),
];

// Validadores para mudança de senha
const validateChangePassword = [
  body('senha_atual')
    .notEmpty()
    .withMessage('Senha atual é obrigatória'),

  body('nova_senha')
    .isLength({ min: 8, max: 128 })
    .withMessage('Nova senha deve ter entre 8 e 128 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Nova senha deve conter pelo menos: 1 letra minúscula, 1 maiúscula e 1 número'),

  body('confirmar_nova_senha')
    .custom((value, { req }) => {
      if (value !== req.body.nova_senha) {
        throw new Error('Confirmação da nova senha não confere');
      }
      return true;
    }),
];

// Validadores para reset de senha
const validateResetPassword = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Email deve ter um formato válido')
    .normalizeEmail(),
];

const validateConfirmResetPassword = [
  body('token')
    .notEmpty()
    .withMessage('Token é obrigatório')
    .isLength({ min: 32, max: 128 })
    .withMessage('Token inválido'),

  body('nova_senha')
    .isLength({ min: 8, max: 128 })
    .withMessage('Nova senha deve ter entre 8 e 128 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Nova senha deve conter pelo menos: 1 letra minúscula, 1 maiúscula e 1 número'),

  body('confirmar_nova_senha')
    .custom((value, { req }) => {
      if (value !== req.body.nova_senha) {
        throw new Error('Confirmação da nova senha não confere');
      }
      return true;
    }),
];

// Validadores para parâmetros de URL
const validateUserId = [
  param('id')
    .isUUID()
    .withMessage('ID do usuário deve ser um UUID válido'),
];

// Validadores para paginação
const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Página deve ser um número inteiro maior que 0'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limite deve ser um número entre 1 e 100'),
];

// Validadores para busca
const validateSearch = [
  query('q')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Termo de busca deve ter entre 1 e 100 caracteres'),

  query('sort')
    .optional()
    .isIn(['created_at', 'updated_at', 'nome', 'email'])
    .withMessage('Campo de ordenação inválido'),

  query('order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Ordem deve ser "asc" ou "desc"'),
];

// Validadores para upload de avatar
const validateAvatar = [
  body('avatar_url')
    .optional()
    .isURL()
    .withMessage('URL do avatar inválida'),
];

// Validador customizado para verificar se email já existe
const checkEmailExists = async (email, { req }) => {
  const { User } = require('../models');
  
  const existingUser = await User.findOne({ 
    where: { email },
    paranoid: false // Incluir usuários soft-deleted
  });
  
  // Se está atualizando o próprio email, permitir
  if (existingUser && req.user && existingUser.id === req.user.id) {
    return true;
  }
  
  if (existingUser) {
    throw new Error('Este email já está em uso');
  }
  
  return true;
};

// Validador para verificar se usuário existe
const checkUserExists = async (userId) => {
  const { User } = require('../models');
  
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('Usuário não encontrado');
  }
  
  return true;
};

module.exports = {
  validateRegister,
  validateLogin,
  validateUpdateProfile,
  validateDetailedProfile,
  validateChangePassword,
  validateResetPassword,
  validateConfirmResetPassword,
  validateUserId,
  validatePagination,
  validateSearch,
  validateAvatar,
  checkEmailExists,
  checkUserExists,
};
