import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });

test('Pessoa não pode ter mais de 3 animais', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
        'RATO,BOLA,LASER', 
        'RATO,NOVELO,LASER', 
        'Rex,Fofo,Mimi,Bebe'
    );
    console.log(resultado.lista);
});

test('Não permite animal repetido', () => {
  const resultado = new AbrigoAnimais().encontraPessoas(
    'RATO,BOLA', 
    'RATO,NOVELO', 
    'Rex,Rex' // mesmo animal duas vezes
  );
  expect(resultado.erro).toBe('Animal repetido');
  expect(resultado.lista).toBeFalsy();
});

// Teste A: conflito de brinquedos (gato deve voltar para o abrigo)
test('Gato volta para abrigo se pessoa já tiver outro animal com brinquedo igual', () => {
  const resultado = new AbrigoAnimais().encontraPessoas(
    'RATO,BOLA,LASER',   // brinquedos da pessoa 1
    'NOVELO,BOLA,LASER', // brinquedos da pessoa 2
    'Rex,Fofo'           // Rex é adotado primeiro, depois Fofo (gato)
  );

  // Rex (cão) é adotado pela pessoa 1
  expect(resultado.lista).toContain('Rex - pessoa 1');

  // Fofo (gato) tem brinquedo em comum com Rex, deve ir para o abrigo
  expect(resultado.lista).toContain('Fofo - abrigo');

  // Nenhum gato deve permanecer com a pessoa
  expect(resultado.lista).not.toContain('Fofo - pessoa 1');
});

// Teste B: sem conflito (gato deve ser adotado pela mesma pessoa)
test('Gato sem conflito de brinquedos é adotado pela pessoa quando já há outro animal sem sobreposição', () => {
  const resultado = new AbrigoAnimais().encontraPessoas(
    'CAIXA,NOVELO,BOLA,LASER', // brinquedos da pessoa 1 — permite adotar Bola primeiro e depois Mimi
    'RATO,BOLA',               // brinquedos da pessoa 2 (irrelevante aqui)
    'Bola,Mimi'                // Bola (cão) é adotado primeiro; Mimi (gato) vem depois e NÃO compartilha brinquedos com Bola
  );

  // Bola (cão) é adotado pela pessoa 1
  expect(resultado.lista).toContain('Bola - pessoa 1');

  // Mimi (gato) não tem brinquedo em comum com Bola, então deve ser adotada também
  expect(resultado.lista).toContain('Mimi - pessoa 1');

  // Mimi não deve voltar para o abrigo
  expect(resultado.lista).not.toContain('Mimi - abrigo');
});

test('Jabuti Loco pode ser adotado se pessoa tiver outro animal e todos os brinquedos', () => {
  const resultado = new AbrigoAnimais().encontraPessoas(
    'SKATE,RATO,BOLA',  // brinquedos da pessoa 1
    'BOLA,LASER', // brinquedos da pessoa 2
    'Rex,Zero,Loco'          // Rex e zero são processados primeiro, Loco depois
  );
  expect(resultado.lista).toContain('Loco - pessoa 1'); // Loco pode ser adotado
});

test('Jabuti vai para o abrigo se pessoa não tiver outro animal ou não tiver todos os brinquedos', () => {
  const resultado = new AbrigoAnimais().encontraPessoas(
    'RATO,BOLA',      // brinquedos da pessoa 1
    'NOVELO,LASER',   // brinquedos da pessoa 2
    'Loco'            // Jabuti sem outros animais adotados
  );

  // Ninguém tem outro animal ou todos os brinquedos, então Loco volta para o abrigo
  expect(resultado.lista).toContain('Loco - abrigo');
  expect(resultado.lista).not.toContain('Loco - pessoa 1');
  expect(resultado.lista).not.toContain('Loco - pessoa 2');
  expect(resultado.erro).toBeFalsy();
});

// 1) Ambas as pessoas "erram" porque têm os brinquedos na ordem errada -> animal volta para o abrigo
test('Animal volta para abrigo se ambas as pessoas errarem (brinquedos presentes mas em ordem errada)', () => {
  const resultado = new AbrigoAnimais().encontraPessoas(
    'BOLA,RATO',   // pessoa 1 tem os brinquedos, mas ordem invertida (Rex precisa RATO,BOLA)
    'BOLA,RATO',   // pessoa 2 idem
    'Rex'
  );

  // Como a verificação exige a ordem RATO -> BOLA, ambas falham e Rex vai para o abrigo
  expect(resultado.lista).toContain('Rex - abrigo');
  expect(resultado.lista).not.toContain('Rex - pessoa 1');
  expect(resultado.lista).not.toContain('Rex - pessoa 2');
  expect(resultado.erro).toBeFalsy();
});

// 2) Empate: ambas as pessoas têm os brinquedos na ordem correta -> por regra, vai para o abrigo
test('Animal vai para abrigo se ambas as pessoas acertarem (empate)', () => {
  const resultado = new AbrigoAnimais().encontraPessoas(
    'RATO,BOLA',   // pessoa 1 tem os brinquedos na ordem correta
    'RATO,BOLA',   // pessoa 2 também
    'Rex'
  );

  // Ambos poderiam adotar, mas regra de empate manda para o abrigo
  expect(resultado.lista).toContain('Rex - abrigo');
  expect(resultado.lista).not.toContain('Rex - pessoa 1');
  expect(resultado.lista).not.toContain('Rex - pessoa 2');
  expect(resultado.erro).toBeFalsy();
});



});
