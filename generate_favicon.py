from PIL import Image
import os

# Open the logo image
logo_path = os.path.join('public', 'images', 'logo2.png')
logo = Image.open(logo_path)

# Resize the logo to common favicon sizes
sizes = [(16, 16), (32, 32), (48, 48), (64, 64)]
images = []

for size in sizes:
    resized = logo.resize(size, Image.Resampling.LANCZOS)
    images.append(resized)

# Save as ICO file
favicon_path = os.path.join('public', 'favicon.ico')
images[0].save(favicon_path, format='ICO', sizes=sizes, append_images=images[1:])
