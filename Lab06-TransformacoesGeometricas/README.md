# Lab06 - Transformações Geométricas

Nesse Lab analisaremos como as trasnformações geométricas controlam a **posição**, **escala** e **orientação** dos modelos durante o processo de renderização. 

Após analisar com cuidado os códigos fornecidos nesse Lab e faça o que se pede:

1. Com base no código do exemplo *Sistema Planetário* implemente os movimentos do planeta Terra e de sua Lua. São eles: rotação ao redor do próprio eixo em cada um, rotação so satélite ao redor de seu planeta, e a rotação do sistema Terra/Luz ao redor do Sol.
2. Analise o exemplo *Instancias*  que utiliza um mecanismo bastante usado para modelos que se repetem muitas vezes dentro de um cenário: a *InstancedMesh*[^1][^2]. Reproduza o mesmo tipo de movimento implementado no item anterior, agora controlando as matrizes de transformação de cada instancia. 
3. Com base no código de *cisalhamento*, que implementa uma transformação geométrica "diferente" diretamente no *Vertex Shader*, pense em uma outra transformação que não possui suporte direto no *Three.JS*. Tente generalizar o código fornecido para aplicar uma matriz cujos elementos são passados por parâmetro.

[^1]: Documentação das *InstancedMesh*: https://threejs.org/docs/index.html?q=instan#api/en/objects/InstancedMesh
[^2]: Exemplo de uso de vários modelos com o *InstancedMesh*: https://threejs.org/examples/?q=instanc#webgl_buffergeometry_instancing
