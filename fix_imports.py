import os

files = [
    "src/routes/index.tsx",
    "src/routes/agadir-airport-taxi.tsx",
    "src/routes/agadir-airport-transfer.tsx",
    "src/routes/agadir-taxi.tsx",
    "src/routes/airport-transfer-taghazout.tsx",
    "src/routes/airport-transfer-tamraght.tsx",
    "src/routes/checkout.tsx",
    "src/routes/private-driver-agadir.tsx",
    "src/routes/reservation.tsx"
]

import_line = 'import { createFileRoute } from "@tanstack/react-router";\n'

for file_path in files:
    full_path = os.path.join("/home/ubuntu/agadirdriver", file_path)
    if not os.path.exists(full_path):
        print(f"Skipping {file_path}, not found.")
        continue
    
    with open(full_path, "r") as f:
        content = f.read()
    
    if "createFileRoute" in content and 'from "@tanstack/react-router"' not in content:
        print(f"Fixing {file_path}...")
        with open(full_path, "w") as f:
            f.write(import_line + content)
    else:
        print(f"No fix needed for {file_path}.")
