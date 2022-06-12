from parso import parse

sentence = input("Masukkan Kalimat: ")
print()
tokens = sentence.lower().split()
tokens.append('EOS')

# symbol definition
non_terminals = ['S', 'N', 'V']
terminals = ['aku', 'koe', 'kembang', 'banyu', 'sego', 'lawang',
             'layang', 'manuk', 'mangan', 'ngombe', 'tuku'] 

# parse table definition
parse_table = {}

parse_table[('S', 'aku')] = ['N', 'V', 'N']
parse_table[('S', 'koe')] = ['N', 'V', 'N']
parse_table[('S', 'lawang')] = ['N', 'V', 'N']
parse_table[('S', 'layang')] = ['N', 'V', 'N']
parse_table[('S', 'kembang')] = ['N', 'V', 'N']
parse_table[('S', 'manuk')] = ['N', 'V', 'N']
parse_table[('S', 'sego')] = ['N', 'V', 'N']
parse_table[('S', 'banyu')] = ['error']
parse_table[('S', 'mangan')] = ['error']
parse_table[('S', 'ngombe')] = ['error']
parse_table[('S', 'tuku')] = ['error']
parse_table[('S', 'EOS')] = ['error']

parse_table[('N', 'aku')] = ['aku']
parse_table[('N', 'koe')] = ['koe']
parse_table[('N', 'lawang')] = ['lawang']
parse_table[('N', 'layang')] = ['layang']
parse_table[('N', 'kembang')] = ['kembang']
parse_table[('N', 'manuk')] = ['manuk']
parse_table[('N', 'sego')] = ['sego']
parse_table[('N', 'banyu')] = ['banyu']
parse_table[('N', 'mangan')] = ['error']
parse_table[('N', 'ngombe')] = ['error']
parse_table[('N', 'tuku')] = ['error']
parse_table[('N', 'EOS')] = ['error']

parse_table[('V', 'aku')] = ['error']
parse_table[('V', 'koe')] = ['error']
parse_table[('V', 'lawang')] = ['error']
parse_table[('V', 'layang')] = ['error']
parse_table[('V', 'kembang')] = ['error']
parse_table[('V', 'manuk')] = ['error']
parse_table[('V', 'sego')] = ['error']
parse_table[('V', 'banyu')] = ['error']
parse_table[('V', 'mangan')] = ['mangan']
parse_table[('V', 'ngombe')] = ['ngombe']

# stack initialization
stack = []
stack.append('#')
stack.append('S')

# input reading initialization
idx_token = 0
symbol = tokens[idx_token]

# parsing process
while len(stack) > 0:
        top = stack[len(stack)-1]
        print('top = ', top)
        print('symbol = ', symbol)
        if top in terminals:
                print('top adalah simbol terminal')
                if top == symbol:
                        stack.pop()
                        idx_token += 1
                        symbol = tokens[idx_token]
                        if symbol == 'EOS':
                                print('isi stack: ', stack)
                                stack.pop()
                else:
                        print('error')
                        break
        elif top in non_terminals:
                print('top adalah non-terminal')
                if parse_table[(top, symbol)][0] != 'error':
                    stack.pop()
                    pushed_symbol = parse_table[(top, symbol)]
                    for i in range(len(pushed_symbol)-1, -1, -1):
                        stack.append(pushed_symbol[i])
                else:
                    print('error')
                    break
        else:
            print('error')
            break
        print('isi stack: ', stack, '\n')

# conclusion
if symbol == 'EOS' and len(stack) == 0:
        print('Input string: ', sentence, ', di-accept, sesuai grammar')
else:
        print('\nError, input string: ', sentence, ', ditolak, tidak sesuai grammar')