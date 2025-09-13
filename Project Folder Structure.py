import os

# List of files/folders to ignore
ignore_list = [
    "node_modules",
    "dist",
    ".git",
    ".env.local",
    "package-lock.json",
    "__pycache__",
    ".DS_Store",
    "*.log"
]

def should_ignore(name):
    # Check if name matches any ignore pattern
    for pattern in ignore_list:
        if pattern.startswith("*") and name.endswith(pattern[1:]):
            return True
        if name == pattern:
            return True
    return False

def print_directory_tree(root_dir, file, prefix=""):
    entries = sorted(os.listdir(root_dir))
    entries = [e for e in entries if not should_ignore(e)]  # Filter ignored entries
    entries_count = len(entries)

    for index, entry in enumerate(entries):
        path = os.path.join(root_dir, entry)
        is_last = index == (entries_count - 1)
        connector = "└── " if is_last else "├── "
        
        if os.path.isdir(path):
            line = f"{prefix}{connector}{entry}/"
            file.write(line + "\n")
            
            new_prefix = prefix + ("    " if is_last else "│   ")
            print_directory_tree(path, file, new_prefix)
        else:
            line = f"{prefix}{connector}{entry}"
            file.write(line + "\n")

if __name__ == "__main__":
    # Use the folder where this script is located
    project_dir = os.path.dirname(os.path.abspath(__file__))  
    
    output_file = os.path.join(project_dir, "Project Folder Structure.txt")
    
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(project_dir + "\n")
        print_directory_tree(project_dir, f)
    
    print(f"Folder structure has been saved to '{output_file}'.")
