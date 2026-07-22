import os
import re

files_to_edit = [
    'dashboard_admin.html',
    'dashboard_distributor.html',
    'dashboard_sales.html',
    'js/unilever_db.js',
    'js/sales_components.js',
    'js/leaflet_map_common.js'
]

for filename in files_to_edit:
    if os.path.exists(filename):
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()

        # Replace Unilever -> Innovax Solutions
        content = re.sub(r'Unilever', 'Innovax Solutions', content)
        content = re.sub(r'unilever', 'innovax_solutions', content) # for variables/urls if needed, wait, maybe just case insensitive
        
        # Actually let's do exact match first
        # Unilever -> Innovax Solutions
        # unilever -> innovax_solutions
        # UNILEVER -> INNOVAX_SOLUTIONS
        
        # Truck -> Vehicle
        # truck -> vehicle
        # TRUCK -> VEHICLE
        
        def replace_preserve_case(text, word_to_find, word_to_replace):
            def repl(match):
                word = match.group()
                if word.isupper():
                    return word_to_replace.upper()
                elif word.istitle():
                    return word_to_replace.title()
                elif word.islower():
                    return word_to_replace.lower()
                else:
                    return word_to_replace
            return re.sub(re.escape(word_to_find), repl, text, flags=re.IGNORECASE)

        # wait, innovax_solutions for lowercase unilever? 
        # let's be careful about css class names and file paths.
        
        # Let's replace 'Unilever' -> 'Innovax Solutions'
        # 'unilever' -> 'innovax_solutions'
        # 'UNILEVER' -> 'INNOVAX_SOLUTIONS'
        
        # For truck:
        # 'Truck' -> 'Vehicle'
        # 'truck' -> 'vehicle'
        # 'TRUCK' -> 'VEHICLE'

        new_content = content
        
        # Manual replacements to avoid css/js breakage?
        # The user just asked for "Unilever" and "truck" in the 3 html files.
        # Let's just do it in the 3 HTML files as requested.

        pass
