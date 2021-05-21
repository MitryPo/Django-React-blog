from django.utils.text import slugify
from transliterate import translit


def generate_slug(s, a=''):
    strng = slugify(translit(s, 'ru', reversed=True), allow_unicode=True)
    if a:
        slug = f'{strng}-{a}'
        return slug
    return strng