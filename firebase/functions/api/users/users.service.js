exports.getUser = (req, res, next) => {
  const mockUser = {
    name: 'Erik',
    surname: 'Eriksson',
    pnr: '19900303-1122',
    role: 'recruiter',
  };
  return mockUser;
};
