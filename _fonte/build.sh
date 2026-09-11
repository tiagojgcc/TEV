#!/usr/bin/env bash
# Reconstrói "TEV na Prática" a partir das partes g1..g5 e grava-o como index.html na raiz do repositório
# (é o ficheiro que o GitHub Pages publica em https://tiagojgcc.github.io/TEV/).
set -e
cd "$(dirname "$0")"
cat g1.html g2.html g3.html g4.html g5.html > ../index.html
# verificações mínimas: sem travessões, sintaxe JavaScript válida
if grep -q '—' ../index.html; then echo "ERRO: travessão (—) encontrado em index.html"; exit 1; fi
node -e "const fs=require('fs');const h=fs.readFileSync('../index.html','utf8');for(const m of h.matchAll(/<script>([\s\S]*?)<\/script>/g)){new Function(m[1])}console.log('index.html: sintaxe ok')"
echo "OK: index.html reconstruído."
