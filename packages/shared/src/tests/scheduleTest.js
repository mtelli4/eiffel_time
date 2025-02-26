export function getProperties(description) {
  let test = description.split('\n')
  test = test.filter((x) => x !== '')
  const groups = ['TD', 'TP']

  if (groups.some((group) => test[0].includes(group))) {
    return [test[0], test[1]]
  }
  return [test[1], test[0]]
}

describe('getProperties', () => {
  test('Retourne les deux premières lignes si la première contient un groupe', () => {
    const description = 'TD Example\nProperty 1\nProperty 2';
    expect(getProperties(description)).toEqual(['TD Example', 'Property 1']);
  });

  test("Inverse l'ordre si la première ligne ne contient pas de groupe", () => {
    const description = 'Some text\nTD Example\nProperty 1';
    expect(getProperties(description)).toEqual(['TD Example', 'Some text']);
  });

  test('Ignore les lignes vides', () => {
    const description = '\nTD Example\n\nProperty 1\n';
    expect(getProperties(description)).toEqual(['TD Example', 'Property 1']);
  });

  test('Gère les descriptions avec une seule ligne', () => {
    const description = 'Single line';
    expect(() => getProperties(description)).toThrow();
  });

  test('Gère une entrée vide', () => {
    const description = '';
    expect(() => getProperties(description)).toThrow();
  });
});