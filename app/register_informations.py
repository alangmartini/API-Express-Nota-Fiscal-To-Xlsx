import openpyxl as opx
import json
import sys


fiscal_information = json.loads(sys.argv[1])

ws = opx.Workbook()
wa = ws.active
wa.column_dimensions['A'].width = 60
wa['A1'].value = 'Nome dos itens'
wa['B1'].value = 'Preço'

for i, information in enumerate(fiscal_information):
    wa[f'A{i + 2}'].value = information[0]
    wa[f'B{i + 2}'].value = information[1]

ws.save('nota_fiscal.xlsx')