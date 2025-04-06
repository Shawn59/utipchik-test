export const getBadeContentMDAPI = () => {
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
