# Lab08 - Projeções e Visibilidade

Nesse Lab você pode avaliar:

1. Como utilizar e controlar as matrizes de modelagem, visibilidade e projeção dentro do *vertex shader*
2. Qual a influência dos algoritmos de visibilidade no contexto das imagens geradas de modelos mais complexos.

Após analise cuidadosa do código, tente fazer o que se pede:

1. Modeladores 3D costumam apresentar uma configuração para visualização simmultanea das 4 vistas de um objeto, em porções independentes da janela de visualização, como na Figura 1. Utilizando os *shaders* do exemplo 1, construa uma nova aplicação capaz de mostrar as 4 vistas simultaneamente na mesma janela, como na Figura 1. 

![](https://b3d.interplanety.org/wp-content/upload_content/2019/12/02.jpg)

2. Mofique os parâmetros da camera para que os efeitos do *z fighting* sejam visíveis.

3. Modifique o controlador de camera para que se tenha a sensação de estar andando dentro do modelo da cidade. Limite os movimentos do controlador para que o observador não avance alem dos limites do modelo da cidade, nem possa descer abaixo do solo.   
