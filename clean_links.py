import os
import re

root_dir = 'src/app/app-domain'
pattern = re.compile(r'([\"''])(\/app-domain)([\/\"])')

count = 0
for dirpath, _, filenames in os.walk(root_dir):
    for filename in filenames:
        if filename.endswith('.tsx') or filename.endswith('.ts'):
            filepath = os.path.join(dirpath, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = pattern.sub(r'\1\3', content)
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                count += 1
                print('Fixed:', filepath)

print(f'Total files modified: {count}')
