export const getBaseContentMDAPI = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        status: 'success',
        fastFilters: [
          {
            id: 1,
            name: 'Всё',
            count: 100,
          },
          {
            id: 2,
            name: 'На модернизацию',
            count: 10,
          },
          {
            id: 3,
            name: 'Одобрено',
            count: 23,
          },
          {
            id: 4,
            name: 'Отправлено и ожидает',
            count: 34,
          },
          {
            id: 5,
            name: 'Возвращено',
            count: 1,
          },
        ],
        elements: [
          {
            id: 1,
            name: 'Alo',
          },
        ],
      };

      resolve(response);
    }, 1000);
  });
};

export const getMediaSearchListAPI = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        status: 'success',
        elements: [
          {
            id: 1,
            name: 'Стрим',
          },

          {
            id: 2,
            name: 'Стрим 2',
          },

          {
            id: 3,
            name: 'Реклама',
          },

          {
            id: 4,
            name: 'Кинцо',
          },

          {
            id: 5,
            name: 'Кинофильм',
          },
        ],
      };

      resolve(response);
    }, 300);
  });
};
