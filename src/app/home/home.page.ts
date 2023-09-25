import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  listaCompras: any[] = [];
  total: number = 0;

  adicionarItem() {
    const nome = prompt('Nome do item:');
    if (!nome) {
      return;
    }

    const quantidadeStr = prompt('Quantidade:');
    if (quantidadeStr === null) {
      return;
    }
    
    const precoUnitarioStr = prompt('Preço unitário:');
    if (precoUnitarioStr === null) {
      return;
    }

    const quantidade = parseFloat(quantidadeStr);
    const precoUnitario = parseFloat(precoUnitarioStr);

    if (isNaN(quantidade) || isNaN(precoUnitario)) {
      alert('Por favor, insira valores válidos.');
      return;
    }

    const totalItem = quantidade * precoUnitario;

    const index = this.listaCompras.findIndex((item) => item.nome === nome);
    if (index !== -1) {
      this.listaCompras[index].quantidade += quantidade;
      this.listaCompras[index].total += totalItem;
    } else {
      this.listaCompras.push({
        nome,
        quantidade,
        preco: precoUnitario.toFixed(2), // Arredonda para 2 casas decimais
        total: totalItem.toFixed(2), // Arredonda para 2 casas decimais
      });
    }

    this.calcularTotal();
  }

  calcularTotal() {
    let totalCalculado = 0;

    for (const item of this.listaCompras) {
      totalCalculado += parseFloat(item.total);
    }

    this.total = parseFloat(totalCalculado.toFixed(2));
  }

  removerItem(index: number) {
    if (confirm('Tem certeza de que deseja remover este item?')) {
      this.listaCompras.splice(index, 1);
      this.calcularTotal();
    }
  }

  removerUnidade(index: number) {
    if (this.listaCompras[index].quantidade > 1) {
      this.listaCompras[index].quantidade--;
      this.listaCompras[index].total -= parseFloat(this.listaCompras[index].preco);
      this.calcularTotal();
    }
  }

  adicionarUnidade(index: number) {
    this.listaCompras[index].quantidade++;
    this.listaCompras[index].total += parseFloat(this.listaCompras[index].preco);
    this.calcularTotal();
  }
}
