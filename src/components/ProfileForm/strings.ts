export const strings = {
  title: 'Perfil',
  fields: {
    username: {
      label: 'Username',
      placeholder: 'Seu username',
      description: (min: number, max: number) =>
        `Obrigatório, com mínimo de ${min} caracteres e máximo de ${max}.`,
      error: {
        required: (min: number) =>
          `Campo obrigatório com mínimo de ${min} caracteres.`,
        max: (value: number) => `Limite de ${value} caracteres.`,
      },
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
  toasts: {
    uploadImageError: {
      title: 'Erro ao salvar a imagem',
      description:
        'Encontramos um erro ao tentar salvar sua imagem. Por favor, tente novamente.',
    },
    updateDataSuccess: {
      description: 'Informações atualizadas com sucesso!',
    },
    updateDataError: {
      title: 'Erro ao atualizar os dados',
      description:
        'Tivemos um problema ao atualizar seus dados. Por favor, tente novamente.',
    },
  },
  button: 'Atualizar o perfil',
};
