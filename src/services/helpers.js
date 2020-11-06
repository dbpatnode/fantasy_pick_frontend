export const getTime = () => {
  var now = new Date();
  var isoDate = new Date(
    now.getTime() - now.getTimezoneOffset() * 60000
  ).toISOString();

  return isoDate;
};
export const sortBy = (list) => {
  return list.sort(function (a, b) {
    let nameA = a.league_name.toUpperCase();
    let nameB = b.league_name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
};
export const sortByPick = (list) => {
  return list.sort(function (a, b) {
    let nameA = a.match.id;
    let nameB = b.match.id;
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
};
