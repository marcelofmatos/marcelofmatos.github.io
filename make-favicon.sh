# Automação para todas as resoluções
for size in 57 76 120 144 152 180; do
  convert favicon.png -resize ${size}x${size} apple-touch-icon-${size}x${size}.png
done


# Android Chrome a partir do favicon.png
convert favicon.png -resize 192x192 android-chrome-192x192.png
convert favicon.png -resize 512x512 android-chrome-512x512.png
