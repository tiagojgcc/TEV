# O que fazer (uma vez)

## 1. Repositório público `tev` (já existe)
Em github.com/tiagojgcc/tev: "Add file" > "Upload files" e arrastar TUDO o que está na pasta TEV/publicar
(index.html, CLAUDE.md, qr-tev.png e a pasta _fonte). "Commit changes".
Os ficheiros com o mesmo nome são substituídos. Os antigos (tev-consulta.html, tev-na-pratica.html, c1/c2/c3, tab*.jpg)
ficam lá até à primeira sessão em claude.ai/code, onde o Claude os apaga.

## 2. Repositório privado `tev-privado` (novo)
github.com/new > nome `tev-privado` > PRIVATE > "Add a README file" > Create.
"Add file" > "Upload files": arrastar o conteúdo da pasta TEV/privado (README.md, TEV Consulta.html, pasta consulta)
e, na pasta bibliografia, todos os PDFs da pasta TEV. "Commit changes".
(Se o upload falhar por tamanho, fazer em duas ou três vezes.)

## 3. Ligar o GitHub à conta Claude (uma vez)
claude.ai/code > "Continue on web" > "Sign in with GitHub" > Authorize > "Skip" na instalação da app.

## 4. Primeira sessão
Em claude.ai/code, no seletor de repositório escolher `tiagojgcc/tev` E `tiagojgcc/tev-privado` (branch main nos dois).
Colar esta mensagem:

Lê o CLAUDE.md do repositório tev. Limpa o repositório tev: apaga tev-consulta.html, tev-na-pratica.html e, em _fonte,
c1.html, c2.html, c3.html, tab3.jpg, tab11.jpg, tab4.jpg e tab8.jpg; garante que index.html é gerado por _fonte/build.sh.
Confirma que consegues ler os PDFs em tev-privado/bibliografia. Faz commit direto no main do tev e diz-me o endereço publicado.

## Daqui em diante
Cada alteração pede-se numa sessão em claude.ai/code com os dois repositórios selecionados. O Claude edita as fontes,
faz o build, verifica e faz commit no main; a página https://tiagojgcc.github.io/tev/ atualiza-se sozinha.
A pasta TEV do computador deixa de ser a cópia principal (fica como backup); os PDFs novos juntam-se em tev-privado/bibliografia.
