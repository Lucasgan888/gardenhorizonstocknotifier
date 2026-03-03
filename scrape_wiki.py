import urllib.request
import re
import os
import time

items = [
    'Uncommon Egg', 'Cactus', 'Tomato', 'Buttercup', 'Blueberry', 'Strawberry', 'Carrot',
    'Harvest Tool', 'Favorite Tool', 'Pet Name Reroller', 'Pet Lead', 'Recall Wrench', 
    'Trowel', 'Trading Ticket', 'Watering Can', 'Beach Crate', 'Summer Fun Crate', 
    'Cooking Kit', 'Stone Lantern', 'Viney Beam', 'Hay Bale', 'Brick Stack', 'Torch', 
    'White Bench', 'Safari Seed Pack', 'Zebra Whistle', 'Ancestral Horn', 'Orange Delight', 
    'Gecko', 'Fall Egg', 'Rake', 'Fall Seed Pack', 'Chipmunk', 'Maple Crate', 'Fall Crate'
]

out_dir = r"\\wsl.localhost\Ubuntu\root\.openclaw\workspace\projects\gardenhorizonstocknotifier\public\items"
if not os.path.exists(out_dir):
    try:
        os.makedirs(out_dir, exist_ok=True)
    except:
        out_dir = "public/items"
        os.makedirs(out_dir, exist_ok=True)

headers = {'User-Agent': 'Mozilla/5.0'}

base_urls = [
    'https://gardenhorizonswiki.com',
    'https://gardenhorizonswiki.com/plants',
    'https://gardenhorizonswiki.com/stock',
    'https://gardenhorizonswiki.com/gear'
]

# Fetch all HTML content first
html_content = ""
for url in base_urls:
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as res:
            html_content += res.read().decode('utf-8', errors='ignore') + "\n"
    except Exception as e:
        print("Failed to fetch", url, e)

# Extract all images ending in .png
# E.g. <img src="/images/Tomato.png" ...>
img_pattern = re.compile(r'<img[^>]+src=[\"\']([^\"\']+\.png)[\"\']', re.IGNORECASE)
found_images = img_pattern.findall(html_content)

downloaded = 0
for item in items:
    # Try to find a matching image URL for the item
    # e.g. /wp-content/uploads/2026/02/Tomato.png
    # or /Tomato_Icon.png
    item_nospace = item.replace(' ', '')
    item_underscore = item.replace(' ', '_')
    
    matched_url = None
    for img_url in found_images:
        parts = img_url.split('/')[-1].split('.')[0]
        # check if filename matches item name
        if item.lower() in parts.lower() or item_nospace.lower() in parts.lower() or item_underscore.lower() in parts.lower() or parts.lower() in item.lower():
            matched_url = img_url
            break
            
    if matched_url:
        if matched_url.startswith('/'):
            full_url = 'https://gardenhorizonswiki.com' + matched_url
        else:
            full_url = matched_url
            
        print(f"Found match for {item}: {full_url}")
        
        try:
            req = urllib.request.Request(full_url, headers=headers)
            with urllib.request.urlopen(req) as res:
                filename = item.replace(' ', '_').lower() + '.png'
                with open(os.path.join(out_dir, filename), 'wb') as f:
                    f.write(res.read())
                downloaded += 1
                print(f"-> Saved {filename}")
        except Exception as e:
            print(f"-> Failed to download {full_url}: {e}")
    else:
        # Let's try to directly hit the image if it follows a pattern
        print(f"No direct match in HTML for {item}. Trying direct guessing...")
        guesses = [
            f"https://gardenhorizonswiki.com/wp-content/uploads/2024/02/{item_nospace}.png",
            f"https://gardenhorizonswiki.com/wp-content/uploads/2024/02/{item_underscore}.png",
            f"https://gardenhorizonswiki.com/images/{item_underscore}.png",
            f"https://gardenhorizonswiki.com/images/{item_nospace}.png"
        ]
        for guess in guesses:
            try:
                req = urllib.request.Request(guess, headers=headers)
                with urllib.request.urlopen(req) as res:
                    filename = item.replace(' ', '_').lower() + '.png'
                    with open(os.path.join(out_dir, filename), 'wb') as f:
                        f.write(res.read())
                    downloaded += 1
                    print(f"-> Found and saved via guess: {guess}")
                    break
            except:
                pass

print(f"Finished scraping! Downloaded {downloaded}/{len(items)} images.")
