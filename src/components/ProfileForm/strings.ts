export const strings = {
  title: 'Perfil',
  fields: {
    username: {
      label: 'Username',
      placeholder: 'Seu username',
      description: 'Obrigatório, com mínimo de 2 caracteres e máximo de 30.',
      error: (value: number) => `Limite de ${value} caracteres.`,
    },
    name: {
      label: 'Nome',
      placeholder: 'Seu nome',
      description: 'Usaremos para personalizar e-mails administrativos.',
      error: (value: number) => `Limite de ${value} caracteres.`,
    },
    avatar: {
      label: 'Avatar',
      placeholder: '',
      description: 'Máximo de 2 MB em qualquer formato de imagem.',
      error: `Máximo de 2 MB.`,
    },
  },
  button: 'Atualizar o perfil',
};
