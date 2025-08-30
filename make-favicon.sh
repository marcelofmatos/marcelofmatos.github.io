#!/bin/bash
# Gerar todos os ícones a partir do favicon.png

# Verificar se favicon.png existe
if [ ! -f "favicon.png" ]; then
    echo "Erro: favicon.png não encontrado"
    exit 1
fi

# Apple Touch Icons
for size in 57 76 120 144 152 180; do
    convert favicon.png -resize ${size}x${size} apple-touch-icon-${size}x${size}.png
    echo "Gerado: apple-touch-icon-${size}x${size}.png"
done

# Android Chrome
convert favicon.png -resize 192x192 android-chrome-192x192.png
convert favicon.png -resize 512x512 android-chrome-512x512.png

# Favicon ICO
convert favicon.png -resize 16x16 -resize 32x32 -resize 48x48 favicon.ico

echo "Todos os ícones foram gerados com sucesso!"