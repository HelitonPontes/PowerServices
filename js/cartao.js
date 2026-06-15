document.addEventListener('DOMContentLoaded', () => {
  const cardInner = document.getElementById('businessCard');
  
  if (cardInner) {
      // Ativa a rotação ao clicar/tocar (essencial para ecrãs táteis)
      cardInner.addEventListener('click', (e) => {
          // Impede a rotação do cartão se o utilizador clicar especificamente num link útil (telefone/email)
          if (e.target.closest('a')) {
              return; 
          }
          
          // Alterna a classe que executa o efeito 3D Flip
          cardInner.classList.toggle('flipped');
      });
  }
});