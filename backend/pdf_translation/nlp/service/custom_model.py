from .translate_core import TransalteCore

def write_file(path, data):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(data)
# from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
# tokenizer_en2vi = AutoTokenizer.from_pretrained("vinai/vinai-translate-en2vi", src_lang="en_XX")
# model_en2vi = AutoModelForSeq2SeqLM.from_pretrained("vinai/vinai-translate-en2vi")


class CustomModel(TransalteCore):
    def translate_en2vi(raw: str) -> str:
        return raw
