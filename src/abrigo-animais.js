
//1. Classe Animal
class Animal {
  constructor(nome, tipo, brinquedos) {
    this.nome = nome;
    this.tipo = tipo;
    this.brinquedos = brinquedos;
  }
}

//2. Classe AbrigoAnimais
class AbrigoAnimais {
  
  //Todos os animais do abrigo
  constructor() {
    
    this.animais = [
      new Animal ("Rex", "cao", ["RATO", "BOLA"]),
      new Animal ("Mimi", "gato", ["BOLA", "LASER"]),
      new Animal ("Fofo", "gato", ["BOLA", "RATO", "LASER"]),
      new Animal ("Zero", "gato", ["RATO", "BOLA"]),
      new Animal ("Bola", "cao", ["CAIXA", "NOVELO"]),
      new Animal ("Bebe", "cao", ["LASER", "RATO", "BOLA"]),
      new Animal ("Loco", "jabuti", ["SKATE", "RATO"])
    ];
  }
    
  
  //3. Método principal
encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const listaBrinquedosPessoa1 = brinquedosPessoa1.split(',').map( s => s.trim());
    const listaBrinquedosPessoa2 = brinquedosPessoa2.split(',').map( s => s.trim());
    const listaOrdemAnimais = ordemAnimais.split(',').map( s => s.trim());

  

    //Arrays para gravar os animais já vistos
      let animaisVistos = new Set();
    //Arrays para armazenar os animais de cada pessoa 
      let animaisPessoa1 = [];
      let animaisPessoa2 = [];
    //Cria o array listaFinal para armazenar os resultados para lista em ordem alfabética
      let listaFinal = [];
    


    //Loop que percorre a lista de animais na ordem desejada
    for (let i = 0; i < listaOrdemAnimais.length; i++) {
      let animalNome = listaOrdemAnimais[i];
      let animal = this.animais.find (a => a.nome === animalNome); //Procura o animal na lista do abrigo
    
      //Se não encontrar o animal, retorna erro
        if (!animal) {
        return {  erro: "Animal inválido",
          lista: null
        };
      }
      //Se o animal é repetido, retorna erro
      if (animaisVistos.has(animal.nome)) {
        return {  erro: "Animal repetido",
          lista: null
        };
      }
      
      //Adiciona o animal ao set de vistos
      animaisVistos.add(animalNome);


      //Arrays para controlar brinquedos vistos
      let brinquedosVistosPessoa1 = new Set();
      let brinquedosVistosPessoa2 = new Set();
    
      
      //Loop que verifica os brinquedos de cada animal
      for (let j = 0; j < animal.brinquedos.length; j++) {
        let b1 = listaBrinquedosPessoa1[j];
        let b2 = listaBrinquedosPessoa2[j];
        
        //Se o brinquedo for repetido por ela mesma, retorna erro
        if (brinquedosVistosPessoa1.has(b1)) return { lista: [], erro: "Brinquedo repetido" };
        if (brinquedosVistosPessoa2.has(b2)) return { lista: [], erro: "Brinquedo repetido" };
        
        //Marca como visto em sua respectiva lista
        brinquedosVistosPessoa1.add(b1);
        brinquedosVistosPessoa2.add(b2);
        
      }
      
      //Função para verificar se os brinquedos do animal aparecem na ordem correta
      function verificaOrdem( subsequencia, listaPessoa) {
        let indice = 0;

        for (let item of listaPessoa) {
          if (item === subsequencia[indice]) {
            indice++;
            if (indice === subsequencia.length) return true;
          }
        }
        return false;
      }
      
      //Verifica se os brinquedos do animal aparecem na ordem correta para cada pessoa
      let pessoa1Acertou = verificaOrdem(animal.brinquedos, listaBrinquedosPessoa1);
      let pessoa2Acertou = verificaOrdem(animal.brinquedos, listaBrinquedosPessoa2);
       
     
      //Regras e condições especiais: 
      

      //Limite de 3 animais por pessoa e armazenar os animais adotados por cada pessoa
      if (pessoa1Acertou && animaisPessoa1.length >= 3) {
        pessoa1Acertou = false;
      }
      if (pessoa2Acertou && animaisPessoa2.length >= 3) {
        pessoa2Acertou = false;
      }


        //Regra especial para gatos: não dividem brinquedos com outros animais da mesma pessoa
        if (animal.tipo === "gato") {

          //Some evita loops desnecessários
          if (pessoa1Acertou) {
            let conflitoPessoa1 = animaisPessoa1.some(adotadoNome => {  
              let adotado = this.animais.find(a => a.nome === adotadoNome);
              return adotado.brinquedos.some(b => animal.brinquedos.includes(b));
            });
            if (conflitoPessoa1) {
              pessoa1Acertou = false;
            }
        }
        if (pessoa2Acertou) {
          let conflitoPessoa2 = animaisPessoa2.some(adotadoNome => {
            let adotado = this.animais.find(a => a.nome === adotadoNome);
            return adotado.brinquedos.some(b => animal.brinquedos.includes(b));
          });
          if (conflitoPessoa2) {
            pessoa2Acertou = false;
          }
        }
      }


      //Regra especial Jabuti: Só pode ser adotado se a pessoa tiver outro animal, além de seus brinquedos, independente da ordem
      let locoElegivel = false;

       if (animal.nome === "Loco") {

        //Função para verificar se todos os brinquedos do animal estão na lista da pessoa (pois a função de ordem já foi verificada antes)
        function contemTodosBrinquedos (animalBrinquedos, listaPessoa) {
          return animalBrinquedos.every(b => listaPessoa.includes(b));
        }
        let pessoa1Tem = contemTodosBrinquedos(animal.brinquedos, brinquedosPessoa1);
        let pessoa2Tem = contemTodosBrinquedos(animal.brinquedos, brinquedosPessoa2);

        //Contabiliza animais já aprovados neste loop (mesmo que ainda não estejam na lista final)
       let animaisPessoa1Temp = [...animaisPessoa1];
       let animaisPessoa2Temp = [...animaisPessoa2];

        if (pessoa1Acertou) animaisPessoa1Temp.push(animal.nome);
        if (pessoa2Acertou) animaisPessoa2Temp.push(animal.nome);

        //Verifica se alguém já adotou outro animal e possui os brinquedos do jabuti
        if ((animaisPessoa1Temp.length + animaisPessoa2Temp.length > 0) && (pessoa1Tem || pessoa2Tem)) {
          
         if (pessoa1Tem) 
            pessoa1Acertou = true;
          if (pessoa2Tem) 
            pessoa2Acertou = true;
         } 
         else {
            pessoa1Acertou = false;
            pessoa2Acertou = false;
          }
       }  


       //Se os dois errarem, o animal volta para o abrigo
        if (!pessoa1Acertou && !pessoa2Acertou) {
          listaFinal.push(`${animal.nome} - abrigo`)
           
        }
        //Se ambos acertaram, o animal vai para o abrigo
        else if (pessoa1Acertou && pessoa2Acertou) {
          listaFinal.push(`${animal.nome} - abrigo`)
        }
        //Se apenas uma pessoa acertou, o animal vai para essa pessoa
        else if (pessoa1Acertou && !pessoa2Acertou) {
          listaFinal.push(`${animal.nome} - pessoa 1`)
        }
        //Se apenas a outra pessoa acertou, o animal vai para essa pessoa
        else if (!pessoa1Acertou && pessoa2Acertou) {
          listaFinal.push(`${animal.nome} - pessoa 2`)
        }
        //Essa linha já garante que os gatos que deram conflito vão para o abrigo
        else {
          listaFinal.push(`${animal.nome} - abrigo`)
        }

    }     
  
    //Ordena a lista final em ordem alfabética
listaFinal.sort(); 
//Retorna a lista final e nenhum erro
return { lista: listaFinal, erro: null };
    
  }
}  
 
//4. Export da classe principal
export { AbrigoAnimais as AbrigoAnimais };

