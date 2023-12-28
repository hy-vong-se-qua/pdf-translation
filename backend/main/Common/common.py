from re import sub
import pyperclip
import os, shutil
import json

def str_to_json(v: str):
    return json.loads(v)

def read_file(path):
    data = ""
    with open(path, 'r', encoding='utf-8') as f:
        data = f.readlines()
    return data

def write_file(path, data):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(data)

def replace_lines(lines: list[str], __old: str, __new: str):
    result = []
    for line in lines:
        result.append(line.replace(__old, __new))
    return result

def camel_case(s, replace=""):
    s = sub(r"(_|-)+", " ", s).title().replace(" ", replace)
    # return ''.join([s[0].lower(), s[1:]])
    return ''.join([s])

def copy_clipboard(v):
    pyperclip.copy(v)

def clear_folder_model():
    folder = './output/model_declaration'
    delete_folder(folder)

def delete_folder(folder: str):
    for filename in os.listdir(folder):
        file_path = os.path.join(folder, filename)
        try:
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.unlink(file_path)
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)
        except Exception as e:
            print('Failed to delete %s. Reason: %s' % (file_path, e))

def remove_whitespace(v: str):
    return v.strip()

def is_empty(v: str):
    return v is None or len(v) == 0

def to_str(v: str):
    if is_empty(v):
        return ""
    return str(v)

def get_list_el(lst: list, index: int):
    if len(lst) - 1 < index:
        return ""
    return lst[index]
